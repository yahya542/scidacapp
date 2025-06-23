import 'dotenv/config';

export default {
  expo: {
    name: "StudoraApp",
    slug: "studora-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/studora.png",
    scheme: "studora",
    userInterfaceStyle: "automatic",
    android: {
      package: "com.yahya.studora",
      permissions: ["INTERNET"]
    },
    extra: {
      eas: {
        projectId: "46be1248-5755-4fa1-916c-54baedfcb238",
      },
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      OPENROUTER_KEY: process.env.OPENROUTER_KEY
    }
  }
};
