// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import kvOAuthPlugin from "@/plugins/kv_oauth.ts";
import sessionPlugin from "@/plugins/session.ts";
import errorHandling from "@/plugins/error_handling.ts";
import securityHeaders from "@/plugins/security_headers.ts";
import welcomePlugin from "@/plugins/welcome.ts";
import { FlowbitePlugin } from "$flowbite/index.ts";
import { ga4Plugin } from "https://deno.land/x/fresh_ga4@0.0.4/mod.ts";
import { FreshConfig } from "$fresh/src/server/types.ts";
import tailwindPlugin from "$fresh/plugins/tailwind.ts";
import { kvInsightsPlugin } from "https://deno.land/x/deno_kv_insights@v0.8.0-beta/mod.ts";

export default {
  plugins: [
    ga4Plugin(),
    welcomePlugin,
    kvOAuthPlugin,
    sessionPlugin,
    tailwindPlugin(),
    FlowbitePlugin(),
    kvInsightsPlugin(),
    errorHandling,
    securityHeaders,
  ],
} satisfies FreshConfig;
