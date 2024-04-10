"use server";

import {
  REGISTER_MUTATION,
  SEND_EMAIL_CONFIRMATION_MUTATION,
} from "@/graphql/mutations";
import { getClient } from "../client";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/consts";
import { redirect } from "next/navigation";

export async function registerUser(formdata: FormData) {
  //tipo formData?
  const formFields = {
    firstName: formdata.get("name"),
    lastName: formdata.get("lastName"),
    phone: formdata.get("phone"),
    email: formdata.get("email"),
    password: formdata.get("password"),
  };
  try {
    await getClient().mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        input: {
          ...formFields,
        },
      },
    });
    try {
      await getClient().mutate({
        mutation: SEND_EMAIL_CONFIRMATION_MUTATION,
        variables: {
          email: formFields.email,
        },
      });
      revalidatePath(`${routes.register}`); 
      //parametros?
      redirect(`${routes.verificationCode}?email=${formFields.email}`); //redirije a email page
    } catch (error : any) {
    
      revalidatePath(`${routes.register}`); 
      redirect(`${routes.register}?error=${encodeURIComponent(error.message)}`); //redirije al registro
    }
  } catch (error: any) {
    console.log(error)
    revalidatePath(`${routes.register}`); 
    redirect(`${routes.register}?error=${encodeURIComponent(error.message)}`); //redirije al registro
    
  }
}
