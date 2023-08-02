export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "الرئيسية",
			href: "/",
		},
    {
      label: "حول",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "الرئيسية",
			href: "/home",
		},
		{
			label: "حول",
			href: "/about",
		},
	],
	links: {
		github: "https://github.com/sentimetric",
		twitter: "https://twitter.com/muahamdalfaifi",
	},
};
