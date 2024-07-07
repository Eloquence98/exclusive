import Image from "next/image";

function ImageCssBg({ src, alt, className }) {
  return (
    <Image
      src={src}
      fill
      placehoder="blur"
      quality={80}
      className={`${className} object-cover`}
      alt={alt}
    />
  );
}

export default ImageCssBg;
