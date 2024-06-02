import * as React from "react";
import {TimeProvider, LayoutDashboard} from "@/components/layout";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeProvider from "@/theme/theme";
import 'simplebar-react/dist/simplebar.min.css';
import { Toaster } from 'react-hot-toast';

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
          <Toaster position="top-right"/>
        </LayoutDashboard>
      </ThemeProvider>
    </TimeProvider>
  );
}
