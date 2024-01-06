'use client';

import Link from 'next/link';

const ErrorFallbackPage = () => (
    <div className="mx-auto flex w-full flex-col items-center justify-center">
        <div>Something went wrong...</div>
        <Link href="/blogs">Go back to Blogs</Link>
    </div>
);

export default ErrorFallbackPage;
