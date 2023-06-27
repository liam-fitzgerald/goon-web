import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import useDebounceEffect from "../../../hooks/useDebounceEffect";
import {
  EditMarkProps,
  Iota,
  isValidMarkProps,
  MarkProps,
} from "../../../types";
import { goonEdit } from "../../../state/goon";

interface TextInputProps extends EditMarkProps<Iota> {
  text: string;
}

function TextInput(props: TextInputProps) {
  const { edit, text, path } = props;
  const loadingRef = useRef<number>(0);
  const [value, setValue] = useState(text);
  useEffect(() => {
    if (loadingRef.current === 0) {
      setValue(text);
    }
  }, [text]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    if (v.length !== 0) {
      loadingRef.current += 1;
      goonEdit(path, edit, { mark: "iota", data: { aura: "t", data: v } }).then(
        () => {
          loadingRef.current -= 1;
        }
      );
    }
  };

  return (
    <input
      className="border border-gray-400 rounded-md"
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

interface TextValueProps extends MarkProps<Iota> {
  text: string;
}

export default function TextValue(props: TextValueProps) {
  const { text, ...rest } = props;

  if (isValidMarkProps(rest)) {
    return <TextInput text={text} {...rest} />;
  }

  return <p>{text}</p>;
}
