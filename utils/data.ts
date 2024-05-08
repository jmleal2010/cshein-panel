import { Navigation } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faHomeAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { routes } from "./consts";
import DeleteIcon from "@mui/icons-material/Delete";

export const navItems: Navigation[] = [
  {
    id: 1,
    title: "Inicio",
    icon: "mynaui:home",
    iconSize: "lg",
    nested: false,
    href: routes.dashboard,
    selected: false,
    slug: "dashboard",
  },
  {
    id: 2,
    title: "Ordenes",
    icon: "mynaui:clipboard",
    iconSize: "lg",
    isOpen: false,
    selected: false,
    children: [
      {
        id: 2.1,
        title: "Pendientes",
        isOpen: false,
        href: routes.orders.pending,
        selected: false,
        slug: "pending",
      },
      {
        id: 2.2,
        title: "Ordenes completadas",
        isOpen: false,
        href: routes.orders.completed,
        selected: false,
        slug: "completed",
      },
    ],
    nested: true,
    href: "",
  },

  {
    id: 3,
    title: "Usuarios",
    icon: "mynaui:users-group",
    iconSize: "lg",
    isOpen: false,
    selected: false,
    children: [
      {
        id: 3.1,
        title: "Drivers",
        isOpen: false,
        href: routes.users.drivers,
        selected: false,
        slug: "pending",
      },
      {
        id: 3.2,
        title: "Ordenes completadas",
        isOpen: false,
        href: routes.users.customers,
        selected: false,
        slug: "completed",
      },
    ],
    nested: true,
    href: "",
  },
  {
    id: 4,
    title: "Notificaciones",
    icon: "mynaui:bell",
    iconSize: "lg",
    nested: false,
    href: routes.notifications,
    selected: false,
    slug: "notifications",
  },
];
