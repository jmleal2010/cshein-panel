"use server"

import { getClient } from "@/config/apollo";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const updateStatus = async (params: any) => {
//   try {
//     return await getClient().mutate({
//       mutation: UPDATE_ORDER_STATUS_MUTATION,
//       variables: {
//         orderId: params.orderId,
//       },
//     });
//   } catch (err) {}
};

export async function changeStatus(status: string, pathname: string) {
    // console.log("Changing status to", status);
    //await setTimeout(() => { console.log("4 sec")}, 4000);
    revalidatePath(pathname);
    //redirect(pathname);
  
 // Navigate to the new post page
}

