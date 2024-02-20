// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { redirect } from "@/utils/http.ts";
import { Handlers } from "$fresh/server.ts";
// import { encodeBase58 } from "std/encoding/base58.ts";

export const handler: Handlers = {
  GET(req) {
    // const listId = encodeBase58(crypto.getRandomValues(new Uint8Array(4)));
    // return redirect(`/links/${listId}`);
    return redirect(`/links/public`);
  },
};
