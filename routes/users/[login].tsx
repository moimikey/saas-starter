// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import type { State } from "@/plugins/session.ts";
import { getUser } from "@/utils/db.ts";
import IconBrandGithub from "tabler_icons_tsx/brand-github.tsx";
import IconShieldCheckFilled from "tabler_icons_tsx/shield-check-filled.tsx";
import IconShield from "tabler_icons_tsx/shield.tsx";
import Head from "@/components/Head.tsx";
import GitHubAvatarImg from "@/components/GitHubAvatarImg.tsx";
import ItemsList from "@/islands/ItemsList.tsx";
import { defineRoute } from "$fresh/server.ts";
import { PremiumBadge } from "@/components/PremiumBadge.tsx";

interface UserProfileProps {
  login: string;
  isSubscribed: boolean;
  isAdmin: boolean;
  isSuperadmin: boolean;
}

function UserProfile(props: UserProfileProps) {
  return (
    <div class="flex flex-col items-center w-[16rem]">
      <GitHubAvatarImg login={props.login} size={200} />
      <div class="flex gap-x-2 px-4 mt-4 items-center">
        <span class="font-semibold text-xl">{props.login}</span>
        {props.isSubscribed && (
          <span
            aria-label={`${props.login} is a Paid Subscriber`}
            title={`${props.login} is a Paid Subscriber`}
          >
            <PremiumBadge class="w-6 h-6 inline" />
          </span>
        )}
      </div>
      <div class="flex gap-x-2 px-4 mt-1 items-center">
        {props.isSuperadmin && (
          <span
            aria-label={`${props.login} is a Superadmin`}
            title={`${props.login} is a Superadmin`}
          >
            <IconShieldCheckFilled class="w-6" />
          </span>
        )}
        {props.isAdmin && (
          <span
            aria-label={`${props.login} is an Admin for this organization`}
            title={`${props.login} is an Admin for this organization`}
          >
            <IconShield class="w-6" />
          </span>
        )}
        <span
          aria-label={`${props.login} is an Admin for this organization`}
          title={`${props.login} is an Admin for this organization`}
        >
          <a className="link-styles" href={`/links/${props.login}`}>
            {props.login}'s Links
          </a>
        </span>
      </div>
      <div class="flex gap-x-2 px-4 mt-4 items-center">
        <a
          href={`https://github.com/${props.login}`}
          aria-label={`${props.login}'s GitHub profile`}
          title={`${props.login}'s GitHub profile`}
          class="link-styles"
          target="_blank"
        >
          <IconBrandGithub class="w-6" />
        </a>
      </div>
    </div>
  );
}

export default defineRoute<State>(async (_req, ctx) => {
  const { login } = ctx.params;

  const user = await getUser(login);

  if (user === null) return await ctx.renderNotFound();

  const isSignedIn = ctx.state.sessionUser !== undefined;
  const endpoint = `/api/users/${login}/items`;

  return (
    <>
      <Head title={user.login} href={ctx.url.href}>
        <link
          as="fetch"
          crossOrigin="anonymous"
          href={endpoint}
          rel="preload"
        />
        {isSignedIn && (
          <link
            as="fetch"
            crossOrigin="anonymous"
            href="/api/me/votes"
            rel="preload"
          />
        )}
      </Head>
      <main class="flex-1 p-4 flex flex-col md:flex-row gap-8">
        <div class="flex justify-center p-4">
          <UserProfile {...user} />
        </div>
        <ItemsList endpoint={endpoint} isSignedIn={isSignedIn} />
      </main>
    </>
  );
});
