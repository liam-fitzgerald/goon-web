import { useState, useEffect } from "react";

const EMBEDLY_KEY = "cd719be509c873120c1580";

interface EmbedlyMeta {
  title: string;
  description: string;
  author_url: string;
  site: string;
}

interface EmbedlyLink {
  href: string;
}

interface EmbedlyResult {
  meta: EmbedlyMeta;
  links: {
    [name: string]: EmbedlyLink[];
  };
}

interface EmbedlyError {
  error: string;
}

type EmbedlyResponse = EmbedlyResult | EmbedlyError;

type EmbedState = "loading" | "error" | EmbedlyResult;

export default function useEmbedly(url: string) {
  const [state, setState] = useState("loading" as EmbedState);

  useEffect(() => {
    let abrt = new AbortController();
    (async () => {
      try {
        const res: EmbedlyResponse = await (
          await fetch(
            `https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(
              url
            )}&api_key=${EMBEDLY_KEY}&iframe=1&omit_script=1`,
            { signal: abrt.signal }
          )
        ).json();
        if ("meta" in res) {
          setState(res);
        } else if (res.error) {
          setState("error");
        }
      } catch (e) {
        setState("error");
      }
    })();

    return () => {
      setState("loading");
      abrt.abort();
    };
  }, [url]);

  return state;
}

export function getEmbedlyThumb(embed: EmbedlyResult) {
  return embed?.links?.["thumbnail"]?.[0]?.href;
}

export function getEmbedlyIcon(embed: EmbedlyResult) {
  return embed?.links?.["icon"]?.[0]?.href;
}
