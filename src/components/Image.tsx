// import React from 'react'

type ImageProp = {
  path: string;
  height: string;
  width: string;
  borderRadius?: string;
};

export default function Image({
  path,
  height,
  width,
  borderRadius,
}: ImageProp) {
  return (
    <figure className={`${height} ${width} ${borderRadius}`}>
      <img
        src={path}
        alt=""
        className={`block max-w-full max-h-full h-full w-full ${borderRadius}`}
      />
    </figure>
  );
}
