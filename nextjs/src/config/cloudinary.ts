import { v2 } from 'cloudinary';

v2.config({
    cloud_name: String(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
    api_key: String(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY),
    api_secret: String(process.env.CLOUDINARY_API_SECRET),
    secure: true,
});

export { v2 as cloudinary };
