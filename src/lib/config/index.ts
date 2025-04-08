import type { Link } from "../types"

export const SITE = {
  title: "Things to do in the Hamptons",
  description: "An events curated website for the hamptons built with Astro",
  author: "Santiago Saldivar",
  url: "https://www.thingstodointhehamptons.com",
  github: "https://github.com/Santi1999/things_in_the_hamptons",
  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
}

export const NAVIGATION_LINKS: Link[] = [
  {
    href: "/categories/featured-events",
    text: "Featured Events",
  },
  {
    href: "/categories/community",
    text: "Community",
  },
  {
    href: "/categories/government",
    text: "Government",
  },
  {
    href: "/categories/nature",
    text: "Nature",
  },
  {
    href: "/categories/library",
    text: "Library",
  },
  {
    href: "/categories/arts",
    text: "Arts",
  },
  {
    href: "/categories/music",
    text: "Music",
  },
  {
    href: "/categories/health",
    text: "Health",
  },
]

export const OTHER_LINKS: Link[] = [
  {
    href: "/about",
    text: "About us",
  },
  {
    href: "/events",
    text: "Events",
  },
  {
    href: "/authors",
    text: "Authors",
  },
  {
    href: "/contact",
    text: "Contact",
  },
  {
    href: "/privacy",
    text: "Privacy",
  },
  {
    href: "/terms",
    text: "Terms",
  },
  {
    href: "/cookie-policy",
    text: "Cookie Policy",
  },
  {
    href: "https://astro-news-six.vercel.app/rss.xml",
    text: "RSS",
  },
  {
    href: "https://astro-news-six.vercel.app/sitemap-index.xml",
    text: "Sitemap",
  },
]

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://github.com",
    text: "GitHub",
    icon: "github",
  },
  {
    href: "https://twitter.com",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com",
    text: "Facebook",
    icon: "facebook",
  },
]
