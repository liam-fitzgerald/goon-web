import React from "react";
import { MarkProps, Page } from "../types";
import Iota from "./marks/Iota";

interface Props extends MarkProps<any> {
  page: Page;
}
export function Mark(props: Props) {
  const { page, ...rest } = props;

  switch (page.mark) {
    case "iota":
      return <Iota iota={page.data} {...rest} />;
    default:
      return <p>Unsupported Mark</p>;
  }
}
