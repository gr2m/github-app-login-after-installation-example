import octokitApp from "../octokit/app";

export default async function Welcome({ params, searchParams }) {
  const { installation_id, code } = searchParams;

  // make sure we have the installation_id and code
  if (!code || !installation_id) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">Missing code or installation_id</div>
      </div>
    );
  }

  // get installation information)
  const { data: installation } = await octokitApp.octokit.request(
    "GET /app/installations/{installation_id}",
    {
      installation_id,
    }
  );

  // exchange the code for an access token
  const { authentication } = await octokitApp.oauth.createToken({
    code,
  });

  // get the user's information
  const octokit = await octokitApp.oauth.getUserOctokit({ code });
  const { data: user } = await octokit.request("GET /user", {
    headers: {
      authorization: `token ${authentication.token}`,
    },
  });

  return (
    <div className="flex h-screen">
      <div className="m-auto text-center">
        <h1 className="text-4xl font-extrabold dark:text-white mb-4">
          Welcome{" "}
          <a className="underline hover:no-underline" href={user.html_url}>
            @{user.login}
          </a>
          !
        </h1>
        You just installed the app in{" "}
        <a
          className="underline hover:no-underline"
          href={installation.account.html_url}
        >
          @{installation.account.login}
        </a>
      </div>
    </div>
  );
}
