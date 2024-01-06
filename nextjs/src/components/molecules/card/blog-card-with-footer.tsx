import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { Card as CardPrimitive, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { AuthorType } from '~/interfaces/blog';
import { getAvatarText } from '~/lib/general';

interface BlogCardFooterProps {
    image: string;
    category: string;
    title: string;
    description: string;
    footer: string;
    author: AuthorType;
    slug: string;
}

const BlogCardWithFooter = ({ image, category, title, footer, author, description, slug }: BlogCardFooterProps) => {
    return (
        <CardPrimitive className="group flex max-w-xs flex-col overflow-hidden">
            <Link href={`/blog/${category}/${slug}`}>
                <CardHeader className="relative mb-6 flex h-40 w-full overflow-hidden p-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="transform rounded-t-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </CardHeader>
            </Link>
            <CardContent className="flex flex-1 flex-col gap-4">
                <div className="flex flex-1 flex-col justify-between gap-4">
                    <Link href={`/blog/${category}/${slug}`}>
                        <CardTitle className="line-clamp-2 py-1">{title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-4">{description}</CardDescription>
                    </Link>
                    <div className="flex max-w-64 items-center space-x-4 truncate">
                        <Avatar>
                            <AvatarImage src={author.data.attributes.avatar?.data?.attributes.url} />
                            <AvatarFallback>{getAvatarText(author.data.attributes.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">{author.data.attributes.name}</p>
                            <p className="text-sm text-muted-foreground">{author.data.attributes.email}</p>
                        </div>
                    </div>
                </div>
                <Separator className="my-1" />
                <div className="flex w-full max-w-64 items-center justify-between">
                    <Link href={`/blogs/${category}`}>
                        <Badge>{category}</Badge>
                    </Link>
                    <p className="text-sm text-muted-foreground">{footer}</p>
                </div>
            </CardContent>
        </CardPrimitive>
    );
};

export default BlogCardWithFooter;
