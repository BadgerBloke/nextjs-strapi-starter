const config = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT),
    appwriteProjectID: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    ssrHostName: String(process.env.SSR_HOST_NAME),
    appwriteHostName: String(process.env.APPWRITE_HOST_NAME),
    appwriteAPIKey: String(process.env.APPWRITE_API_KEY),
    databaseID: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    collections: {
        contact: { key: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACT), name: 'contact' },
        institute: { key: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_INSTITUTE), name: 'institute' },
    },
};

export default config;
