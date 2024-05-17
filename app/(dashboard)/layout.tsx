import * as React from "react";
import TimeProvider from "@/components/layout/LocalizationProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeProvider from "@/theme/theme";
import 'simplebar-react/dist/simplebar.min.css';
import LayoutDashboard from "@/components/layout/layoutDashboard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <TimeProvider>
      <ThemeProvider>
        <LayoutDashboard>
          {children}
        </LayoutDashboard>
      </ThemeProvider>
    </TimeProvider>
  );
}
