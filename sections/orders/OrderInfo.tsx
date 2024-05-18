"use client";
import { BeneficiaryType } from "@/interfaces";
import { updateOrder } from "@/lib/actions/order";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormState } from "react-dom";

export const OrderInfo = ({
  data,
  title,
  avatar,
}: {
  title: string;
  data: BeneficiaryType;
  avatar?: boolean;
}) => {
  /* States */
  const [editing, setEditing] = React.useState<boolean>(false);
  const [state, formAction] = useFormState(updateOrder, {message: ''});
  
  /* Functions */
  const getRealLabel = (key: string) => {
    switch (key) {
      case "id":
        return "ID";
      case "name":
        return "Nombre";
      case "email":
        return "Correo";
      case "phone":
        return "Teléfono";
      case "address":
        return "Dirección";
      case "city":
        return "Ciudad";
      case "state":
        return "Estado";
      case "zip":
        return "Código Postal";
      case "country":
        return "País";
      case "firstName":
        return "Nombre";
      case "lastName":
        return "Apellidos";
      default:
        return key;
    }
  };

  console.log(data);
  return !editing ? (
    <Box
      sx={{ ml: 2, p: 2 }}
      style={{
        backgroundColor: "#fcfbfd",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="p" marginBottom={1} color="#6b7280">
          {title}
        </Typography>
        <IconButton
          size="small"
          color="primary"
          aria-label="edit"
          style={{ padding: 0 }}
          onClick={() => setEditing(true)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </IconButton>
      </Box>
      <Box display="flex" gap={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {avatar && <Avatar src="/broken-image.jpg" />}
        </Box>
        <Box width={"100%"}>
          {Object.keys(data).map((key, index: number) => {
            return index === 0 || key === "id" ? null : (
              <Grid container key={index} alignItems="center" xs={9}>
                {/*   <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="#6b7280"
                  >
                  {key}
                </Typography> */}
                <Typography variant="caption" fontWeight="bold" color="#6b7280">
                  {data[key as keyof BeneficiaryType]}
                </Typography>
              </Grid>
            );
          })}
        </Box>
      </Box>
    </Box>
  ) : (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      sx={{p: 2 }}
      style={{
        backgroundColor: "#fcfbfd",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignSelf="flex-start">
        <Typography variant="h6" component="p" marginBottom={1} color="#6b7280" alignSelf="self-start">
          {title}
        </Typography>
      </Box>
        <Box width={"100%"} component="form" alignSelf="flex-start" noValidate sx={{ mt: 1 }} action={formAction}>
          {Object.keys(data).map((key, index: number) => {
            return index === 0 ? null : (
              <Box key={index}>
                {key !== "id" && key !== "isDefault" && (
                  <FormControl
                    sx={{ m: 1 }}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <InputLabel htmlFor="outlined-adornment-search">
                      {getRealLabel(key)}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-search"
                      type="text"
                      //value={query}
                      defaultValue={data[key as keyof BeneficiaryType]}
                      placeholder="Buscar ordenes..."
                      onChange={(e) =>
                        (data[key as keyof BeneficiaryType] = e.target.value)
                      } //(e) => setQuery(e.target.value)
                      label={key}
                    />
                  </FormControl>
                )}
              </Box>
            );
          })}

           {state && state.message && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {state.message}
            </Alert>
          )}
          <Box sx={{ml:1.5, mr:-1}} component="div" display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" size="medium" color="primary">
              Guardar
            </Button>

            <Button variant="contained" size="medium" color="inherit" onClick={()=>setEditing(false)}>
              Cancelar
            </Button>
          </Box>
        </Box>
    </Box>
  );
};
