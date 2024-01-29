// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { defineRoute } from '$fresh/server.ts';
import type { SignedInState } from '@/plugins/session.ts';
import { isStripeEnabled } from '@/utils/stripe.ts';
import Head from '@/components/Head.tsx';
import GitHubAvatarImg from '@/components/GitHubAvatarImg.tsx';
import { PremiumBadge } from '@/components/PremiumBadge.tsx';

export default defineRoute<SignedInState>((_req, ctx) => {
  const { sessionUser } = ctx.state;
  const action = sessionUser.isSubscribed ? 'Manage' : 'Upgrade';
  const decorations = new Set();
  sessionUser.isAdmin && decorations.add('admin');
  sessionUser.isSuperadmin && decorations.add('superadmin');
  sessionUser.isSubscribed && decorations.add('subscriber');
  const decorationString = Array.from(decorations).join(', ').trim();
  return (
    <>
      <Head title='Account' href={ctx.url.href} />
      <main class='max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center gap-8'>
        <GitHubAvatarImg login={sessionUser.login} size={240} class='mx-auto' />
        <ul class='space-y-4'>
          <li>
            <strong>Username</strong>
            <p class='flex flex-wrap justify-between'>
              <span>
                {sessionUser.login} ({decorationString})
              </span>
              <a href={`/users/${sessionUser.login}`} class='link-styles'>
                Go to my profile &#8250;
              </a>
            </p>
          </li>
          <li>
            <strong>Subscription</strong>
            <p class='flex flex-wrap justify-between'>
              <span>
                {sessionUser.isSubscribed
                  ? (
                    <>
                      Premium <PremiumBadge class='w-5 h-5 inline' />
                    </>
                  )
                  : (
                    'Free'
                  )}
              </span>
              {isStripeEnabled() && (
                <span>
                  <a
                    class='link-styles'
                    href={`/account/${action.toLowerCase()}`}
                  >
                    {action} &#8250;
                  </a>
                </span>
              )}
            </p>
          </li>
        </ul>
        <a
          href='/signout?success_url=/'
          class='button-styles block text-center'
        >
          Sign out
        </a>
      </main>
    </>
  );
});
