import React from "react";
import cn from "classnames";
import {
  MarkProps,
  Iota,
  isValidMarkProps,
  EditMarkProps,
} from "../../../types";

interface FlagProps extends MarkProps<Iota> {
  checked?: boolean;
}

function FlagInput(props: FlagProps) {
  const { checked = false, ...rest } = props;
  const onChange = (e: any) => {
    console.log("toggled", e);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
}

interface FlagValueProps extends MarkProps<Iota> {
  checked: boolean;
}

export default function FlagValue(props: FlagValueProps) {
  const { checked, ...rest } = props;
  if (isValidMarkProps(props)) {
    return <FlagInput {...props} />;
  }

  return (
    <div
      className={cn(
        "w-5 h-5 rounded-full",
        checked ? "bg-blue-500" : "bg-red-500"
      )}
    ></div>
  );
}
