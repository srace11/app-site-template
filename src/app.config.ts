// Everything app-specific lives here. For a new app, edit this file,
// replace the images in public/, and rewrite src/policies/*.md.
//
// Placeholders: any text that starts with "[" (like '[Feature name]') is shown in an
// italic placeholder style, so unfinished copy is obvious on the page. Replace them all
// before you share the site. Don't invent numbers or features to fill a gap.

export const app = {
  // Basics
  name: 'Sample App',
  tagline: '[Short, loud headline]',
  description:
    '[One or two sentences on what the app does and who it is for. Used for search results and link previews. Under 160 characters.]',

  // Full URL of this mini-site, no trailing slash. Used for SEO, the sitemap and link previews.
  url: 'https://sample.shaneracey.com',

  // Developer / legal entity shown on the policy pages.
  developer: 'Shane Racey',
  hubUrl: 'https://shaneracey.com',

  // Support contact, published on the support page. Empty hides the email links there.
  contactEmail: '',
  // Shown on the privacy policy and terms for privacy, deletion and legal requests.
  privacyEmail: 'hello@shaneracey.com',

  // Images in public/. Replace the files or point these at new ones.
  icon: '/icon.svg',
  ogImage: '/og.png',

  // Brand colors. `accent` fills buttons, `accentText` is the text on them.
  // `accentDark` is used for links and labels in dark mode and on the hero band.
  // `hero` is the background of the hero band (keep it dark: hero text is white).
  colors: {
    accent: '#6d5dfc',
    accentDark: '#8f84ff',
    accentText: '#ffffff',
    hero: '#16161a',
  },

  // Store links. Leave a value empty ('') to hide that badge.
  stores: {
    appStore: '',
    googlePlay: '',
  },

  // The main button, used in the header, hero, pricing cards and the final section.
  // With a waitlist (below) point it at '/waitlist'. Once the app is out, point it at a store link.
  cta: {
    label: 'Join the waitlist',
    href: '/waitlist',
    note: 'Free to join. Launch updates, no spam.',
  },

  // Waitlist: the app's slug in the waitlist API (api.shaneracey.com, repo srace11/waitlist-api).
  // Empty: /waitlist says "coming soon" and the site builds without the API.
  // Add the app to the API's apps.config.ts and deploy it before setting this.
  waitlist: {
    app: '',
  },

  // Home page sections, top to bottom. A section with no items is hidden,
  // and so is its link in the header.
  landing: {
    hero: {
      eyebrow: '[What it is, in 2 to 4 words]',
      lead: '[One sentence: what people do with it and what they get.]',
      // A video file in public/ (for example '/demo.mp4'). Empty shows a placeholder frame.
      video: '',
      videoPoster: '',
    },

    how: {
      eyebrow: 'How it works',
      heading: '[Outcome] in 3 steps',
      steps: [
        { title: '[Step one]', body: '[One or two sentences.]' },
        { title: '[Step two]', body: '[One or two sentences.]' },
        { title: '[Step three]', body: '[One or two sentences.]' },
      ],
      // Short facts under the steps: privacy, accuracy, what makes it different. Facts only.
      facts: [
        { title: '[Fact]', body: '[One sentence backing it up.]' },
        { title: '[Fact]', body: '[One sentence backing it up.]' },
        { title: '[Fact]', body: '[One sentence backing it up.]' },
      ],
    },

    features: {
      eyebrow: 'Features',
      heading: '[What you get]',
      lead: '',
      items: [
        { title: '[Feature]', body: '[One line on what it does.]' },
        { title: '[Feature]', body: '[One line on what it does.]' },
        { title: '[Feature]', body: '[One line on what it does.]' },
        { title: '[Feature]', body: '[One line on what it does.]' },
      ],
    },

    soon: {
      eyebrow: 'Coming soon',
      heading: "What's next",
      items: [
        { title: '[Feature name]', body: '[One line on what it does.]' },
        { title: '[Feature name]', body: '[One line on what it does.]' },
        { title: '[Feature name]', body: '[One line on what it does.]' },
      ],
    },

    about: {
      eyebrow: 'About',
      heading: "Hi, I'm Shane",
      // A square photo in public/. Empty hides the photo.
      photo: '/about/shane.jpg',
      photoAlt: 'Shane Racey',
      paragraphs: [
        'I studied operations research at Cornell and pole vaulted for Cornell and Kentucky. Now I work in data science and build small, focused apps.',
        "[Why you're building this app]",
      ],
    },

    pricing: {
      eyebrow: 'Pricing',
      heading: 'Simple pricing',
      plans: [
        { name: 'Free', price: '[$0]', featured: false, items: ["[What's included]", "[What's included]"] },
        { name: 'Pro', price: '[$X / month]', featured: true, items: ["[What's included]", "[What's included]", "[What's included]"] },
      ],
      note: "Pricing isn't final yet.",
    },

    faq: {
      eyebrow: 'FAQ',
      heading: 'Questions',
      items: [
        { q: '[Question people ask first]', a: '[Answer]' },
        { q: 'When does it launch?', a: '[Launch date or season]' },
        { q: 'How much does it cost?', a: '[Answer, or point to pricing]' },
      ],
    },

    final: {
      heading: '', // empty uses the tagline
      lead: '[One line nudging people to the button]',
    },
  },

  // Screenshots in public/screenshots/, shown after the features. Portrait phone shots work best (e.g. 1290x2796).
  screenshots: [] as { src: string; alt: string }[],

  // Questions on the support page (separate from the home page FAQ).
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
};

export type AppConfig = typeof app;

/** True for unfinished copy written as "[...]". Rendered in the placeholder style. */
export const isPlaceholder = (text: string) => text.trim().startsWith('[');
