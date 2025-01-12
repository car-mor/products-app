<template>
    <div class="proveedores-container">
      <h1>Proveedores Disponibles</h1>
  
      <!-- Tabla de Proveedores -->
      <table class="table">
        <thead>
          <tr>
            <th style="color: blue;">Nombre</th>
<th style="color: blue;">Teléfono</th>
<th style="color: blue;">URL</th>
<th style="color: blue;">Estado</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="proveedor in proveedores" :key="proveedor.id">
            <td>{{ proveedor.nombre }}</td>
            <td>{{ proveedor.telefono }}</td>
            <td>
              <a :href="proveedor.url" target="_blank">{{ proveedor.url }}</a>
            </td>
            <td>
              <span :class="{ activo: proveedor.activo, inactivo: !proveedor.activo }">
                {{ proveedor.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Mensaje si no hay proveedores -->
      <p v-if="proveedores.length === 0" class="sin-proveedores">
        No hay proveedores disponibles.
      </p>
    </div>
    <router-link to="/home-screen" class="btn btn-outline-secondary w-100 mt-3">
  Regresar a Inicio
</router-link>
  </template>
  
  <script>
  export default {
    name: "ProveedoresInfo",
    data() {
      return {
        proveedores: [
          // Ejemplo de datos de proveedores
          {
            id: 1,
            nombre: "Proveedor A",
            telefono: "123-456-7890",
            url: "https://www.proveedora.com",
            activo: true,
          },
          {
            id: 2,
            nombre: "Proveedor B",
            telefono: "987-654-3210",
            url: "https://www.proveedorb.com",
            activo: false,
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .proveedores-container {
    padding: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .table th, .table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .table th {
    background-color: #f4f4f4;
  }
  
  .activo {
    color: green;
    font-weight: bold;
  }
  
  .inactivo {
    color: red;
    font-weight: bold;
  }
  
  .sin-proveedores {
    text-align: center;
    color: #999;
    margin-top: 20px;
  }
  </style>