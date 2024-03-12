import { Head } from '$fresh/runtime.ts';
import { FreshContext, Handlers } from '$fresh/server.ts';
import ListView from '@/islands/ListView.tsx';
import { SignedInState } from '@/plugins/session.ts';
import { db, inputSchema, loadList, writeItems } from '@/services/database.ts';
import { FeedList } from '@/shared/api.ts';
import { redirect } from '@/utils/http.ts';

export const handler: Handlers<undefined, SignedInState> = {
  GET: async (req, ctx: FreshContext<SignedInState>) => {
    const listId = ctx.params.listId;
    const accept = req.headers.get('accept');
    const url = new URL(req.url);
    const sessionUser = ctx.state.sessionUser;
    const isSignedIn = sessionUser !== undefined;

    if (isSignedIn) {
      if (listId !== sessionUser.login && !sessionUser.isSuperadmin) {
        return redirect(`/links/${sessionUser.login}`);
      }
    }

    if (accept === 'text/event-stream') {
      const stream = db.watch([['list_updated', listId]]).getReader();
      const body = new ReadableStream({
        async start(controller) {
          console.debug(
            `Opened stream for list ${listId} remote ${
              JSON.stringify(
                ctx.remoteAddr,
              )
            }`,
          );
          while (true) {
            try {
              if ((await stream.read()).done) {
                return;
              }

              const data = await loadList(listId, 'strong');
              const chunk = `data: ${JSON.stringify(data)}\n\n`;
              controller.enqueue(new TextEncoder().encode(chunk));
            } catch (e) {
              console.error(`Error refreshing list ${listId}`, e);
            }
          }
        },
        cancel() {
          stream.cancel();
          console.debug(
            `Closed stream for list ${listId} remote ${
              JSON.stringify(
                ctx.remoteAddr,
              )
            }`,
          );
        },
      });
      return new Response(body, {
        headers: {
          'content-type': 'text/event-stream',
        },
      });
    }

    const startTime = Date.now();
    const data = await loadList(
      listId,
      url.searchParams.get('consistency') === 'strong' ? 'strong' : 'eventual',
    );
    const endTime = Date.now();
    const res = await ctx.render({ data, latency: endTime - startTime });
    res.headers.set('x-list-load-time', '' + (endTime - startTime));
    return res;
  },
  POST: async (req, ctx) => {
    const listId = ctx.params.listId;
    const body = inputSchema.parse(await req.json());
    await writeItems(listId, body);
    return Response.json({ ok: true });
  },
};

function Home({
  data: { data, latency },
}: {
  data: { data: FeedList; latency: number };
}) {
  return (
    <>
      <Head>
        <title>Links</title>
      </Head>
      <main class='flex flex-col justify-center w-full max-w-5xl p-0 mx-auto my-0'>
        <div class='mb-8 text-center'>
          <h1 class='heading-styles'>Links</h1>
          <p class='text-gray-500'>Expand URLs</p>
        </div>
        <ListView initialData={data} latency={latency} />
      </main>
    </>
  );
}

export default Home;
