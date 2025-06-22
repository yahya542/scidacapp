import 'dotenv/config';

export default {
  expo: {
    name: "StudoraApp",
    slug: "studora-app",
    version: "1.0.0",
    extra: {
      CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL,
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    }
  }
}
