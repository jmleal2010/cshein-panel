import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import TimeProvider from "@/components/common/layout/LocalizationProvider";
import Box from "@mui/material/Box";
import Sidebar from "@/components/navigation/Sidebar";
import BreadcrumbsNav from "@/components/navigation/Breadcrumbs";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function RootLayout({ children}: {children: React.ReactNode }) {
  return (
    <TimeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
              {/* <Header /> */}
              <Sidebar />
              <Box
                  component="main"
                  className="MainContent"
                  sx={{
                      px: { xs: 2, md: 4 },
                      pt: {
                          xs: 'calc(12px + var(--Header-height))',
                          sm: 'calc(12px + var(--Header-height))',
                          md: 3,
                      },
                      pb: { xs: 2, sm: 2, md: 3 },
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: 0,
                      height: '100dvh',
                      gap: 1,
                  }}
              >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BreadcrumbsNav />
                  </Box>
                 {children}
              </Box>
          </Box>
      </ThemeProvider>
    </TimeProvider>
  );
}
