'use client'
import {ErrorComponent} from "@/components/common";
import { routes } from "@/utils/consts";
import Link from "next/link";
import { redirect } from "next/navigation";


export default function NotFound() {
  /* State */

  /* Hooks */
 

  /* Functions */
   const onPressButton = (e: string) => {
   redirect(routes.dashboard);
  };
  return (
    <div>
        <title> Error </title>
        <ErrorComponent error="404" onPress={(e)=>onPressButton(e)} />
     
    </div>
  );
}
