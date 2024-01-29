// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import type { Handlers } from '$fresh/server.ts';
import { getUser, kv } from '@/utils/db.ts';

export const handler: Handlers = {
  async PATCH(_req, ctx) {
    const login = ctx.params.login;
    const key = ['users', login];
    const currentUser = await kv.get(key);

    if (!currentUser.value) return new Response(`${login} not found`);

    const ok = await kv
      .atomic()
      .check(currentUser)
      .set(key, {
        ...currentUser.value,
        isSubscribed: true,
        isAdmin: true,
        isSuperadmin: true,
      })
      .commit();

    if (!ok) throw new Error('Something went wrong.');

    const user = await getUser(login);
    return Response.json(user);
  },
};
