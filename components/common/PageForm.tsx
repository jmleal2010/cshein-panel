"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { FormPageData } from "@/interfaces/index";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IosSwitch } from "@/components/common/IosSwitch";
import { Alert, AlertTitle, Autocomplete, TextField } from "@mui/material";
import {toast} from "react-hot-toast";

type Props = {
  formPageData: FormPageData;
};

export function PageForm({ formPageData }: Props) {

  async function clientAction(formData: FormData) {
    // setAlertMessage(null);
    const response: any = await formPageData.action(formData);
    if (response.errorMessage) {
      toast.error(response.errorMessage);
     // setAlertMessage({severity: "Error", message: response.errorMessage});
    } else {
      toast.success(response.successMessage);
      //setAlertMessage({severity: "Éxito", message: response.successMessage});
    }
  }

  return (
    <form action={clientAction}>
     
      <Card className="cshein-card">
        <CardContent sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {formPageData.inputs.map((field: any, index: number) => {
              return (
                <Grid md={6} xs={12} key={index}>
                  {field.type == "select" ? (
                    <FormControl fullWidth required={field.required}>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        defaultValue={field.defaultValue}
                        label={field.label}
                        name={field.name}
                        variant="outlined"
                      >
                        {field.options.map((option: any, index: number) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : field.type == "switch" ? (
                    <FormControlLabel
                      control={
                        <IosSwitch
                          defaultChecked={field.defaultValue}
                        ></IosSwitch>
                        // <IOSSwitch
                        //   sx={{ m: 1 }}
                        //   defaultChecked={user.emailNotifications}
                        // />
                      }
                      label={field.label}
                    />
                  ) : field.type == "autocomplete" ? (
                    <Autocomplete
                      disablePortal
                      defaultValue={field.defaultValue}
                      id="combo-box-demo"
                      options={field.options}
                      //ListboxProps={{ sx: { top: -5 } }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={field.label}
                          name={field.name}
                        />
                      )}
                    />
                  ) : (
                    <FormControl fullWidth required={field.required}>
                      <InputLabel>{field.label}</InputLabel>
                      <OutlinedInput
                        defaultValue={field.defaultValue}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                      />
                    </FormControl>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Actualizar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
