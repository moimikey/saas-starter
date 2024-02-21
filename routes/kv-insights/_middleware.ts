import { FreshContext } from "$fresh/src/server/types.ts";

const USERNAME = Deno.env.get("KV_INSIGHTS_USERNAME");
const PASSWORD = Deno.env.get("KV_INSIGHTS_PASSWORD");

export const handler = [handleKVInsightsAuthorization];

function handleKVInsightsAuthorization(
  request: Request,
  context: FreshContext
) {
  const authorizationValue = request.headers.get("Authorization");
  if (authorizationValue) {
    const basicUserPasswordMatch = authorizationValue.match(/^Basic\s+(.*)$/);
    if (basicUserPasswordMatch) {
      const [user, password] = atob(basicUserPasswordMatch[1]).split(":");
      if (user === USERNAME && password === PASSWORD) {
        return context.next();
      }
    }
  }

  return new Response("401 Unauthorized", {
    status: 401,
    statusText: "Unauthorized",
    headers: {
      "www-authenticate": `Basic realm="420 BYTES"`,
    },
  });
}
