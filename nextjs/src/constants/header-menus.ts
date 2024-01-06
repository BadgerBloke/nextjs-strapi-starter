import { Icon, IconMenu } from '@tabler/icons-react';

type MenuType = {
    href: string;
    text: string;
    icon: Icon;
};

export type HeaderMenuType = MenuType & {
    children?: Omit<MenuType, 'icon'>[];
};

export const HEADER_MENUS: HeaderMenuType[] = [
    // {
    //     href: '#1',
    //     text: 'Learn',
    //     icon: IconMenu,
    //     children: [
    //         {
    //             href: '/blogs',
    //             text: 'Articls',
    //         },
    //         {
    //             href: '/resources',
    //             text: 'Resources',
    //         },
    //         {
    //             href: '/community',
    //             text: 'Community',
    //         },
    //         {
    //             href: '/blogs',
    //             text: 'Articls',
    //         },
    //         {
    //             href: '/resources',
    //             text: 'Resources',
    //         },
    //         {
    //             href: '/community',
    //             text: 'Community',
    //         },
    //         {
    //             href: '/blogs',
    //             text: 'Articls',
    //         },
    //         {
    //             href: '/resources',
    //             text: 'Resources',
    //         },
    //         {
    //             href: '/community',
    //             text: 'Community',
    //         },
    //     ],
    // },
    {
        href: '/blogs',
        text: 'Blogs',
        icon: IconMenu,
    },
];
