// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { defineRoute } from '$fresh/server.ts';
import { CSS, render } from '$gfm';
import GitHubAvatarImg from '@/components/GitHubAvatarImg.tsx';
import Head from '@/components/Head.tsx';
import { timeAgo } from '@/utils/display.ts';
import { getPost } from '@/utils/posts.ts';

export default defineRoute(async (_req, ctx) => {
  const post = await getPost(ctx.params.slug);
  if (post === null) return await ctx.renderNotFound();
  const publishDate = !post.publishedAt ? null : new Date(post.publishedAt);

  return (
    <>
      <Head title={post.title} href={ctx.url.href}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class='p-4 flex-1'>
        <h1 class='text-4xl font-bold'>{post.title}</h1>
        <div class='grid gap-2 grid-flow-col auto-cols-[minmax(0,_max-content)]'>
          <p class='text-gray-500 self-center'>
            <GitHubAvatarImg login='moimikey' size={24} class='mr-2' />
            <a class='hover:underline' href={`/users/moimikey`}>
              moimikey
            </a>
            {publishDate && timeAgo(publishDate)}
          </p>
        </div>
        <div
          class='mt-8 markdown-body !bg-transparent !dark:text-white'
          data-color-mode='light'
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
    </>
  );
});
