"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

import { useResponsive } from "@/hooks/use-responsive";

import { account } from "@/_mock/account";

import Logo from "@/components/common/logo";
import Scrollbar from "@/components/common/scrollbar/scrollbar";
import { NAV } from "@/utils/consts";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Iconify from "../common/iconify";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemText } from "@mui/material";
import { navItems } from "@/utils/data";
import { Navigation } from "@/interfaces";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }: any) {
  
  /* Hooks */
  const pathname = usePathname();
  const upLg = useResponsive("up", "lg", 'xl');
  
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navItems.map((item: Navigation) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
     {/*  <Logo sx={{ mt: 3, ml: 4 }} /> */}

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      className="sidebar"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }: {item: Navigation}) {
  /* State */
  const [navigation, setNavigation] = React.useState<Navigation[]>(navItems);

  /* Hooks */
  const upLg = useResponsive("up", "lg", 'xl');
  const pathname = usePathname();
  
  const pathSplit = pathname.split("/");
  const path = pathSplit[pathSplit.length - 1];
  const active = item.selected || item.slug?.includes(path);

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
      <ListItemButton
        href={item.nested ? "#" : item.href}
        component={Link}
        onClick={(e) => handleListItemClick(item)}
        selected={active}
        dense
        sx={{
          minHeight: 44,
          borderRadius: '12px',
          typography: "body2",
          color: "text.secondary",
          textTransform: "capitalize",
          fontWeight: "fontWeightMedium",
          mt: 1,
          ...(active && {
            color: "primary.main",
            fontWeight: "fontWeightSemiBold",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
          "& .MuiListItemIcon-root": {
            minWidth: 0,
            color: active ? "white" : "",
          },
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          <Iconify
            icon={item.icon}
            color={active ? "white" : ""}
            width={24}
            height={24}
          />
        </Box>

        <Box component="span">{item.title} </Box>
        {item.nested && (item.isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {item.nested && (
        <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
          <List component="ul" disablePadding>
            {item.children?.map((child: Navigation, i: number) => (
              <ListItemButton
                component={Link}
                key={i}
                href={child.href}
                onClick={(e) => handleListItemClick(child)}
                selected={child.selected && child.slug?.includes(path)}
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
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
