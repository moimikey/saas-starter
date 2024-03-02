import { defineRoute } from '$fresh/server.ts';
import { CSS, render } from '$gfm';
import Head from '@/components/Head.tsx';
import { join } from 'std/path/join.ts';

export default defineRoute(async (_req, ctx) => {
  const slug = 'terms-and-conditions';
  const ext = 'md';
  const text = await Deno.readTextFile(`./routes/${slug}/${slug}.${ext}`);

  console.log({ text });

  return (
    <>
      <Head title='Terms &amp; Conditions' href={ctx.url.href}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class='p-4 flex-1'>
        <div
          class='mt-8 markdown-body !bg-transparent !dark:text-white'
          data-color-mode='light'
          dangerouslySetInnerHTML={{ __html: render(text) }}
        />
      </main>
    </>
  );
});
