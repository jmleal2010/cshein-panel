"use client";
import ErrorComponent from "@/components/common/error";
import { routes } from "@/utils/consts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  /* State */

  /* Hooks */
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  /* Functions */
  const onPressButton = (e: string) => {
    if (e === "500") reset();
    else {
      router.push(routes.dashboard);
    }
  };

  return (
    <>
      <title> Error </title>

      <ErrorComponent error="500" onPress={(e) => onPressButton(e)} />
    </>
  );
}