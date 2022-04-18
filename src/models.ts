export type ValueOf<T> = T[keyof T];

export interface Query<T = any> {
  type: string;
  data: T;
}

export interface Farewell {
  farewell?: string;
}

export interface Selector {
  selectorType: string;
  selector: string;
  color: string;
}

export interface SyncOptions<T, D> {
  //function that will be executed when data from storage will be received
  onSync?: (data: T | D) => void;
  //value that onSync function will return if there is no prerecorded value
  defaultValue?: D | null;
}

export type ActiveTabMessageProps<M = any, R = any> = [
  type: string,
  message: M,
  responseCallback?: (response: R) => void
];
