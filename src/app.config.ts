// Everything app-specific lives here. For a new app, edit this file,
// replace the images in public/, and rewrite src/policies/*.md.

export const app = {
  // Basics
  name: 'Sample App',
  tagline: 'One line that says what the app does and who it is for.',
  description:
    'A slightly longer description used for search results and link previews. Keep it under 160 characters.',

  // Full URL of this mini-site, no trailing slash. Used for SEO, the sitemap and link previews.
  url: 'https://sample.shaneracey.com',

  // Developer / legal entity shown on the policy pages.
  developer: 'Shane Racey',
  hubUrl: 'https://shaneracey.com',

  // Support contact. This address is published on the support, privacy and terms pages.
  contactEmail: 'support@shaneracey.com',

  // Images in public/. Replace the files or point these at new ones.
  icon: '/icon.svg',
  ogImage: '/og.png',

  // Brand colors. `accent` is used for buttons and highlights,
  // `accentText` for text sitting on top of the accent color.
  colors: {
    accent: '#6d5dfc',
    accentDark: '#8f84ff',
    accentText: '#ffffff',
  },

  // Store links. Leave a value empty ('') to hide that badge.
  stores: {
    appStore: '',
    googlePlay: '',
  },

  features: [
    { icon: '⚡', title: 'Fast', body: 'Describe the first thing people love about the app.' },
    { icon: '🔒', title: 'Private', body: 'Describe how the app treats their data, in plain words.' },
    { icon: '✨', title: 'Simple', body: 'Describe why it is easier than the alternatives.' },
  ],

  // Screenshots in public/screenshots/. Portrait phone shots work best (e.g. 1290x2796).
  screenshots: [
    { src: '/screenshots/1.svg', alt: 'Home screen' },
    { src: '/screenshots/2.svg', alt: 'Detail screen' },
    { src: '/screenshots/3.svg', alt: 'Settings screen' },
  ],

  faq: [
    {
      q: 'How do I delete my account and data?',
      a: 'TODO: Describe the in-app path (for example Settings > Account > Delete account), or tell people to email the address below. Both stores require this for apps with accounts.',
    },
    {
      q: 'How do I restore a purchase?',
      a: 'TODO: Describe how to restore purchases, or remove this question if the app has none.',
    },
    {
      q: 'I found a bug. How do I report it?',
      a: 'Email the address below with your device model, OS version and the steps that caused the problem. Screenshots help a lot.',
    },
  ],
} as const;

export type AppConfig = typeof app;
