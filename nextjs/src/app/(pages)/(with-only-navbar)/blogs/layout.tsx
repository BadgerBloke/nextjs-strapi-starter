const BlogLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-start gap-16">{children}</div>;
};

export default BlogLayout;
