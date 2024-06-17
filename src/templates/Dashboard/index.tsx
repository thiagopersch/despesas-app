import { Box, List, ListItemText, ListSubheader } from '@mui/material';

export default function Dashboard() {
  return (
    <Box className="flex flex-col items-center content-center my-10 h-full w-screen">
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Lista de coisas para fazer
          </ListSubheader>
        }
      >
        <del>
          <ListItemText primary="1. Criar modal de deletar e fazer de forma global" />
          <ListItemText primary="2. Criar CRUD das categorias" />
          <ListItemText primary="3. Criar CRUD das prioridades" />
        </del>
        <ListItemText primary="4. Criar CRUD dos métodos de pagamentos." />
        <ListItemText primary="5. Criar CRUD dos status." />
        <ListItemText primary="6. Criar CRUD dos meses." />
        <ListItemText primary="7. Criar CRUD dos anos." />
        <ListItemText primary="8. Criar CRUD das despesas." />
        <ListItemText primary="8.1. Fazer de alguma forma os seguintes items abaixo:." />
        <ListItemText primary="8.1.1. Poder parcelar o valor. Ex: 6000 / 12 = 500 por mês" />
        <ListItemText primary="8.1.2. Poder repetir o valor pela quantidade de parcelas informada. Ex: 1091 * 72 = x valor" />
      </List>
    </Box>
  );
}
