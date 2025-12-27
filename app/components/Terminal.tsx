"use client";

import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";

type CommandOutput = {
  command: string;
  output: React.ReactNode;
};

const PROJECTS = [
  {
    id: "chert",
    name: "Chert - Voice-based GIS for Archaeology",
    url: "https://example.com/chert",
    description:
      "Voice-first GIS data collection platform used by archaeological projects.",
    tech: ["Next.js", "Python", "PostgreSQL", "GIS"],
  },
  {
    id: "nodal",
    name: "Nodal CLI - Hardware copilot for embedded systems",
    url: "https://example.com/nodal",
    description:
      "CLI that generates wiring diagrams, firmware, and host code for Arduino/ESP32.",
    tech: ["Node.js", "TypeScript", "Arduino"],
  },
];

const PROMPT = "gary@terminal:~$";

export const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "",
      output: (
        <div className="space-y-1">
          <div>Welcome to Gary&apos;s TUI portfolio</div>
          <div>
            Type <span className="text-emerald-300 font-semibold">help</span> to see available commands.
          </div>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    const args = command.split(/\s+/);
    const base = args[0].toLowerCase();
    let output: React.ReactNode;

    switch (base) {
      case "help":
        output = (
          <div>
            <div>Available commands:</div>
            <ul className="mt-1 space-y-0.5">
              <li><b>about</b> - who I am</li>
              <li><b>projects</b> - list all projects</li>
              <li><b>project &lt;id&gt;</b> - details for a single project</li>
              <li><b>skills</b> - what I work with</li>
              <li><b>resume</b> - open my resume</li>
              <li><b>contact</b> - email & socials</li>
              <li><b>clear</b> - clear the terminal</li>
              <li><b>whoami</b> - print current user</li>
            </ul>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1">
            <div>Hi, I&apos;m Gary</div>
            <div>
              I study Physics + Wharton at Penn, and I like building at the edge of{" "}
              deep tech, AI, neuromorphic hardware, and archaeology. This TUI is my
              little playground to show off projects, experiments, and weird ideas.
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1">
            <div>Projects:</div>
            <ul className="mt-1 space-y-1">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <span className="text-emerald-300">{p.id}</span>{" "}
                  - {p.name}
                </li>
              ))}
            </ul>
            <div className="mt-1 text-[11px] text-emerald-400/80">
              Use <span className="font-mono">project &lt;id&gt;</span> for details.
            </div>
          </div>
        );
        break;

      case "project": {
        const id = args[1];
        if (!id) {
          output = <>Usage: project &lt;id&gt;. Try <span className="text-emerald-300">projects</span>.</>;
          break;
        }

        const proj = PROJECTS.find(
          (p) => p.id.toLowerCase() === id.toLowerCase()
        );
        if (!proj) {
          output = (
            <>
              No project found with id &apos;{id}&apos;. Try{" "}
              <span className="text-emerald-300">projects</span>.
            </>
          );
          break;
        }

        output = (
          <div className="space-y-1">
            <div className="font-semibold">{proj.name}</div>
            <div>{proj.description}</div>
            <div className="text-xs">
              Tech: {proj.tech.join(", ")}
            </div>
            <a
              href={proj.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-1 underline text-emerald-300"
            >
              Open project
            </a>
          </div>
        );
        break;
      }

      case "skills":
        output = (
          <div className="space-y-1 text-sm">
            <div>Some things I work with:</div>
            <ul className="list-disc list-inside space-y-0.5">
              <li>AI & tooling: Python, PyTorch, Transformers, LangChain</li>
              <li>Web: React, Next.js, TypeScript, Tailwind, Node.js</li>
              <li>Hardware: Arduino, embedded C/C++, basic electronics</li>
              <li>Data: Pandas, SQL, analytics & ML pipelines</li>
            </ul>
          </div>
        );
        break;

      case "resume":
        output = (
          <div>
            Opening resume:{" "}
            <a
              href="https://example.com/gary-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="underline text-emerald-300"
            >
              gary-resume.pdf
            </a>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1">
            <div>
              Email:{" "}
              <span className="text-emerald-300">
                garygao@sas.upenn.edu
              </span>
            </div>
            <div>
              GitHub:{" "}
              <a
                href="https://github.com/garygao333"
                target="_blank"
                rel="noreferrer"
                className="underline text-emerald-300"
              >
                github.com/garygao333
              </a>
            </div>
            <div>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/garygao"
                target="_blank"
                rel="noreferrer"
                className="underline text-emerald-300"
              >
                linkedin.com/in/garygao
              </a>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = <>gary</>;
        break;

      case "clear":
        setHistory([]);
        return;

      case "ls":
        output = (
          <div>about.md  projects.json  resume.pdf  contact.cfg</div>
        );
        break;

      default:
        output = (
          <div>
            Command not found:{" "}
            <span className="text-red-400">{command}</span>. Try{" "}
            <span className="text-emerald-300">help</span>.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command, output }]);
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) {
        runCommand(input);
        setInput("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commandHistory.length) return;
      setHistoryIndex((prev) => {
        const newIndex =
          prev === null
            ? commandHistory.length - 1
            : Math.max(0, prev - 1);
        setInput(commandHistory[newIndex] ?? "");
        return newIndex;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!commandHistory.length) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const newIndex = prev + 1;
        if (newIndex >= commandHistory.length) {
          setInput("");
          return null;
        }
        setInput(commandHistory[newIndex] ?? "");
        return newIndex;
      });
    }
  };

  return (
    <div
      className="h-full bg-black/70 border-t border-emerald-500/20 text-sm flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Big stacked title banner */}
        <div className="mb-8">
          <div className="stack-title text-[64px] sm:text-[88px] md:text-[112px] text-purple-400">
            {/* Foreground filled text (two lines: GARY / GAO) */}
            <div className="stack-layer-top">
              <div>GARY</div>
              <div>GAO</div>
            </div>

            {/* Stacked outline layers behind */}
            <div className="stack-layer-1">
              <div>GARY</div>
              <div>GAO</div>
            </div>
            <div className="stack-layer-2">
              <div>GARY</div>
              <div>GAO</div>
            </div>
            <div className="stack-layer-3">
              <div>GARY</div>
              <div>GAO</div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-6">
            (Write <span className="text-emerald-300">&apos;help&apos;</span> if you&apos;re lost)
          </p>
        </div>

        {history.map((entry, idx) => (
          <div key={idx} className="mb-2">
            {entry.command && (
              <div>
                <span className="text-emerald-400">{PROMPT}</span>{" "}
                <span>{entry.command}</span>
              </div>
            )}
            <div className="mt-1 whitespace-pre-wrap">
              {entry.output}
            </div>
          </div>
        ))}

        {/* Current prompt */}
        <div className="flex items-center">
          <span className="text-emerald-400">{PROMPT}</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none border-none ml-2 caret-emerald-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};
