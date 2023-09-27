import { App } from "@octokit/app";

const app = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: String(process.env.GITHUB_APP_PRIVATE_KEY).replace(/\\n/g, "\n"),
  oauth: {
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
  },
});

export default app;
