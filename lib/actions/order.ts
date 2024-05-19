'use server'
import * as z from "zod";
import { FetchResult } from "@apollo/client";
import { getClient } from "@/config/apollo";
import { routes } from "@/utils/consts";
import { revalidatePath } from "next/cache";
import { UPDATE_ORDER_MUTATION } from "@/graphql/mutations/order";

export async function updateOrder(prevState: any, formData: FormData) {
  const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    address: z.string(),
    email: z.string(),
  });

  const { address, firstName, lastName, phone, email } = Object.fromEntries(
    formData.entries()
  );

  const parse = formSchema.safeParse({
    email,
    firstName,
    lastName,
    phone,
    address,
  });

  if (!parse.success) {
    return {
      message: "Fallo en actualizar la orden",
    };
  }

  const { data } = parse;

  try {
    console.log(data);
    const response: FetchResult<any> = await getClient().mutate({
      mutation: UPDATE_ORDER_MUTATION,
      variables: {
        input: {
          ...data,
        },
      },
    });
  } catch (error: any) {
    return {
      message: error.message,
    };
  }

  revalidatePath(routes.dashboard);
}
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

