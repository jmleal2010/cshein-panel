"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect } from "react";
import Error403 from "@/public/assets/svg/error403.svg";
import Error404 from "@/public/assets/svg/error404.svg";
import Error500 from "@/public/assets/svg/error500.svg";


export default function ErrorComponent({ error, onPress }: { error: string, onPress:(error: string)=>void }) {
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    let img, title, description;

    switch (error) {
      case "404":
        img = Error404;
        title = "Lo sentimos, página no encontrada";
        description =
          "Lo sentimos, no pudimos encontrar la página que estás buscando. ¿Quizás has escrito mal la URL? Asegúrese de revisar su ortografía.";
        break;
      case "500":
        img = Error500;
        title = "Error interno";
        description =
          "Lo sentimos, algo salió mal. Nuestro equipo técnico ha sido notificado y estamos trabajando para solucionar el problema.";
        break;
      default:
        img = Error403;
        title = "Acceso denegado";
        description =
          "Lo sentimos, no tienes permiso para acceder a esta página. Por favor, póngase en contacto con el administrador del sistema si cree que esto es un error.";
    }

    return { img, title, description };
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            py: 6,
            maxWidth: 480,
            mx: "auto",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 1 }}>
            {getInfo().title}
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            {getInfo().description}
          </Typography>

          <Box
            component="div"
            sx={{
              mx: 'auto',
              width: '100%',
              my: { xs: 5, sm: 10 },
            }}
          >
            {error === "404"  ? <Error404 /> : error === "500" ? <Error500 /> : <Error403 />}
          </Box>
          

          <Button
            onClick={()=>onPress(error)}
            size="large"
            variant="outlined"
          >
            Ir a inicio
          </Button>
        </Box>
      </Container>
    </>
  );
}
