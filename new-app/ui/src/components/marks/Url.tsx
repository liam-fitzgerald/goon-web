import React, { useState } from "react";
import _ from "lodash";
import useEmbedly, {
  getEmbedlyIcon,
  getEmbedlyThumb,
} from "../../hooks/useEmbedly";
import { isValidMarkProps, MarkProps, EditMarkProps } from "../../types";

interface UrlInputProps extends EditMarkProps<string> {
  url: string;
}

function UrlInput(props: UrlInputProps) {
  const { url, edit, ...rest } = props;
  const [input, setInput] = useState(edit === "edit" ? url : "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input
        placeholder="https://..."
        type="text"
        value={input}
        onChange={onChange}
      />
    </div>
  );
}

interface UrlProps extends MarkProps<string> {
  url: string;
}

export default function Url(props: UrlProps) {
  const { url, ...rest } = props;

  return isValidMarkProps(rest) ? (
    <UrlInput url={url} {...rest} />
  ) : (
    <UrlInner {...props} />
  );
}

function UrlInner(props: UrlProps) {
  const { url } = props;

  const embed = useEmbedly(url);

  return _.isString(embed) ? (
    <a target="_blank" href={url}>
      {url}
    </a>
  ) : (
    <div className="flex items-center border rounded-md gap-x-2">
      <div className="w-[96px] h-full min-h-[96px] shrink-0 border-r">
        <img
          className="w-full h-full object-contain"
          src={getEmbedlyThumb(embed)}
        />
      </div>
      <div className="flex flex-col p-2 space-y-2">
        <a target="_blank" href={url}>
          {embed.meta.title}
        </a>
        <div className="text-xs text-gray-500">{embed.meta.description}</div>
        <div className="flex space-x-3">
          <img className="rounded-sm" src={getEmbedlyIcon(embed)} />
          <div className="flex space-x-2">
            <div className="text-sm">{embed.meta.site}</div>
            <div className="text-gray-500 text-sm">{new URL(url).hostname}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
