import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

import { MdCalendarMonth } from "react-icons/md";

import { AiOutlineLineChart } from "react-icons/ai";

import { IoIosStats } from "react-icons/io";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "sistema",
    label: "Estatus de Sistema",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "mensual",
    label: "Estatus Mensual",
    path: "/mensual",
    icon: <MdCalendarMonth />,
  },
  {
    key: "analysis",
    label: "Análisis de Operación",
    path: "/analysis",
    // pon el icono color blanco
    icon: <IoIosStats />,
  },
  {
    key: "operation",
    label: "Estatus de Operación",
    path: "/operation",
    icon: <AiOutlineLineChart />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
