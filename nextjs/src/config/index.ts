const YOUTUBE_BASE_URL = process.env.YOUTUBE_BASE_URL;
export const config = {
    HOST_URL: String(process.env.NEXT_PUBLIC_HOST_URL),
    YOUTUBE_SEARCH_BASE_URL: `${YOUTUBE_BASE_URL}/youtube/v3/search`,
    YOUTUBE_VIDEOS_BASE_URL: `${YOUTUBE_BASE_URL}/upload/youtube/v3/videos`,
    STRAPI_BASE_URL: String(process.env.STRAPI_URL),
    STRAPI_API_TOKEN: String(process.env.STRAPI_API_TOKEN),
};
