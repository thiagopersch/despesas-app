type SidebarRoute = {
  name: string;
  path: string;
};

const dropdown: SidebarRoute[] = [
  {
    name: "Despesas",
    path: "/expenses",
  },
  {
    name: "Users",
    path: "/users",
  },
  {
    name: "Categorias",
    path: "/category",
  },
  {
    name: "Prioridade",
    path: "/priority",
  },
  {
    name: "Métodos de pagamentos",
    path: "/paymentMethods",
  },
  {
    name: "Status",
    path: "/status",
  },
  {
    name: "Meses",
    path: "/month",
  },
  {
    name: "Anos",
    path: "/years",
  },
];

const menu = [
  {
    name: "Dashboard",
    path: "/dasboard",
  },
];

export { dropdown, menu };