export interface TodoList {
  items: TodoListItem[];
}

export interface TodoListItem {
  id?: string;
  versionstamp?: string;

  text?: string;
  url?: string;
  createdAt: number;
  updatedAt: number;
}
