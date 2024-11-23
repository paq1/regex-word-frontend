export interface SingleJsonApi<T> {
  data: Entity<T>;
}

export interface Entity<T> {
  type: string;
  id: string;
  attributes: T
}
