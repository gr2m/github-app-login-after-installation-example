# `github-app-login-after-installation-example`

https://github.com/gr2m/github-app-login-after-installation-example/assets/39992/85617322-3778-415c-bf83-3d4ce59c15db

This is an example GitHub app that showcases how to redirect users to your server after they install your GitHub App, and retrieve both the installation and user data.

Before you start, make sure to create `.env.local` file in the root of the project. You can copy the exisitng `.env.local.example` file, it includes credentials for a demo GitHub App without any permissions

```bash
cp .env.local.example .env.local
```

To run the server locally, you can use the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and press the install button. After you install the app on your personal account or an organization, you will be redirected to [http://localhost:3000/welcome](http://localhost:3000/welcome) which will include information both about your instalaltion and the GitHub user account you are logged in with.

## How it works

The server is build using [Next.js](https://nextjs.org/), but any other server-side framework will work as well. The landing page ([app/page.js](app/page.js)) is static and just includes a URL to install the demo GitHub App. Once a user installs the app, they get redirecet to `http://localhost:3000/api/github/oauth/callback?code=...&installation_id=...`. The OAuth callback path is used for manual OAuth flows ("Login with GitHub") as well as the post install callback. See the implementation at [app/api/github/oauth/callback/route.js](app/api/github/oauth/callback/route.js). The route checks for the presence of the `installation_id` query parameter. If it is set, it redirects to `http://localhost:3000/welcome?code=...&installation_id=...`. The page code we use `installation_id` and the GitHub App's ID and private key to retrieve the installation data. Then we use the `code` to exchange it for a user-to-server token which we can use to retrieve the user data. Then we render the infomration on the page. The implementation is in [app/welcome/page.js](app/welcome/page.js).

## License

[ISC](LICENSE.md)
