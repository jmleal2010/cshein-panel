"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useResponsive } from "@/hooks/use-responsive";
import { bgBlur } from "@/theme/css";
import {Searchbar, AccountPopover, LanguagePopover, Iconify} from "@/components/common";
import NotificationsPopover from "@/components/common/notifications-popover";
import { HEADER, NAV } from "@/utils/consts";
import { useEffect, useRef } from "react";
// ----------------------------------------------------------------------

type HeaderProps = {
  onOpenNav: () => void;
};

export function Header({ onOpenNav }: HeaderProps) {
  const theme = useTheme();
  const navRef: any = useRef<HTMLElement | null>(null);
  const lgUp = useResponsive("up", "lg", "xl");

  useEffect(() => {
    navRef.current.classList.remove("MuiPaper-root");
  }, []);
  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      ref={navRef}
      component="nav"
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        component={Box}
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}