"use server";
import { FetchResult } from "@apollo/client";
import { getClient } from "@/config/apollo";
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  SEND_EMAIL_CONFIRMATION_MUTATION,
} from "@/graphql/mutations";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { AUTH_TOKEN, routes } from "@/config/consts";
import { permanentRedirect, redirect } from "next/navigation";
import { cookies } from "next/headers";

const cookieStore = cookies();

export async function loginUser(prevState: any, formData: FormData) {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  let errorMessage = "";
  const { email, password } = Object.fromEntries(formData.entries());

  const parse = formSchema.safeParse({
    email,
    password,
  });

  if (!parse.success) {
    return {
      message: "Fallo en la autenticación",
    };
  }

  const { data } = parse;

  try {
    const response: FetchResult<any> = await getClient().mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          ...data,
        },
      },
    });

    const { token } = response.data.login;
    cookieStore.set(AUTH_TOKEN, token);
  } catch (error: any) {
    return {
      message: error.message,
    };
  }

  revalidatePath(routes.dashboard);
  permanentRedirect(routes.dashboard);
}

export async function registerUser(prevState: any, formData: FormData) {
  const formSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string(),
    termsAndConditions: z.coerce.boolean(),
  });
  let errorMessage = "";
  const form = Object.fromEntries(formData.entries());

  const data = formSchema.parse(form);

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
  revalidatePath(`${routes.register}`); //(limpia cache) hace que el cliente vuelva a hacer las peticiones de nuevo
  if (errorMessage) {
    return {
      //porque me obliga a llamarle errorMessage?
      message: errorMessage,
    };
  } else {
    redirect(`${routes.verificationCode}?code=${form.email}`);
  }
}
