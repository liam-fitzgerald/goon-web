import React, { useCallback, useState } from "react";
import { format } from "date-fns";
import { daToUnix, parseDa } from "@urbit/aura";
import {
  EditMarkProps,
  Iota,
  isValidMarkProps,
  MarkProps,
} from "../../../types";

interface DateInputProps extends EditMarkProps<Iota> {
  date: string;
}

function DateInput(props: DateInputProps) {
  const { date, edit, ...rest } = props;
  const unix = daToUnix(parseDa(date));
  const [dayValue, setDayValue] = useState(
    edit === "add" ? "" : format(new Date(unix), "yyyy-MM-dd")
  );
  const [timeValue, setTimeValue] = useState(
    edit === "add" ? "" : format(new Date(unix), "hh:MM")
  );
  const onDayChange = useCallback((e) => {
    console.log(e.target.value);
    setDayValue(e.target.value);
  }, []);

  const onTimeChange = useCallback((e) => {
    console.log(e.target.value);
    setTimeValue(e.target.value);
  }, []);
  return (
    <div className="flex p-2">
      <input type="date" value={dayValue} onChange={onDayChange} />
      <input type="time" value={timeValue} onChange={onTimeChange} />
    </div>
  );
}

interface DateValueProps extends MarkProps<Iota> {
  date: string;
}

export default function DateValue(props: DateValueProps) {
  const { date, ...rest } = props;
  if (isValidMarkProps(rest)) {
    return <DateInput date={date} {...rest} />;
  }

  return <p>{date}</p>;
}
