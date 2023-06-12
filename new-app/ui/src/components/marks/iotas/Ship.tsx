import React, { useMemo } from "react";
import _ from "lodash";
import Select from "react-select";
import { useContacts } from "../../../state/contacts";
import {
  MarkProps,
  Iota,
  isValidMarkProps,
  EditMarkProps,
} from "../../../types";

interface ShipValueProps extends MarkProps<Iota> {
  ship: string;
}

export default function ShipValue(props: ShipValueProps) {
  const { ship, ...rest } = props;

  console.log(rest);
  if (isValidMarkProps(rest)) {
    return <ShipInput ship={ship} {...rest} />;
  }
  return <p>{ship}</p>;
}

interface ShipInputProps extends EditMarkProps<Iota> {
  ship: string;
}

function useContactsForSelect() {
  const contacts = useContacts();
  return useMemo(
    () => _.map(contacts, (val, key) => ({ ...val, patp: key })),
    [contacts]
  );
}

function ShipInput(props: ShipInputProps) {
  const contacts = useContactsForSelect();
  console.log(contacts);

  return <Select options={contacts} />;
}
