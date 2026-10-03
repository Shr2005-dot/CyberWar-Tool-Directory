/**
 * Site-wide content and navigation data.
 *
 * Everything here is sourced from the repository's own specification:
 *   - README.md → "Overall Website Architecture", "Webpage Structure", "🎨 Design System"
 *   - blueprint/website-blueprint.jfif
 *
 * Keeping it in one typed module lets contributors adjust the directory
 * without touching component code, and lets later phases add Markdown/JSON
 * tool entries that reference these slugs.
 */

export interface NavLink {
  label: string;
  href: string;
  /** External links open in a new tab. */
  external?: boolean;
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  /** URL segment, e.g. "/tools/osint". */
  slug: string;
  name: string;
  description: string;
  /** Hex accent from the README design system. */
  accent: string;
  /** Dependency-free glyph (README uses the same emoji in its structure tree). */
  glyph: string;
  subcategories: SubCategory[];
}

export interface ToolRef {
  slug: string;
  name: string;
  summary: string;
}

export interface LearningPath {
  slug: string;
  name: string;
  summary: string;
  level: string;
  accent: string;
}

/* ------------------------------------------------------------------ */
/* Site metadata                                                       */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'CyberWar Tool Directory',
  shortName: 'CyberWar',
  tagline: 'Cybersecurity Tools. Commands. Knowledge.',
  taglineDetail: 'Curated tools, commands, setup guides and practical resources.',
  description:
    'A curated, educational directory of cybersecurity, pentesting and OSINT tools, commands, learning roadmaps and references for researchers, analysts and beginners.',
  repoUrl: 'https://github.com/Shr2005-dot/CyberWar-Tool-Directory',
  license: 'AGPL-3.0',
  licenseUrl: 'https://www.gnu.org/licenses/agpl-3.0.html',
  /* README.md → educational-use notice (shown on every page). */
  disclaimer:
    'This website is for educational purposes only and does not promote or encourage malicious activity or serious intent to cause harm to any organization or individual’s privacy and terms of service. This is not legal advice!',
} as const;

/* ------------------------------------------------------------------ */
/* Primary navigation (README homepage navbar / blueprint navbar)      */
/* ------------------------------------------------------------------ */

export const primaryNav: NavLink[] = [
  { label: 'Tools', href: '/tools' },
  { label: 'Roadmaps', href: '/roadmaps' },
  { label: 'Comparisons', href: '/comparisons' },
  { label: 'Cheatsheets', href: '/cheatsheets' },
  { label: 'Learning Hub', href: '/learning' },
  { label: 'Community', href: '/community' },
];

/* ------------------------------------------------------------------ */
/* Tool categories (README → "Webpage Structure" › 🧰 TOOLS)           */
/* ------------------------------------------------------------------ */

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const subcategories = (names: readonly string[]): SubCategory[] =>
  names.map((name) => ({ name, slug: slugify(name) }));

export const categories: Category[] = [
  {
    slug: 'osint',
    name: 'OSINT',
    description: 'Gather information from public sources.',
    accent: '#2dd4bf',
    glyph: '🔎',
    subcategories: subcategories([
      'Phone Number',
      'Email',
      'Username',
      'Social Media',
      'Domain',
      'IP / Network',
      'Images / Metadata',
      'Search Engines',
      'Archives',
    ]),
  },
  {
    slug: 'pentesting',
    name: 'Pentesting',
    description: 'Web, network & system testing.',
    accent: '#ef4444',
    glyph: '🔴',
    subcategories: subcategories([
      'Reconnaissance',
      'Network',
      'Web',
      'Enumeration',
      'Vulnerability Scanning',
      'Password / Hash',
      'Exploitation',
    ]),
  },
  {
    slug: 'networking',
    name: 'Networking',
    description: 'Analyze & troubleshoot networks.',
    accent: '#38bdf8',
    glyph: '🌐',
    subcategories: subcategories([
      'Discovery',
      'Packet Analysis',
      'DNS',
      'HTTP',
      'Traffic',
      'Network Utilities',
    ]),
  },
  {
    slug: 'forensics',
    name: 'Forensics',
    description: 'Investigate digital evidence.',
    accent: '#f59e0b',
    glyph: '🔬',
    subcategories: subcategories([
      'Disk',
      'Memory',
      'File Analysis',
      'Metadata',
      'Incident Response',
    ]),
  },
  {
    slug: 'wireless',
    name: 'Wireless',
    description: 'Wi-Fi, Bluetooth & radio analysis.',
    accent: '#a78bfa',
    glyph: '📡',
    subcategories: subcategories(['Wi-Fi', 'Bluetooth', 'Wireless Analysis']),
  },
  {
    slug: 'cloud-devsecops',
    name: 'Cloud / DevSecOps',
    description: 'Cloud, container & pipeline security.',
    accent: '#22d3ee',
    glyph: '☁️',
    subcategories: subcategories([
      'Cloud',
      'Containers',
      'Kubernetes',
      'CI/CD Security',
    ]),
  },
  {
    slug: 'misc',
    name: 'Misc',
    description: 'Other useful tools & utilities.',
    accent: '#94a3b8',
    glyph: '⚙️',
    subcategories: subcategories([
      'Cryptography',
      'Encoding',
      'Automation',
      'Wordlists',
      'Utilities',
    ]),
  },
];

export const getCategory = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);

/* ------------------------------------------------------------------ */
/* Homepage content (README → "🏠 Homepage Architecture")              */
/* ------------------------------------------------------------------ */

export const stats: { value: string; label: string }[] = [
  { value: '250+', label: 'Tools' },
  { value: '3000+', label: 'Commands' },
  { value: '50+', label: 'Topics' },
  { value: 'Open', label: 'Source' },
];

/**
 * Homepage tool previews. Names and one-line summaries only — full tool
 * pages (install steps, commands, examples) arrive in a later phase.
 */
const toolCatalog: Record<string, ToolRef> = {
  nmap: {
    slug: 'nmap',
    name: 'Nmap',
    summary: 'Network discovery & security scanner.',
  },
  'burp-suite': {
    slug: 'burp-suite',
    name: 'Burp Suite',
    summary: 'Web proxy for security testing.',
  },
  wireshark: {
    slug: 'wireshark',
    name: 'Wireshark',
    summary: 'Packet analysis & protocol inspection.',
  },
  ffuf: {
    slug: 'ffuf',
    name: 'ffuf',
    summary: 'Fast web fuzzer for content discovery.',
  },
  sherlock: {
    slug: 'sherlock',
    name: 'Sherlock',
    summary: 'Find accounts by username.',
  },
};

const pick = (ids: readonly string[]): ToolRef[] =>
  ids
    .map((id) => toolCatalog[id])
    .filter((tool): tool is ToolRef => tool !== undefined);

export const popularTools: ToolRef[] = pick([
  'nmap',
  'burp-suite',
  'wireshark',
  'ffuf',
  'sherlock',
]);

export const recentlyUpdated: ToolRef[] = pick(['nmap', 'sherlock', 'wireshark']);

export const learningPaths: LearningPath[] = [
  {
    slug: 'beginner',
    name: 'Beginner Fundamentals',
    summary: 'Start from scratch and learn the fundamentals.',
    level: 'Beginner',
    accent: '#22c55e',
  },
  {
    slug: 'osint-investigator',
    name: 'OSINT Investigator',
    summary: 'Master the art of gathering information from public sources.',
    level: 'Intermediate',
    accent: '#2dd4bf',
  },
  {
    slug: 'web-pentester',
    name: 'Web Pentester',
    summary: 'Find vulnerabilities in web applications.',
    level: 'Intermediate',
    accent: '#ef4444',
  },
  {
    slug: 'bug-bounty',
    name: 'Bug Bounty',
    summary: 'Report vulnerabilities through authorized bug bounty programs.',
    level: 'Advanced',
    accent: '#a78bfa',
  },
];

/* ------------------------------------------------------------------ */
/* Footer navigation (README → 👥 COMMUNITY and ℹ️ ABOUT)              */
/* ------------------------------------------------------------------ */

export const footerNav: NavGroup[] = [
  {
    title: 'Resources',
    links: [
      { label: 'Tools', href: '/tools' },
      { label: 'Roadmaps', href: '/roadmaps' },
      { label: 'Comparisons', href: '/comparisons' },
      { label: 'Cheatsheets', href: '/cheatsheets' },
      { label: 'Learning Hub', href: '/learning' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Contributors', href: '/community/contributors' },
      { label: 'Add Tool', href: '/community/add-tool' },
      { label: 'Request Tool', href: '/community/request-tool' },
      { label: 'Suggest Edit', href: '/community/suggest-edit' },
      { label: 'Report Outdated Info', href: '/community/report-outdated' },
      { label: 'GitHub', href: site.repoUrl, external: true },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Verification', href: '/about/verification' },
      { label: 'Sources', href: '/about/sources' },
      { label: 'Contribution Guide', href: '/about/contribution-guide' },
      { label: 'Privacy', href: '/about/privacy' },
      { label: 'Terms', href: '/about/terms' },
      { label: 'Disclaimer', href: '/about/disclaimer' },
    ],
  },
];