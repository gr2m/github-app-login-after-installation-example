import { redirect } from "next/navigation";

/**
 *
 * @param {import("next/server").NextRequest} request
 */
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  // ?installation_id is set for post app install callback
  const installationId = searchParams.get("installation_id");

  if (installationId) {
    return redirect(`/welcome${request.nextUrl.search}`);
  }

  // implement other OAuth callback flows here.
  // ProTip™: You can use the `state` argument to set a redirect path
  return new Response("?installation_id is not set", { status: 404 });
}
