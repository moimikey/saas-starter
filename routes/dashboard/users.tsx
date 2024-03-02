// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { Partial } from '$fresh/runtime.ts';
import { defineRoute } from '$fresh/server.ts';
import Head from '@/components/Head.tsx';
import TabsBar from '@/components/TabsBar.tsx';
import UsersTable from '@/islands/UsersTable.tsx';

export default defineRoute((_req, ctx) => {
  const endpoint = '/api/users';

  return (
    <>
      <Head title='Users' href={ctx.url.href}>
        <link
          as='fetch'
          crossOrigin='anonymous'
          href={endpoint}
          rel='preload'
        />
      </Head>
      <main class='mx-auto my-0 max-w-5xl w-full flex flex-col justify-center p-0'>
        <div class='mb-8 text-center'>
          <h1 class='heading-styles'>Dashboard</h1>
          <p class='text-gray-500'>Users</p>
        </div>
        <div class='flex flex-col md:flex-col gap-4'>
          <TabsBar
            links={[{
              path: '/dashboard/stats',
              innerText: 'Stats',
            }, {
              path: '/dashboard/users',
              innerText: 'Users',
            }]}
            currentPath={ctx.url.pathname}
          />
          <Partial name='users'>
            <UsersTable endpoint={endpoint} />
          </Partial>
        </div>
      </main>
    </>
  );
});
