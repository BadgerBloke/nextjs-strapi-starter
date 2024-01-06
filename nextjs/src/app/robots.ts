import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: 'https://blog.MKSingh.in/sitemap.xml',
    };
}

// export type Robots = {
//     rules:
//         | {
//               userAgent?: number | string[];
//               allow?: string | string[];
//               disallow?: string | string[];
//               crawlDelay?: number;
//           }
//         | Array<{
//               userAgent: string | string[];
//               allow?: string | string[];
//               disallow?: string | string[];
//               crawlDelay?: number;
//           }>;
//     sitemap?: string | string[];
//     host?: string;
// };
