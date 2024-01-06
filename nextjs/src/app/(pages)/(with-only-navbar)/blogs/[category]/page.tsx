import { Fragment } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import BlogCardWithFooter from '~/components/molecules/card/blog-card-with-footer';
import Hero from '~/components/organisms/pages/home/hero';
import { buttonVariants } from '~/components/ui/button';
import { config } from '~/config';
import { BlogListType } from '~/interfaces/blog';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
    const blogs: {
        data: BlogListType;
    } | null = await fetch(
        `${config.STRAPI_BASE_URL}/blogs?filters[category][$eqi]=${params.category}&fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=category&fields[4]=updatedAt&populate[author][fields][0]=name&populate[author][fields][1]=email&populate[author][populate][0]=avatar&populate[cover]=*`,
        {
            headers: {
                Authorization: `Bearer ${config.STRAPI_API_TOKEN}`,
            },
        }
    ).then(r => r.json());

    if (!blogs?.data) {
        redirect('/blogs');
    }
    return (
        <Fragment>
            {/* <h1 className="mt-14 scroll-m-20 text-4xl font-extrabold tracking-tight lg:mt-20 lg:text-5xl">
                {decodeURIComponent(params.category)} Blogs
            </h1> */}
            <Hero
                heading={`${decodeURIComponent(params.category)} Blogs`}
                description={`Explore curated insights and expert perspectives in ${decodeURIComponent(
                    params.category
                )}. Your source for in-depth knowledge and inspiration.`}
                className="py-20 sm:py-28 lg:py-32"
            />
            {blogs?.data?.length ? (
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
                    {blogs.data.map(blog =>
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
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        No blog found under &quot;{decodeURIComponent(params.category)}&quot; category!
                    </h3>
                    <Link href="/blogs" className={buttonVariants()}>
                        Go to blogs page
                    </Link>
                </div>
            )}
        </Fragment>
    );
};

export default CategoryPage;
