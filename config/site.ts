export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "مقياس",
	description: "",
	navItems: [
		{
			label: "الرئيسية",
			href: "/",
		},
    // {
    //   label: "حول",
    //   href: "/about",
    // }
	],
	navMenuItems: [
		{
			label: "الرئيسية",
			href: "/home",
		},
		// {
		// 	label: "حول",
		// 	href: "/about",
		// },
	],
	links: {
		github: "https://github.com/sentimetric",
		twitter: "https://twitter.com/muahamdalfaifi",
	},
};
