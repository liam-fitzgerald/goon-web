import React from "react";
import { useGoonClick } from "../state/goon";
import { getEditMode, Load, GoonAct } from "../types";
import Copy from "./copy";
import { Mark } from "./Mark";

interface WineProps {
  load: Load;
}

type Grape = "full" | "button" | "no-copy" | "children-only";

function smell(load: Load) {
  if (
    "click" in load.attr &&
    !("value" in load.attr) &&
    load.child.length === 0
  ) {
    return "button";
  }
  return "full";
  // TODO: unstub
  if ("value" in load.attr) {
    if ("lede" in load.attr) {
      return "full";
    }
    return "no-copy";
  }

  return "children-only";
}
const emptyArr = [] as GoonAct[];

function FullWine({ load }: WineProps) {
  const { info = "", lede = "", value, act = emptyArr } = load.attr;
  return (
    <Copy
      size="md"
      info={info}
      lede={lede}
      act={act}
      path={load.path}
      value={
        value ? (
          <Mark edit={getEditMode(load)} page={value} path={load.path} />
        ) : null
      }
    >
      {load.child.map((c) => (
        <Wine key={c.iota} load={c} />
      ))}
    </Copy>
  );
}

function ButtonWine({ load }: WineProps) {
  const onClick = useGoonClick(load.path);
  return (
    <button onClick={onClick} className="bg-blue-500 text-white" type="button">
      {load.attr.lede}
    </button>
  );
}

export default function Wine(props: WineProps) {
  const { load } = props;
  const { child, attr, iota } = load;
  const grape = smell(load);

  switch (grape) {
    case "full":
      return <FullWine load={load} />;
    case "button":
      return <ButtonWine load={load} />;
    case "no-copy":
      return null;
    case "children-only":
      return null;
    default:
      return null;
  }
}
