import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { GoonAct } from "../types";
import { goonAct } from "../state/goon";

interface SizedCopyProps {
  lede?: string;
  info?: string;
  act?: GoonAct[];
  value?: React.ReactNode;
  path: string;
  children?: React.ReactNode;
}

function Lede(props: { lede: string }) {
  const { lede } = props;

  return <p className="text-lg">{lede}</p>;
}

function Info(props: { info: string }) {
  const { info } = props;

  return <p className="text-sm font-gray-400">{info}</p>;
}

function SmallCopy(props: SizedCopyProps) {
  const { lede, info, children, value } = props;
  return (
    <div className="flex space-between w-full">
      <div className="flex-col">
        {lede ? <Lede lede={lede} /> : null}
        {info ? <Info info={info} /> : null}
      </div>
      <div>
        {value}
        {children}
      </div>
    </div>
  );
}

function MediumCopy(props: SizedCopyProps) {
  const { lede, info, children, path, value, act = [] } = props;
  return (
    <div className="flex-col p-4 border rounded-md border-gray-400 relative">
      <div className="flex">
        <div className="flex-col">
          {lede ? <Lede lede={lede} /> : null}
          {info ? <Info info={info} /> : null}
        </div>
      </div>
      <div>{value}</div>
      {act.length > 0 ? <Actions path={path} act={act} /> : null}
      <div>{children}</div>
    </div>
  );
}

interface ActionsProps {
  act: GoonAct[];
}

function Action(props: { act: GoonAct; path: string }) {
  const { act, path } = props;
  const onClick = () => {
    goonAct(path, act.term);
  };
  console.log(act);

  return (
    <button className="" onClick={onClick} type="button">
      {act.lede}
    </button>
  );
}

function Actions(props: ActionsProps) {
  const { act, path } = props;

  return (
    <Popover.Root>
      <Popover.Trigger className="absolute top-4 right-4">
        Actions
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-white border boder-gray-600"
          sideOffset={5}
        >
          <div className="flex-col">
            {act.map((a) => (
              <Action act={a} path={path} />
            ))}
          </div>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function LargeCopy(props: SizedCopyProps) {
  const { lede, info, children, value } = props;
  return (
    <div className="flex-col">
      <div className="flex">
        <div className="flex-col">
          {lede ? <Lede lede={lede} /> : null}
          {info ? <Info info={info} /> : null}
        </div>
        <div>{value}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

interface CopyProps extends SizedCopyProps {
  size: "sm" | "md" | "lg";
}

export default function Copy(props: CopyProps) {
  const { size, ...rest } = props;
  switch (size) {
    case "sm":
      return <SmallCopy {...rest} />;
    case "md":
      return <MediumCopy {...rest} />;
    case "lg":
      return <LargeCopy {...rest} />;
    default:
      return null;
  }
}
