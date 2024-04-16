import Base from "@/templates/Base";
import { Box, TextField, Typography } from "@mui/material";

const CreateExpenses = () => {
  return (
    <Base>
      <Typography
        color="primary"
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5rem 0",
        }}
      >
        Nome da despesa aqui
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 30rem",
        }}
      >
        <TextField
          name="name"
          label="Nome da despesa"
          id="expense-name"
          type="text"
          variant="filled"
          fullWidth
          required
        />
      </Box>
    </Base>
  );
};
export default CreateExpenses;
