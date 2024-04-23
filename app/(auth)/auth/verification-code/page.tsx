"use client";
import { useMutation } from "@apollo/client";
import { VERIFICATION_CODE_MUTATION } from "@/graphql/mutations";
import { NextRequest, NextResponse } from "next/server";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { routes } from "@/config/consts";
import { useRouter } from "next/navigation";

export default function VerificationCode() {
  const { login } = useAuthContext();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verifyUser, { loading, error: error }] = useMutation(
    VERIFICATION_CODE_MUTATION,
    {
      variables: {
        code: code,
        email: "rafa@gmail.com",
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await verifyUser();
      const { token } = data.verifyEmailConfirmationCode;

      if (data) {
        login(token);
        router.push(`${routes.dashboard}`);
      }
    } catch (err) {}
  };

  const [email, setEmail] = useState("");

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Verificación email</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                Hemos enviado un correo con el codigo para finalizar el registro{" "}
              </p>
            </div>
          </div>

          <div>
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between w-full">
                  <input
                    value={code}
                    className="w-full h-full items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="password"
                    name=""
                    id=""
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 hover:bg-blue-800 border-none text-white text-sm shadow-sm">
                      Verificar
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>No has recibido el código?</p>{" "}
                    <span
                      className="flex flex-row items-center text-blue-600 hover:text-blue-800"
                      rel="noopener noreferrer"
                    >
                      Reenviar
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
