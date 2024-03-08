import { defineRoute } from '$fresh/server.ts';
import { CSS, render } from '$gfm';
import Head from '@/components/Head.tsx';
import { format } from 'std/datetime/format.ts';

export default defineRoute(async (_req, ctx) => {
  const slug = 'privacy-policy';
  const ext = 'md';
  const pathToFile = `./routes/${slug}/${slug}.${ext}`;
  const file = await Deno.stat(pathToFile);
  const privacyPolicyLastUpdateTimestamp = file.mtime?.toLocaleString() ?? '';
  const text = await Deno.readTextFile(pathToFile);
  const body = text.replace(
    '$LAST_UPDATED_TIMESTAMP',
    format(new Date(privacyPolicyLastUpdateTimestamp), 'yyyy-MM-dd'),
  );

  return (
    <>
      <Head title='Privacy Policy' href={ctx.url.href}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class='flex flex-col justify-center w-full max-w-5xl p-0 mx-auto my-0'>
        <div class='mb-8 text-center'>
          <h1 class='heading-styles'>Privacy Policy</h1>
        </div>
        <div class='flex flex-col md:flex-row columns-1 gap-4'>
          <div
            class='mt-8 markdown-body !bg-transparent !dark:text-white'
            data-color-mode='light'
            dangerouslySetInnerHTML={{ __html: render(body) }}
          />
        </div>
      </main>
    </>
  );
});
