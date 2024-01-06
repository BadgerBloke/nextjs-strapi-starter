export type BlogType = {
    id: number;
    attributes: {
        title: string;
        description: string;
        content: string;
        slug: string;
        category: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        locale: string;
        author: AuthorType;
        cover: CoverType;
    };
};

export type BlogListType = {
    id: number;
    attributes: {
        title: string;
        description: string;
        slug: string;
        category: string;
        updatedAt: string;
        author: AuthorType;
        cover?: CoverType;
    };
}[];

type CoverType = {
    data?: {
        id: number;
        attributes: {
            name: string;
            alternativeText: string | null;
            caption: string | null;
            width: number;
            height: number;
            formats: {
                large: ImageFormatType;
                small: ImageFormatType;
                medium: ImageFormatType;
                thumbnail: ImageFormatType;
            };
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: string | null;
            provider: string;
            provider_metadata: {
                public_id: string;
                resource_type: string;
            };
            createdAt: string;
            updatedAt: string;
        };
    };
};

type ImageFormatType = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    provider_metadata: {
        public_id: string;
        resource_type: string;
    };
};

export type AuthorType = {
    data: {
        id: number;
        attributes: {
            name: string;
            email: string;
            avatar?: {
                data?: {
                    id: number;
                    attributes: {
                        name: string;
                        alternativeText: string | null;
                        caption: string | null;
                        width: number;
                        height: number;
                        formats: {
                            thumbnail: ImageFormatType;
                        };
                        hash: string;
                        ext: string;
                        mime: string;
                        size: number;
                        url: string;
                        previewUrl: string | null;
                        provider: string;
                        provider_metadata: {
                            public_id: string;
                            resource_type: string;
                        };
                        createdAt: string;
                        updatedAt: string;
                    };
                };
            };
        };
    };
};
