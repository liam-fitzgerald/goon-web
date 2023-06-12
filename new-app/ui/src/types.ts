import _ from "lodash";

export interface Page {
  mark: string;
  data: any;
}

export interface Iota {
  aura: string;
  data: string;
}

export type EditMode = "add" | "edit";
export type EditState = EditMode | undefined;

export interface MarkProps<T> {
  path: string;
  edit?: EditState;
  onChange?: (t: T) => Promise<void>;
}

export function isValidMarkProps<T>(x: MarkProps<T>): x is EditMarkProps<T> {
  return !!(!!x.edit && !!x.onChange);
}

export interface EditMarkProps<T> {
  path: string;
  edit: EditMode;
  onChange: (t: T) => Promise<void>;
}
