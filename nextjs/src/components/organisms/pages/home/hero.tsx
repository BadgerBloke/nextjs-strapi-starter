import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const Hero = ({
    heading = 'Pave the Way through Uncharted Terrain with MKSingh',
    description = 'MKSingh: Your path to conquering digital challenges. Explore software, identity, web, legal, and tax solutions with us. Break boundaries and thrive.',
    action = false,
    className,
}: {
    heading?: string;
    description?: string;
    action?: boolean;
    className?: string;
}) => {
    return (
        <div className={cn('mx-auto max-w-2xl px-6 py-24 sm:py-40 lg:px-8 lg:py-52', className)}>
            <div className="z-0 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-4xl">{heading}</h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">{description}</p>
                {action && (
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/blogs" className={buttonVariants({ variant: 'link' })}>
                            Learn more{' '}
                            <span aria-hidden="true" className="ml-1">
                                →
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
