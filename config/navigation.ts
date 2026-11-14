export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/use-cases" },
  { label: "Work", href: "/work" },
  { label: "Labs", href: "/labs" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Industries", href: "/use-cases" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Labs",
    items: [
      { label: "Zaiphr Labs", href: "/labs" },
      { label: "AI Stack Finder", href: "/tools/ai-stack-finder" },
      { label: "AI tools directory", href: "/ai-tools" },
      { label: "AI News", href: "/news" },
      { label: "Insights", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];
