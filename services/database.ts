import { FeedList, FeedListItem } from "@/shared/api.ts";
import { z } from "zod";

export const db = await Deno.openKv();
export const inputSchema = z.array(
  z.object({
    id: z.string(),
    text: z.string().nullable(),
    url: z.string().nullable(),
  })
);
export type InputSchema = z.infer<typeof inputSchema>;

export async function loadList(
  id: string,
  consistency: "strong" | "eventual"
): Promise<FeedList> {
  const out: FeedList = {
    items: [],
  };

  const it = db.list(
    { prefix: ["list", id] },
    {
      reverse: true,
      consistency,
    }
  );
  for await (const entry of it) {
    const item = entry.value as FeedListItem;
    item.id = entry.key[entry.key.length - 1] as string;
    item.versionstamp = entry.versionstamp!;
    out.items.push(item);
  }

  return out;
}

export async function writeItems(
  listId: string,
  inputs: InputSchema
): Promise<void> {
  const currentEntries = await db.getMany(
    inputs.map((input) => ["list", listId, input.id])
  );

  const op = db.atomic();

  inputs.forEach((input, i) => {
    if (input.text === null && input.url === null) {
      op.delete(["list", listId, input.id]);
    } else {
      const current = currentEntries[i].value as FeedListItem | null;
      const now = Date.now();
      const createdAt = current?.createdAt ?? now;

      const item: FeedListItem = {
        text: input.text ?? "",
        url: input.url ?? "",
        createdAt,
        updatedAt: now,
      };
      op.set(["list", listId, input.id], item);
    }
  });
  op.set(["list_updated", listId], true);
  await op.commit();
}
