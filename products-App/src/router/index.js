import { createRouter, createWebHistory } from "vue-router";
import CarritoDeCompras from "@/components/CarritoDeCompras.vue";
import ProductoCliente from "@/components/ProductoCliente.vue";
import ProductosAdmin from "@/views/ProductosAdmin.vue";
import HomeScreen from "@/views/HomeScreen.vue";
import InicioSesion from "@/views/InicioSesion.vue";
import RegistroUsuario from "@/views/RegistroUsuario.vue";
import ProveedorInfo from "@/views/ProveedorInfo.vue";
import MetodoPago from "@/components/MetodoPago.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeScreen",
      component: HomeScreen, // El componente que quieres mostrar
    },
    {
      path: "/inicio-sesion",
      name: "InicioSesion",
      component: InicioSesion, // El componente que quieres mostrar
    },
    {
      path: "/registro-usuario",
      name: "RegistroUsuario",
      component: RegistroUsuario, // El componente que quieres mostrar
    },
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
      path: "/proveedor-info",
      name: "ProveedorInfo",
      component: ProveedorInfo, // El componente que quieres mostrar
    },
    {
      path: "/metodo-pago",
      name: "MetodoPago",
      component: MetodoPago, // El componente que quieres mostrar
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/", // Redirecciona cualquier ruta no válida
    },
  ],
});

export default router;
