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
      permissions: ["INTERNET"],
    },
    extra: {
      eas: {
        projectId: "46be1248-5755-4fa1-916c-54baedfcb238",
      },
    },
  },
};
