import React from "react";
import { Load } from "../types";
import Wine from "./Wine";

interface PourProps {
  load: Load[];
}

export default function Pour(props: PourProps) {
  const { load } = props;

  return (
    <div className="flex-col">
      {load.map((l) => (
        <Wine load={l} />
      ))}
    </div>
  );
}
