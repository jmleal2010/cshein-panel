"use client";
import Link from "next/link";
import {useMutation} from "@apollo/client";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {LOGIN_MUTATION} from "@/graphql/mutations";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faKeyboard, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useAuthContext} from "@/app/contexts/authContext";
import {routes} from "@/config/consts";

export default function Login() {
    const router = useRouter();
    const {login} = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, {loading, error}] = useMutation(LOGIN_MUTATION, {
        variables: {
            input: {
                email,
                password,
            },
        },
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const {data} = await loginUser();
            const {token} = data.login;
            login(token)
            router.push(routes.dashboard);
        } catch (err) {

        }
    };

    return (
        <section className="h-screen">
            <div className="container h-full py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between  space-y-6">
                    {/* <!-- Left column container with background--> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>

                    {/* <!-- Right column container with form --> */}
                    <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8 md:w-8/12 lg:ml-6 lg:w-5/12 bg-white px-6 py-4 shadow sm:rounded-lg sm:px-12 h-42">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                            <h2 className="mt-6 text-center text-4xl font-medium leading-9 tracking-tight text-gray-900">
                                Accede a tu cuenta
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                            {error && (
                                <div className="rounded-md bg-red-50 border border-red-500 my-4 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <FontAwesomeIcon icon={faTimesCircle} className="h-5 w-5 text-red-400"
                                                             aria-hidden="true"/>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800"> Hay errores en el
                                                formulario</h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <ul role="list" className="list-disc space-y-1 pl-5">
                                                    <li>{error.message === 'UserNotFound' ? 'Usuario no encontrado' : ''}</li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            <div className="px-6 py-12 sm:rounded-lg sm:px-12">
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Correo electrónico
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Contraseña
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-3 block text-sm leading-6 text-gray-900"
                                            >
                                                Recuerdame
                                            </label>
                                        </div>

                                        <div className="text-sm leading-6">
                                            <Link
                                                href={routes.forgotPassword}
                                                className="font-semibold text-blue-600 hover:text-blue-500"
                                            >
                                                Olvidaste la contraseña
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Acceder
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                No te has registrado?{" "}
                                <Link
                                    href={routes.register}
                                    className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
                                >
                                    Crea tu cuenta aquí
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
