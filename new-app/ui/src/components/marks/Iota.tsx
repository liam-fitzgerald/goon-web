import React from "react";
import ShipValue from "./iotas/Ship";
import { Iota, MarkProps } from "../../types";
import FlagValue from "./iotas/Flag";

interface IotaProps extends MarkProps<Iota> {
  iota: Iota;
}

export default function Iota(props: IotaProps) {
  const { iota, ...rest } = props;
  const { aura, data } = iota;
  if (iota.aura.startsWith("t")) {
    return <p>{iota.data}</p>;
  }
  switch (iota.aura) {
    case "p":
      return <ShipValue ship={iota.data} {...rest} />;
    case "f":
      return <FlagValue checked={iota.data === ".y"} {...rest} />;
    default:
      return <p>Unsupported aura</p>;
  }
}
