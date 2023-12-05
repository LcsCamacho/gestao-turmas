"use client";
import HearthSvg from "/public/svgs/heart.svg";
import HearthFillSvg from "/public/svgs/heartFill.svg";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

export const HeartBtn = ({
  onClick,
  className,
  width,
  height,
  liked,
}: {
  onClick?: () => void;
  className?: string;
  width?: number;
  height?: number;
  liked?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(!!liked);
  return (
    <Button
      className={`bg-white min-w-[40px] button-heart p-0 hearth-button ${className} light:border-purple-500`}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (liked) return;
        setIsLiked(!liked);
      }}
      onMouseLeave={(e) => {
        if (liked) return;
        setIsLiked((st) => !st);
      }}
    >
      <Image
        width={width || 20}
        height={height || 20}
        src={isLiked ? HearthFillSvg : HearthSvg}
        alt="icone de coraçao"
      />
    </Button>
  );
};
