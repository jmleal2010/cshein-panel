"use server";

import {
  REGISTER_MUTATION,
  SEND_EMAIL_CONFIRMATION_MUTATION,
} from "@/graphql/mutations";
import { getClient } from "../client";
import { revalidatePath } from "next/cache";
import { AUTH_TOKEN, routes } from "@/config/consts";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; 
import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
  termsAndConditions: z.coerce.boolean(), //si el checkbox no es marcado, no se envia
  //por el formulario, con esto se pone a false cuando suceda
});

export async function registerUser(prevState: any, formdata: FormData) {
  cookies().set(AUTH_TOKEN,'its me');
  let errorMessage = ""; //usaremos esta variable para hacer return de mensajes de error
  const form = Object.fromEntries(formdata.entries());

  const data = formSchema.parse(form); //si el form no tiene la misma estructura que el schema data = null

  try {
    await getClient().mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        input: {
          //terminos y condiciones hay que enviarlo?
          ...data,
        },
      },
    });

    await getClient().mutate({
      mutation: SEND_EMAIL_CONFIRMATION_MUTATION,
      variables: {
        email: data.email,
      },
    });
  } catch (error: any) {
    errorMessage = error.message;
  }
  revalidatePath(`${routes.register}`);//(limpia cache) hace que el cliente vuelva a hacer las peticiones de nuevo
  if (errorMessage) {
    return {
      //porque me obliga a llamarle errorMessage?
      message: errorMessage,
    };
  } else {
    redirect(`${routes.verificationCode}?code=${form.email}`)
  }
}
