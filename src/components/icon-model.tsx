import Image, { StaticImageData } from "next/image";

export const IconModel = ({
  image,
  height,
  width,
}: {
  image: StaticImageData | string;
  height: number;
  width: number;
}) => {
  return <Image src={image} alt="icon" height={height} width={width} />;
};
