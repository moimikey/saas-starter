export interface FeedList {
  items: FeedListItem[];
}

export interface FeedListItem {
  id?: string;
  versionstamp?: string;

  text?: string;
  url?: string;
  createdAt: number;
  updatedAt: number;
}
