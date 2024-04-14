"use server";
import { FetchResult } from "@apollo/client";
import { getClient } from "@/config/apollo";
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  RESET_PASSWORD_MUTATION,
  SEND_EMAIL_CONFIRMATION_MUTATION,
} from "@/graphql/mutations";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { routes } from "@/config/consts";
import { redirect } from "next/navigation";

//porque metes las constantes en las funciones?

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
  } catch (error: any) {
    errorMessage = error.message;

    revalidatePath(`/dashboard`); //porque revalidas dashboard? esto no es redirect()

    if (errorMessage) {
      return {
        message: errorMessage,
      };
    }

    return "";
  }
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

export async function restablishUserPassword(
  prevState: any,
  formData: FormData
) {
  const formSchema = z.object({
    email: z.string().email(),
  });

  let errorMessage = "";
  const { email } = Object.fromEntries(formData.entries());
  console.log(email)

  const parse = formSchema.safeParse({
    email
  });

  if (!parse.success) {
    return {
      message: "can't send the email",
    };
  }

  const {
    data
  } = parse;

  try {
    const response: FetchResult<any> = await getClient().mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: {
        input: {
          email: data.email,
        },
      },
    });
    redirect(`${routes.login}`)
    // const { token } = response.data.login;
  } catch (error: any) {
    return {
      message: error.message,
    };
  } finally{
    revalidatePath(`${routes.forgotPassword}`)
  }
}
