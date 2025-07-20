import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile_pics', // diff folders for diff stuff
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 300, height: 300, crop: 'fill' }],
  },
});

export const profileUpload = multer({ storage: profileStorage });
