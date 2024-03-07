"use client";

import { ReactNode } from "react";

import { usePathname, useRouter } from "next/navigation";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import BusinessIcon from "@mui/icons-material/Business";
import Tooltip from "@mui/material/Tooltip";

import { AuthService } from "@services";
import { notify } from "@utils";
import { useCurrentUserStore } from "@store";

function CreateLink({
  url,
  title,
  icon,
}: {
  url: string;
  title: string;
  icon: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tooltip title={title} placement="right">
      <ListItemButton
        onClick={() => router.push(url)}
        selected={pathname.startsWith(url)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </Tooltip>
  );
}

export const MainListItems = () => {
  return (
    <>
      <CreateLink url="/dashboard" title="Dashboard" icon={<DashboardIcon />} />

      <CreateLink url="/projects" title="Proyectos" icon={<BusinessIcon />} />

      <CreateLink
        url="/clients"
        title="Clientes"
        icon={<SupervisedUserCircleIcon />}
      />
    </>
  );
};

export const SecondaryListItems = () => {
  const router = useRouter();
  const { cleanSession } = useCurrentUserStore();

  return (
    <>
      <ListSubheader component="div" inset>
        Reportes
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="BI" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          AuthService.logout().then(({ message }) => {
            cleanSession();
            notify(message, true);
            router.push("/");
          });
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </>
  );
};
