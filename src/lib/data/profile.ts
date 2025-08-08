export interface SocialLink {
  title: string;
  href: string;
  icon: string;
  iconBg?: string;
  iconSize?: number;
  description?: string;
}

export const PROFILE_DATA = {
  name: 'Wildan Zhilal Manafi',
  role: 'Software Engineer | Machine Learning Engineer | Security Engineer',
  profileImage: '/images/profile.jpeg'
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  
    {
      title: 'Portfolio',
      href: 'https://wildanzm.vercel.app',
      icon: 'https://www.svgrepo.com/download/521261/web.svg',
      iconSize: 45
    },
    {
      title: 'LinkedIn',
      href: 'https://linkedin.com/in/wildanzm',
      icon: 'https://www.svgrepo.com/show/448234/linkedin.svg',
      iconSize: 40
    },
    {
      title: 'GitHub',
      href: 'https://github.com/wildanzm',
      icon: 'https://www.svgrepo.com/show/475654/github-color.svg',
      iconSize: 40
    },
    {
      title: 'HuggingFace',
      href: 'https://huggingface.co/wildanzm',
      icon: '/hf-logo-pirate.svg',
      iconBg: '#fff',
      iconSize: 45
    }
  ];
