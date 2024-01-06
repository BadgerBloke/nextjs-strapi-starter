/* eslint-disable no-console */
import assert from 'assert';
import fs from 'fs';
import { google } from 'googleapis';

const categoryIds = {
    Entertainment: 24,
    Education: 27,
    ScienceTechnology: 28,
};

// const videoFilePath = './src/data/ytVideo.wmv';
const videoFilePath = './src/data/VID_20230528_125511.mp4';
const thumbFilePath = './src/data/thumb.jpg';

const oAuth = new google.auth.OAuth2();

export const uploadYouTubeVideo = ({
    title,
    description,
    tags,
    accessToken,
}: {
    title: string;
    description: string;
    tags: string[];
    accessToken: string;
}) => {
    assert(fs.existsSync(videoFilePath));
    assert(fs.existsSync(thumbFilePath));

    console.log({ accessToken });

    oAuth.setCredentials({ access_token: accessToken });

    uploadVideo({ auth: oAuth, title, description, tags });
};

const uploadVideo = ({
    auth,
    title,
    description,
    tags,
}: {
    auth: typeof oAuth;
    title: string;
    description: string;
    tags: string[];
}) => {
    const service = google.youtube('v3');

    service.videos.insert(
        {
            auth: auth,
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title,
                    description,
                    tags,
                    categoryId: String(categoryIds.ScienceTechnology),
                    defaultLanguage: 'en',
                    defaultAudioLanguage: 'en',
                },
                status: {
                    privacyStatus: 'private',
                },
            },
            media: {
                body: fs.createReadStream(videoFilePath),
            },
        },
        (err: Error | null, response?: { data: { id?: string | null } } | null) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                throw err;
            }
            console.log(response?.data);

            console.log('Video uploaded. Uploading the thumbnail now.');
            service.thumbnails.set(
                {
                    auth: auth,
                    videoId: response?.data.id || undefined,
                    media: {
                        body: fs.createReadStream(thumbFilePath),
                    },
                },
                (err: Error | null, res?: { data: unknown } | null) => {
                    if (err) {
                        console.log('The API returned an error: ' + err);
                        return { videoUploadResponse: response };
                    }
                    console.log(res?.data);
                    return { videoUploadResponse: response?.data, thumbnaiilUploadResponse: res?.data };
                }
            );
        }
    );
};
