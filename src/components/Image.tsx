// import React from 'react'

type ImageProp = {
  path: string;
  height: string;
  width: string;
};

export default function Image({ path, height, width }: ImageProp) {
  return (
    <figure className={`${height} ${width}`}>
      <img
        src={path}
        alt=""
        className="block max-w-full max-h-full h-full w-full"
      />
    </figure>
  );
}
