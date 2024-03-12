export interface FeedList {
  items: FeedListItem[];
}

export interface FeedListItem {
  id?: string;
  versionstamp?: string;
  text?: string;
  url?: string;
  createdAt?: string | number | undefined;
  updatedAt?: string | number | undefined;
}
