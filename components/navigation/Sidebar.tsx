"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {
  listItemButtonClasses,
} from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { closeSidebar } from "@/utils";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigation } from "@/interfaces";
import { navItems } from "@/utils/data";
import { usePathname } from "next/navigation";
import Iconify from "../common/iconify";
import { Typography } from "@mui/material";

export default function Sidebar() {

  /* State */
  const [navigation, setNavigation] = React.useState<Navigation[]>(navItems);

  /* Hooks */
  const pathname = usePathname();
  
  const pathSplit = pathname.split("/");
  const path = pathSplit[pathSplit.length - 1];

  /* Functions */
  const handleListItemClick = (item: Navigation) => {
    if (!item.nested) {
      item.selected = !item.nested;
      unselectedItems(item);
    } else {
      handleClick(item);
    }

    setNavigation([...navigation]);
  };

  const unselectedItems = (item: Navigation) => {
    navigation.forEach((nav: Navigation) => {
      if (nav.id !== item.id) {
        if (nav.children) {
          nav.children.forEach((child: Navigation) => {
            child.selected = child.id === item.id;
          });
        } else {
          nav.selected = false;
        }
      }
    });
  };

  const handleClick = (item: Navigation) => {
    item.isOpen = !item.isOpen;
  };

  return (
    <>
    {/* // <Box
    //   className="Sidebar"
    //   sx={{
        
    //     transform: {
    //       xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
    //       md: "none",
    //     },
    //     transition: "transform 0.4s, width 0.4s",
    //     zIndex: 10000,
        
    //     width: 300,
    //     top: 0,
    //     p: 2,
    //     flexShrink: 0,
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: 2,
    //     borderRight: "1px solid",
    //     borderColor: "divider",
    //   }}
    // > */}
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      {/* <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      > */}
        <List
          className="Sidebar-list"
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{
              backgroundColor: "#fcfbfd",
            }}>
              Cuba Joy
            </ListSubheader>
          }
        >
          {navigation.map((item: Navigation, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                href={item.nested ? "#" : item.href}
                LinkComponent={Link}
                onClick={(e) => handleListItemClick(item)}
                selected={item.selected || item.slug?.includes(path)}
                dense
                sx={{
                  gap: 1,
                  mt: 1,
                  "& .MuiListItemIcon-root": {
                    minWidth: 0,
                    color: item.selected || item.slug?.includes(path)? "white" : "",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                 <Iconify icon={item.icon} color={item.selected || item.slug?.includes(path)? "white" : ""} width={24} height={24} />
                </ListItemIcon>

                <ListItemText primary={item.title} />
                {item.nested && (item.isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {item.nested && (
                <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
                  <List component="ul" disablePadding>
                    {item.children?.map((child, i) => (
                      <ListItemButton
                        component={Link}
                        key={i}
                        href={child.href}
                        onClick={(e) => handleListItemClick(child)}
                        selected={child.selected  && child.slug?.includes(path)}
                        dense
                        sx={{
                          pl: 4,
                          pt: 0.5,
                          pb: 0.5,
                          mr: 2,
                          mb: 0.5,
                          mt: 0.5,
                        }}
                      >
                        {/* <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon> */}
                        <ListItemText primary={child.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        <Typography variant="caption" sx={{ mt: "auto" }}>
          © 2021 Cuba Joy. All rights reserved.
          </Typography>

        <List
          component="ul"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": "4px",
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      {/* </Box> */}
      <Divider />
      {/*  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="rounded"
          component="image"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="caption">Siriwat K.</Typography>
          <Typography variant="caption">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="small" color="default">
          <LogoutRoundedIcon />
        </IconButton>
      </Box> */}
      {/* </Box> */}
    </>
  );
}
