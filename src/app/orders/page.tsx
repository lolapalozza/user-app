'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {showBackButton} from "@/shared/NavigationBack";

export default function Orders() {

  const router = useRouter()

  useEffect(() => {
    showBackButton(() => {
      router.push("/")
    })
  }, [router]);

  return (
    <></>
  );
}
