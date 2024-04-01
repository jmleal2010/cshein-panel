"use client";
import { Fragment, useState } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import {
  faCheckCircle,
  faCreditCard,
  faCrown,
  faEllipsisVertical,
  faFaceSmile,
  faFire,
  faHeart,
  faPaperclip,
  faPhone,
  faThumbsUp,
  faUser,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LOAD_ORDER_QUERY } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import moment from "moment";
import Datatable from "@/components/data/Datatable";
import { columnType } from "@/interfces";
import { classNames } from "@/app/utils/functions";
import Link from "next/link";
import {routes} from "@/config/consts";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      hours: "52.0",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: "12.0",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      hours: "4.0",
      rate: "$100.00",
      price: "$400.00",
    },
  ],
};
const activity = [
  { id: 1, type: "creada", date: "7d ago", dateTime: "2023-01-23T10:32" },
  { id: 2, type: "editada", date: "6d ago", dateTime: "2023-01-23T11:03" },
  { id: 3, type: "enviada", date: "6d ago", dateTime: "2023-01-23T11:24" },
  { id: 4, type: "pagada", date: "1d ago", dateTime: "2023-01-24T09:20" },
];

export default function OrderId({ params }: { params: { id: string } }) {
  const { data }: any = useSuspenseQuery(LOAD_ORDER_QUERY, {
    variables: {
      orderId: params.id,
    },
  });

  let order;
  let orderItems;
  if (data) {
    order = data.order;
    orderItems = order.orderItems.map((item: any) => {
      const { product, quantity } = item;
      return { ...product, quantity };
    });
  }

  const columns: columnType[] = [
    {
      name: "name",
      title: "Nombre",
    },
    {
      name: "image",
      title: "Imagen",
      type: "image",
    },
    {
      name: "link",
      title: "Enlace",
      type: "link",
    },
    {
      name: "price",
      title: "Precio",
    },
    {
      name: "discount",
      title: "Descuento",
    },
    {
      name: "size",
      title: "Tamaño",
    },
  ];

  return (
    <>
      <header className="relative isolate pt-16">
        <div
          className="absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
              style={{
                clipPath:
                  "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
              }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
            <div className="flex items-center gap-x-6">
              {/* <img
                                src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                                alt=""
                                className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                            />*/}
              <h1>
                <div className="text-sm leading-6 text-gray-500">
                  Orden <span className="text-gray-700">#{order.code}</span>
                </div>
                <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                  CubaShein, Inc
                </div>
              </h1>
            </div>
            <div className="flex items-center gap-x-4 sm:gap-x-6">
              <Link
                href={routes.orders}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Volver al listado
              </Link>

              <Menu as="div" className="relative sm:hidden">
                <Menu.Button className="-m-3 block p-3">
                  <span className="sr-only">More</span>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900"
                          )}
                        >
                          Copy URL
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Summary</h2>
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
              <dl className="flex flex-wrap">
                <div className="flex-auto pl-6 pt-6">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    Total
                  </dt>
                  <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                    ${order.total}
                  </dd>
                </div>
                <div className="flex-none self-end px-6 pt-4">
                  <dt className="sr-only">Status</dt>
                  <dd
                    className={classNames(
                      order.status !== "PAID"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-50 text-green-600",
                      "rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-green-600/20"
                    )}
                  >
                    {order.status}
                  </dd>
                </div>
                <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                  <dt className="flex-none">
                    <span className="sr-only">Client</span>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="h-6 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm font-medium leading-6 text-gray-900">
                    {order.beneficiary.fullName}
                  </dd>
                </div>
                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Due date</span>
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="h-6 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm leading-6 text-gray-500">
                    <time dateTime="2023-01-31">{order.beneficiary.phone}</time>
                  </dd>
                </div>
                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Status</span>
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="h-6 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm leading-6 text-gray-500">
                    Pago con MasterCard
                  </dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Descargar factura <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Invoice */}
          <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Orden
            </h2>
            <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
              <div className="sm:pr-4">
                <dt className="inline text-gray-500">Creado en</dt>{" "}
                <dd className="inline text-gray-700">
                  <time dateTime="2023-23-01">
                    {moment(order.createdAt).format("MMMM DD, YYYY")}
                  </time>
                </dd>
              </div>
              <div className="mt-2 sm:mt-0 sm:pl-4">
                <dt className="inline text-gray-500">Entregado en</dt>{" "}
                <dd className="inline text-gray-700">
                  <time dateTime="2023-23-01">
                    {moment(order.deliveryAt).format("MMMM DD, YYYY")}
                  </time>
                </dd>
              </div>
              <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                <dt className="font-semibold text-gray-900">Origen</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">Acme, Inc.</span>
                  <br />
                  7363 Cynthia Pass
                  <br />
                  Toronto, ON N3Y 4H8
                </dd>
              </div>
              <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                <dt className="font-semibold text-gray-900">Destino</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">Tuple, Inc</span>
                  <br />
                  886 Walter Street
                  <br />
                  New York, NY 12345
                </dd>
              </div>
            </dl>
            <Datatable columns={columns} data={orderItems} />
          </div>

          <div className="lg:col-start-3">
            {/* Activity feed */}
            <h2 className="text-sm font-semibold leading-6 text-gray-900">
              Actividad
            </h2>
            <ul role="list" className="mt-6 space-y-6">
              {activity.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id} className="relative flex gap-x-4">
                  <div
                    className={classNames(
                      activityItemIdx === activity.length - 1
                        ? "h-6"
                        : "-bottom-6",
                      "absolute left-0 top-0 flex w-6 justify-center"
                    )}
                  >
                    <div className="w-px bg-gray-200" />
                  </div>
                  <>
                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                      {activityItem.type === "pagada" ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                      )}
                    </div>
                    <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                      {activityItem.type} la orden.
                    </p>
                    <time
                      dateTime={activityItem.dateTime}
                      className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                    >
                      {activityItem.date}
                    </time>
                  </>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
