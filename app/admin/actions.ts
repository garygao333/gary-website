"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../lib/supabase";
import {
  checkPasscode,
  clearSession,
  isAuthed,
  setSession,
} from "../lib/admin-auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const passcode = String(formData.get("passcode") ?? "");
  if (!checkPasscode(passcode)) {
    return { error: "Incorrect passcode." };
  }
  await setSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/admin");
}

export async function deletePost(slug: string): Promise<void> {
  if (!(await isAuthed())) throw new Error("Unauthorized");
  const admin = supabaseAdmin();

  // Best-effort: clear the post's image folder so storage doesn't accumulate orphans.
  const { data: files } = await admin.storage.from("post-images").list(slug);
  if (files?.length) {
    await admin.storage
      .from("post-images")
      .remove(files.map((f) => `${slug}/${f.name}`));
  }

  const { error } = await admin.from("posts").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidateTag("posts", "max");
}

export async function updatePost(
  slug: string,
  title: string,
  bodyHtml: string,
): Promise<void> {
  if (!(await isAuthed())) throw new Error("Unauthorized");
  const admin = supabaseAdmin();
  const { error } = await admin
    .from("posts")
    .update({ title: title.trim(), body_html: bodyHtml })
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidateTag("posts", "max");
}
