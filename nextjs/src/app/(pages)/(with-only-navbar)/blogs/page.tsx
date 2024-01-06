import BlogCardWithFooter from '~/components/molecules/card/blog-card-with-footer';
import Hero from '~/components/organisms/pages/home/hero';
import { config } from '~/config';
import { BlogListType } from '~/interfaces/blog';

const BlogPage = async () => {
    const blogs: {
        data: BlogListType;
    } | null = await fetch(
        `${config.STRAPI_BASE_URL}/blogs?fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=category&fields[4]=updatedAt&populate[author][fields][0]=name&populate[author][fields][1]=email&populate[author][populate][0]=avatar&populate[cover]=*`,
        {
            headers: {
                Authorization: `Bearer ${config.STRAPI_API_TOKEN}`,
            },
        }
    ).then(r => r.json());
    return (
        <div className="flex w-full flex-col items-center justify-start gap-12 pt-16">
            <Hero
                heading="Welcome to Insights Hub!"
                description="Dive into a world of knowledge with our expert blogs. Stay informed and inspired."
                className="py-20 sm:py-28 lg:py-32"
            />
            <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2 xl:mt-20 xl:grid-cols-3">
                {blogs?.data.map(blog =>
                    blog.attributes.cover?.data?.attributes.url ? (
                        <BlogCardWithFooter
                            author={blog.attributes.author}
                            category={blog.attributes.category}
                            footer={'555 views'}
                            image={blog.attributes.cover?.data?.attributes.url}
                            title={blog.attributes.title}
                            description={blog.attributes.description}
                            key={blog.attributes.slug}
                            slug={blog.attributes.slug}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default BlogPage;
