"use client";
import Image from "next/image";
import { Button } from "../ui/button";

type ErrorStateProps = {
  onRetry: () => void;
};

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center mx-auto leading-snug">
      <Image
        src="/images/icon-error.svg"
        alt="error"
        width={25}
        height={25}
        className="text-4xl mb-6"
      />
      <h2 className="text-5xl w-[600px]  font-bold mb-2">
        Something went wrong
      </h2>
      <p className=" mt-4 w-[450px] text-muted">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <Button
        onClick={onRetry}
        variant={"secondary"}
        className="flex items-center px-4 py-2 mt-4 cursor-pointer"
      >
        <Image
          src="/images/icon-retry.svg"
          alt="retry"
          width={20}
          height={20}
          className="mr-2 "
        />
        Retry
      </Button>
    </div>
  );
}
