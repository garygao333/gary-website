export type FeaturedLink = {
  title: string;
  href: string;
  source: string;
  subtitle: string;
  main?: boolean;
};

export const featuredLinks: FeaturedLink[] = [
  {
    title: "The next generation of personal agents: channel-aware agents",
    main: true,
    href: "https://chertnotes.substack.com/p/the-next-generation-of-personal-agents",
    source: "Substack",
    subtitle: "Why the channel an agent chooses (text, call, or FaceTime) is becoming the product.",
  },
  {
    title: "Launch HN: Chert (YC P26): Twilio for iMessage",
    main: true,
    href: "https://news.ycombinator.com/item?id=48267829",
    source: "Hacker News",
    subtitle: "An API for businesses to send, receive, and automate iMessage conversations at scale.",
  },
  {
    title: "Show HN: Put an AI agent on a FaceTime audio/video call (open source, WebRTC)",
    href: "https://news.ycombinator.com/item?id=49728749",
    source: "Hacker News",
    subtitle: "An open-source framework for bringing AI agents to FaceTime audio and video calls.",
  },
  {
    title: "Chert: iMessage infrastructure for trusted communication at scale",
    main: true,
    href: "https://www.ycombinator.com/launches/QGN-chert-imessage-infrastructure-for-trusted-communication-at-scale",
    source: "Y Combinator",
    subtitle: "Infrastructure for teams to send, receive, and automate conversations over iMessage using APIs.",
  },
  {
    title: "Flux",
    href: "https://www.producthunt.com/products/flux-14",
    source: "Product Hunt",
    subtitle: "Build your own agents in iMessage.",
  },
  {
    title: "Chert",
    href: "https://www.producthunt.com/products/chert/launches/chert",
    source: "Product Hunt",
    subtitle: "Build AI agents that text customers in iMessage.",
  },
  {
    title: "Chert for FaceTime",
    main: true,
    href: "https://www.producthunt.com/products/chert/launches/chert-2",
    source: "Product Hunt",
    subtitle: "Vapi for FaceTime: AI video agents in a few lines.",
  },
  {
    title: "How Getcho Is Moving Its Notifications from SMS to iMessage",
    href: "https://www.trychert.com/case-studies/getcho",
    source: "Chert",
    subtitle: "Faster group conversations, a 15-minute onboarding, and a move from SMS notifications to blue bubbles.",
  },
  {
    title: "Old Sherds, New Tricks",
    main: true,
    href: "https://www.penn.museum/blog/old-sherds-new-tricks/",
    source: "Penn Museum",
    subtitle: "Ancient fragments meet modern algorithms in a student research project connecting archaeology and automation.",
  },
  {
    title: "Learning phase relationships through circuits of Kuramoto oscillators",
    href: "https://meetings-archive.aps.org/smt/2026/mar-g58/2/",
    source: "APS",
    subtitle: "Coupled phase oscillators offer a path toward scalable, energy-efficient physical learning systems.",
  },
  {
    title: "Developing the Next Generation of Energy-Efficient AI Infrastructure: A Summer in the Circuits Lab",
    main: true,
    href: "https://curf.upenn.edu/node/12113",
    source: "Penn CURF",
    subtitle: "Designing and prototyping an oscillator-based circuit that performs AI tasks with less energy.",
  },
  {
    title: "Pottery Progress",
    main: true,
    href: "https://omnia.sas.upenn.edu/story/pottery-progress",
    source: "OMNIA",
    subtitle: "To simplify archaeological fieldwork, Benjamin Franklin scholar Gary Gao, C’28, W’28, turned to machine learning.",
  },
];
