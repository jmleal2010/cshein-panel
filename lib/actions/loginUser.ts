"use server";

import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  SEND_EMAIL_CONFIRMATION_MUTATION,
} from "@/graphql/mutations";
import { getClient } from "@/config/apollo";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/consts";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  //tipo formData?
  const formFields = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    await getClient().mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          ...formFields,
        },
      },
    });
  } catch (error: any) {
    revalidatePath(`${routes.register}`);
    redirect(`/dashboard`); //redirije al registro

  }
}
