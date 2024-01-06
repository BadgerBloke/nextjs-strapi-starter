import crypto from 'crypto';

export const generateRandomToken = (byte?: number): string => crypto.randomBytes(byte || 32).toString('hex');
