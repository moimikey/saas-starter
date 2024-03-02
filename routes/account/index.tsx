// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { defineRoute } from '$fresh/server.ts';
import GitHubAvatarImg from '@/components/GitHubAvatarImg.tsx';
import Head from '@/components/Head.tsx';
import { PremiumBadge } from '@/components/PremiumBadge.tsx';
import type { SignedInState } from '@/plugins/session.ts';
import { isStripeEnabled } from '@/utils/stripe.ts';

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
      <main class='mx-auto my-0 max-w-5xl w-full flex flex-col justify-center p-0'>
        <div class='mb-8 text-center'>
          <h1 class='heading-styles'>Account</h1>
          <p class='text-gray-500'>My Profile</p>
        </div>
        <div class='flex flex-col md:flex-row columns-1 gap-4'>
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
        </div>
        <div>
          <a
            href='/signout?success_url=/'
            class='button-styles block text-center'
          >
            Sign out
          </a>
        </div>
      </main>
    </>
  );
});
