// Component exports for easier imports
export { default as GridHero } from './components/GridHero.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as ProfileImage } from './components/ProfileImage.svelte';
export { default as SocialLinkComponent } from './components/SocialLink.svelte';
export { default as LoadingSpinner } from './components/LoadingSpinner.svelte';

// Data exports
export { PROFILE_DATA, SOCIAL_LINKS } from './data/profile';
export type { SocialLink } from './data/profile';


// Utility exports
export * from './utils/index';
