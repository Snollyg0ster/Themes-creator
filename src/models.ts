export interface Query<T = any> {
  type: string;
  data: T;
}

export interface Farewell {
  farewell?: string;
}

export interface TabInfo {
  title: string | undefined;
}