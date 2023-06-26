import { useMemo, useEffect, useState } from "react";
import _ from "lodash";

export default function useDebounceEffect<T>(
  ms: number,
  value: T,
  cb: (val: T) => void
) {
  const [val, setVal] = useState(value);
  const setDebVal = useMemo(() => _.debounce(setVal, ms), []);
  useEffect(() => {
    setDebVal(value);
  }, [value]);
  useEffect(() => {
    cb(val);
  }, [val, cb]);
}
