// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import Head from '@/components/Head.tsx';
import UsersTable from '@/islands/UsersTable.tsx';
import { defineRoute } from '$fresh/server.ts';
import { Partial } from '$fresh/runtime.ts';

export default defineRoute((_req, ctx) => {
  const endpoint = '/api/users';

  return (
    <>
      <Head title='Links' href={ctx.url.href}>
        <link
          as='fetch'
          crossOrigin='anonymous'
          href={endpoint}
          rel='preload'
        />
      </Head>
      <main class='flex-1 p-4 f-client-nav'>
        <h1 class='heading-with-margin-styles'>Links</h1>
        <Partial name='users'>
          <UsersTable endpoint={endpoint} />
        </Partial>
      </main>
    </>
  );
});
