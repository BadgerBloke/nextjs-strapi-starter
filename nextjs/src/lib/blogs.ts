import { redirect } from 'next/navigation';

import { config } from '~/config';
import { BlogType } from '~/interfaces/blog';

export const getBlogBySlug = async ({ slug }: { slug: string }): Promise<BlogType['attributes']> => {
    const blogs: {
        data: BlogType[];
    } | null = await fetch(
        `${config.STRAPI_BASE_URL}/blogs?filters[slug][$eq]=${slug}&populate[cover]=*&populate[author][fields][0]=name&populate[author][fields][1]=email&populate[author][populate][0]=avatar`,
        {
            headers: {
                Authorization: `Bearer ${config.STRAPI_API_TOKEN}`,
            },
        }
    ).then(r => r.json());

    if (!blogs || !blogs.data?.length) {
        redirect('/blogs');
    }
    return blogs.data[0].attributes;
};
