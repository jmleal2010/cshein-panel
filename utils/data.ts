import { Navigation } from "@/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faHomeAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { routes } from "./consts";

export const navItems: Navigation[] = [
  {
    id: 1,
    title: "Inicio",
    icon: faHomeAlt,
    iconSize:'lg',
    nested: false,
    href: routes.dashboard,
    selected: false,
    slug: 'dashboard',
  },
  {
    id: 2,
    title: "Ordenes",
    icon: faClipboardList,
    iconSize: 'lg',
    isOpen: false,
    selected: false,
    children: [
      {
        id: 2.1,
        title: "Pendientes",
        isOpen: false,
        href: routes.orders.pending,
        selected: false,
        slug:"pending"
      },
      {
        id: 2.2,
        title: "Ordenes completadas",
        isOpen: false,
        href: routes.orders.completed,
        selected: false,
        slug: "completed"
      },
    ],
    nested: true,
    href: '',
  },

  {
    id: 3,
    title: "Usuarios",
    icon: faUsers,
    iconSize: 'lg',
    isOpen: false,
    selected: false,
    children: [
      {
        id: 3.1,
        title: "Pendientes",
        isOpen: false,
        href: routes.orders.pending,
        selected: false,
        slug:"pending"
      },
      {
        id: 3.2,
        title: "Ordenes completadas",
        isOpen: false,
        href: routes.orders.completed,
        selected: false,
        slug: "completed"
      },
    ],
    nested: true,
    href: '',
  },
];
