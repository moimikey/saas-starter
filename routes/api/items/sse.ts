import { Handlers } from '$fresh/server.ts';
import { ServerSentEventStream } from 'std/http/server_sent_event_stream.ts';

export const handler: Handlers = {
  async POST(_req: Request) {
    // const payload = await req.json();

    // todo: can check payload / auth check here
    // if you use client npm package "fetch-event-source"
    /*
    if (!authorized) {
      return Response.json({
        message: 'not allowed'
      }, { status: 403 })
    }
    */

    const db = await Deno.openKv();

    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const [{ value: message }] of db.watch([['items']])) {
            controller.enqueue({
              data: JSON.stringify(message),
              id: Date.now(),
              event: 'message',
            });
          }
        },
        cancel() {
          console.log('cancel');
        },
      }).pipeThrough(new ServerSentEventStream()),
      {
        headers: {
          'Content-Type': 'text/event-stream',
        },
      },
    );
  },
};
