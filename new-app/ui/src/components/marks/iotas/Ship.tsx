import React, { useCallback, useEffect, useMemo, useState } from "react";
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

function useContactsForSelect(query: string) {
  const contacts = useContacts();
  return useMemo(
    () =>
      _.take(
        _.filter(
          _.map(contacts, (val, key) => ({
            value: key,
            label: val?.nickname || key,
          })),
          ({ label }: { label: string }) =>
            label.length === 0 ? true : label.includes(query)
        ),
        10
      ),
    [contacts, query]
  );
}

function ShipInput(props: ShipInputProps) {
  const { ship, edit } = props;
  const [inputValue, setInputValue] = useState(edit === "edit" ? ship : "");
  useEffect(() => {
    setInputValue(edit === "edit" ? ship : "");
  }, [ship, edit]);

  const contacts = useContactsForSelect(inputValue);
  const onInputChange = useCallback((e: string) => {
    setInputValue(e);
  }, []);

  return (
    <Select
      onInputChange={onInputChange}
      inputValue={inputValue}
      options={contacts}
    />
  );
}
