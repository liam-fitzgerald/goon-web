import _ from "lodash";

export interface Page {
  mark: string;
  data: any;
}

export interface Iota {
  aura: string;
  data: string;
}

export interface ImageMark {
  src: string;
  aspectRatio: number;
}

export type EditMode = "add" | "edit";
export type EditState = EditMode | undefined;

export interface MarkProps<T> {
  path: string;
  edit?: EditState;
  onChange?: (t: T) => Promise<void>;
}

export function isValidMarkProps<T>(x: MarkProps<T>): x is EditMarkProps<T> {
  return !!(!!x.edit && (true || !!x.onChange));
}

export interface EditMarkProps<T> {
  path: string;
  edit: EditMode;
  onChange: (t: T) => Promise<void>;
}

export type Hint =
  | {
      list: null;
    }
  | {
      "no-reorg": null;
    };

export interface GoonAct {
  term: string;
  info: string;
  lede: string;
}
export type GoonAttr =
  | { lede: string }
  | { info: string }
  | { value: Page }
  | { edit: null }
  | { add: null }
  | { act: GoonAct[] }
  | { click: null }
  | { hint: Hint[] };

export interface Goad {
  iota: string;
  attr: GoonAttr[];
  child: Goad[];
}

interface Attrs {
  lede?: string;
  info?: string;
  value?: Page;
  edit?: null;
  add?: null;
  act?: GoonAct[];
  click?: null;
  hint?: Hint[];
}

export interface Load {
  iota: string;
  attr: Attrs;
  child: Load[];
  path: string;
}

export function toLoad(goad: Goad, path = ""): Load {
  const p = `${path}/${goad.iota}`;
  return {
    ...goad,
    path: p,
    child: goad.child.map((c) => toLoad(c, p)),
    attr: _.reduce(
      goad.attr,
      (acc, val) => {
        const key = Object.keys(val)[0];
        return { ...acc, [key]: (val as any)[key] };
      },
      {} as Attrs
    ),
  };
}

export function getEditMode(x: Load): EditState {
  return "add" in x.attr ? "add" : "edit" in x.attr ? "edit" : undefined;
}
