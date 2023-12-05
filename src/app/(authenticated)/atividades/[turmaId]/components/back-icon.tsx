"use client";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "@nextui-org/link";
export default function BackIcon() {
  return (
    <Link
      href="/turmas"
      className="flex flex-row justify-start items-center gap-2 text-inherit hover:underline"
    >
      <FaArrowLeft className=" cursor-pointer" />
      <span className="cursor-pointer">Voltar</span>
    </Link>
  );
}
