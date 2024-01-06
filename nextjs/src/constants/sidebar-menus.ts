import { IconBrandYoutube, IconCloudUpload, IconLayoutDashboard } from '@tabler/icons-react';

export const SIDEBAR_MENUS = [
    {
        label: 'Dashboard',
        icon: IconLayoutDashboard,
        link: '/ytPipe',
    },
    {
        label: 'Upload Video',
        icon: IconCloudUpload,
        link: '/ytPipe/upload',
    },
    {
        label: 'Videos',
        icon: IconBrandYoutube,
        link: '/ytPipe/videos',
    },
    // {
    //     label: 'Content Sets',
    //     icon: IconFile3d,
    //     link: '/content-sets',
    //     links: [
    //         {
    //             label: 'Create Content Set',
    //             link: '/content-sets/create-content-set',
    //         },
    //         {
    //             label: 'Archived Contents',
    //             link: '/content-sets/archived-contents',
    //         },
    //     ],
    // },
];
