import { Navigation } from "@/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faHomeAlt, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
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
        id: 2.01,
        title: "Pendientes",
        isOpen: false,
        href: routes.orders.pending,
        selected: false,
      },
      {
        id: 2.2,
        title: "Ordenes completadas",
        isOpen: false,
        href: routes.orders.completed,
        selected: false,
      },
    ],
    nested: true,
    href: '',
  },
  {
    id: 3,
    title: "Usuarios",
    icon: faUsers,
    iconSize:'lg',
    nested: false,
    href: routes.users,
    selected: false,
  },
];
