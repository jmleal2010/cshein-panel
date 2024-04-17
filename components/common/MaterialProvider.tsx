import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID,
} from "@mui/material/styles";

const materialTheme = extendMaterialTheme();

export default function MaterialProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: any;
}) {
  return (
    <MaterialCssVarsProvider theme={theme}>{children}</MaterialCssVarsProvider>
  );
}
