// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { getPost, getPosts } from './posts.ts';

import { assert, assertEquals } from 'std/assert/mod.ts';

const CURRENT_NUMBER_OF_POSTS = 1;

Deno.test('[blog] getPost()', async () => {
  const post = await getPost('2023-02-20-deno-first-thoughts');
  assert(post);
  assertEquals(post.publishedAt, new Date('2024-02-20T01:00:00.000Z'));
  assertEquals(
    post.summary,
    'What are the reasons that convinced me to use Deno and Deno Deploy for my small and large projects.',
  );
  assertEquals(post.title, 'Why I use Deno and Deno Deploy');
  assertEquals(await getPost('nonexistent-post'), null);
});

Deno.test('[blog] getPosts()', async () => {
  const posts = await getPosts();
  assert(posts);
  assertEquals(posts.length, CURRENT_NUMBER_OF_POSTS);
});
