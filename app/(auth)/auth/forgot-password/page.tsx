"use client";
import Link from "next/link";
import {useMutation} from "@apollo/client";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {RESET_PASSWORD_MUTATION} from "@/graphql/mutations";
import {routes} from "@/config/consts";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [resetPassword, {loading, error}] = useMutation(RESET_PASSWORD_MUTATION, {
    variables: {
      input: {
        email,
      },
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {data} = await resetPassword();
      const {success} = data.resetPassword;

      if(success) router.push(routes.verificationCode)
    } catch (err) {

    }
  };

  return (
      <div className="my-auto max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Restablecer contraseña</h1>
        <p className="text-slate-500">Rellena el formulario para reestablecer la contraseña</p>

        <form action="" className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Correo electrónico</p>
              <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Introduzca correo electrónico"
              />
            </label>

            <button
                className="w-full py-3 font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg border-blue-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Restablecer</span>
            </button>
            <p className="text-center">
              No registrado todavía{" "}
              <Link
                  href={routes.register}
                  className="text-blue-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Registrate ahora </span>
                <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
  );
}
