import React, { useState } from "react";
import {
  MarkProps,
  ImageMark,
  isValidMarkProps,
  EditMarkProps,
} from "../../types";
import fallbackImage from "../../images/image-outline.svg";

interface ImageProps extends MarkProps<ImageMark> {
  image: ImageMark;
}

interface ImageInputProps extends EditMarkProps<ImageMark> {
  image: ImageMark;
}

function ImageInput(props: ImageInputProps) {
  const { image, edit } = props;
  const [url, setUrl] = useState(edit === "add" ? image.src : "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const src = url.length === 0 ? fallbackImage : url;
  return (
    <div className="w-[256px] h-[256px] relative">
      <img className="w-full h-full top-0 left-0 absolute" src={src} />
      <input
        placeholder="Enter URL..."
        className="border w-full z-10 relative"
        type="text"
        value={url}
        onChange={onChange}
      />
    </div>
  );
}

export default function Image(props: ImageProps) {
  const { image, ...rest } = props;

  const { src } = image;

  if (isValidMarkProps(rest)) {
    return <ImageInput image={image} {...rest} />;
  }

  return (
    <div>
      <img src={src} />
    </div>
  );
}
