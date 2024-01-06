import { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
    const baseUrl = 'https://blog.MKSingh.in';
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blogs/*`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/*`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
    ];
};

export default sitemap;
