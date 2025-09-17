import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={200}
        height={100}
        className="w-36 sm:w-48 max-[368px]:w-28 h-auto"
      />
    </div>
  );
}
