import { createRouter, createWebHistory } from "vue-router";
import CarritoDeCompras from "@/components/CarritoDeCompras.vue";
import ProductoCliente from "@/components/ProductoCliente.vue";
import ProductosAdmin from "@/views/ProductosAdmin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/carrito-compras",
      name: "CarritoDeCompras",
      component: CarritoDeCompras, // El componente que quieres mostrar
    },
    {
      path: "/producto-cliente",
      name: "ProductoCliente",
      component: ProductoCliente, // El componente que quieres mostrar
    },
    {
      path: "/productos-admin",
      name: "ProductosAdmin",
      component: ProductosAdmin, // El componente que quieres mostrar
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/carrito-compras", // Redirecciona cualquier ruta no válida
    },
  ],
});

export default router;
