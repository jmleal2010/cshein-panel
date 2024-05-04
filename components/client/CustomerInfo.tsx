import { BeneficiaryType } from "@/interfaces";
import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";

const CustomerInfo = ({ data, title }: { title: string, data: BeneficiaryType }) => {
    console.log(data);
    return (
        <Paper sx={{ ml: 2, p: 2 }} elevation={0} style={{
            backgroundColor: "#fcfbfd",
        }}>
      <Typography variant="h6" component="p" marginBottom={1} color="#6b7280">
        {title}
      </Typography>
      <Box display="flex" gap={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Avatar src="/broken-image.jpg" />
        </Box>
        <Box width={'100%'}>
          {Object.keys(data).map((key, index: number) => {
            return index === 0 || key === "id" ? null : (
                <Grid container key={index} alignItems="center">
                    
                    <Grid item xs={9}>
                        <Typography variant="caption" fontWeight="bold" color="#6b7280">
                            {data[key as keyof BeneficiaryType]}
                        </Typography>
                    </Grid>
                </Grid>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomerInfo;
