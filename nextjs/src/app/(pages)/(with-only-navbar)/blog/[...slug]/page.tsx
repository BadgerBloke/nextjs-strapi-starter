import './github-dark.css';

import { Fragment } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge, badgeVariants } from '~/components/ui/badge';
import { getBlogBySlug } from '~/lib/blogs';
import { formatDate, getAvatarText } from '~/lib/general';

type Props = { params: { slug: [string, string | undefined] } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: any = {
    mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [rehypeHighlight],
    },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug?.[1];
    if (params.slug.length < 1) {
        redirect('/blogs');
    } else if (!slug) {
        redirect(`/blogs/${params.slug[0]}`);
    }

    const blog = await getBlogBySlug({ slug });
    return {
        title: `${blog.title} by ${blog.author.data.attributes.name} | MKSingh`,
        description: blog.description,
        openGraph: {
            images: blog.cover.data?.attributes.url,
        },
    };
}

const BlogPage = async ({ params }: Props) => {
    const slug = params.slug[1];
    if (params.slug.length < 1) {
        redirect('/blogs');
    } else if (!slug) {
        redirect(`/blogs/${params.slug[0]}`);
    }

    const blog = await getBlogBySlug({ slug });
    return (
        <Fragment>
            <div className="flex max-w-[100vw] flex-col gap-8 p-4 pt-14 md:max-w-screen-md lg:max-w-screen-lg">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">{blog.title}</h1>
                <div className="flex w-full flex-wrap justify-center gap-6">
                    <Link href={`/blogs/${blog.category}`} className={badgeVariants()}>
                        {blog.category}
                    </Link>
                    <Badge variant="secondary">Updated at: {formatDate(blog.updatedAt)}</Badge>
                </div>
                <div className="flex w-full flex-wrap justify-center gap-6">
                    <div className="flex max-w-sm items-center space-x-4 truncate lg:max-w-full">
                        <Avatar>
                            <AvatarImage src={blog.author.data.attributes.avatar?.data?.attributes.url} />
                            <AvatarFallback>{getAvatarText(blog.author.data.attributes.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">{blog.author.data.attributes.name}</p>
                            <p className="text-sm text-muted-foreground">{blog.author.data.attributes.email}</p>
                        </div>
                    </div>
                </div>
                <p className="text-center leading-7 [&:not(:first-child)]:mt-6">{blog.description}</p>
                <div className="relative aspect-video w-full">
                    <Image
                        src={blog.cover.data?.attributes.url || ''}
                        alt={blog.title}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>
                <article className="prose max-w-none text-foreground dark:prose-invert lg:prose-base prose-headings:text-foreground">
                    <MDXRemote source={blog.content} options={options} />
                </article>
            </div>
        </Fragment>
    );
};

export default BlogPage;
