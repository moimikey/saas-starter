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
  const decorations = new Set<string>();
  sessionUser.isAdmin && decorations.add('admin');
  sessionUser.isSuperadmin && decorations.add('superadmin');
  sessionUser.isSubscribed && decorations.add('subscriber');

  const decorationString = Array.from(decorations).map((decoration) => (
    <span
      class='bg-primary hover:bg-primary-200 text-white text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-primary border border-primary inline-flex items-center justify-center'
      key={decoration}
    >
      {decoration}
    </span>
  ));

  return (
    <>
      <Head title='Account' href={ctx.url.href} />
      <main class='flex flex-col justify-center w-full max-w-5xl p-0 mx-auto my-0'>
        <div class='mb-8 text-center'>
          <h1 class='heading-styles'>Account</h1>
          <p class='text-gray-500'>My Profile</p>
        </div>
        <div class='flex flex-col md:flex-row columns-1 gap-4'>
          <div class='flex flex-col items-center gap-4'>
            <GitHubAvatarImg login={sessionUser.login} size={200} class='mx-auto' />
            <a href={`/users/${sessionUser.login}`} class='link-styles'>
              Go to my profile &#8250;
            </a>
            <div class='flex space-y-4'>
              <a
                href='/signout?success_url=/'
                class='block text-center button-styles'
              >
                Sign out
              </a>
            </div>
          </div>
          <ul class='flex flex-col m-4 gap-4'>
            <li>
              <strong>Username</strong>
              <p class='flex flex-wrap justify-between'>
                <span>
                  {sessionUser.login} {decorationString}
                </span>
              </p>
            </li>
            <li>
              <strong>Subscription</strong>
              <p class='flex flex-wrap justify-between'>
                <span>
                  {sessionUser.isSubscribed
                    ? (
                      <>
                        Premium <PremiumBadge class='inline w-5 h-5' />
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
      </main>
    </>
  );
});
