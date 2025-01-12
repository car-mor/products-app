<template>
    <div class="container-fluid px-4">
      <h1 class="text-center my-4">Gestión de Productos</h1>
  
      <!-- Botón para agregar un nuevo producto -->
      <button class="btn btn-primary mb-4 px-4" data-bs-toggle="modal" data-bs-target="#productModal" @click="openAddProductModal">
        <i class="bi bi-plus-circle me-2"></i>Agregar Producto
      </button>
  
      <!-- Tabla de productos -->
      <div class="table-responsive shadow-sm rounded">
        <table class="table table-hover table-bordered mb-0">
          <thead class="table-dark">
            <tr>
              <th class="text-center" style="width: 80px">Foto</th>
              <th style="min-width: 200px">Nombre</th>
              <th style="min-width: 180px">Proveedor</th>
              <th style="min-width: 120px">Precio</th>
              <th style="min-width: 150px">Stock</th>
              <th style="min-width: 150px">Estado</th>
              <th style="min-width: 200px">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" :class="{'table-danger': product.stock === 0}">
              <td class="text-center">
                <img :src="product.photo" alt="Foto" class="rounded" style="width: 60px; height: 60px; object-fit: cover;" />
              </td>
              <td class="align-middle fw-semibold">{{ product.name }}</td>
              <td class="align-middle">
                <div class="d-flex align-items-center">
                  {{ product.provider }}
                  <button
                    class="btn btn-sm btn-outline-info ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#providerDetailsModal"
                    @click="openProviderDetails(product.provider)"
                    title="Ver detalles del proveedor"
                  >
                    <i class="bi bi-info-circle"></i>
                  </button>
                </div>
              </td>
              <td class="align-middle">${{ product.price.toLocaleString() }}</td>
              <td class="align-middle">
                <div class="input-group">
                  <input 
                    type="number" 
                    class="form-control form-control-sm" 
                    v-model.number="product.stock"
                    @change="updateProductStock(product)"
                  >
                  <span class="input-group-text">unids.</span>
                </div>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center">
                  <select 
                    class="form-select form-select-sm me-2" 
                    v-model="product.status"
                    @change="updateProductStatus(product)"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="discontinued">Descontinuado</option>
                  </select>
                  <span 
                    class="badge" 
                    :class="{
                      'bg-success': product.status === 'active' && product.stock > 0,
                      'bg-warning': product.status === 'inactive',
                      'bg-danger': product.status === 'discontinued' || product.stock === 0
                    }"
                  >
                    {{ getStatusText(product) }}
                  </span>
                </div>
              </td>
              <td class="align-middle">
                <div class="btn-group">
                  <button 
                    class="btn btn-warning btn-sm" 
                    data-bs-toggle="modal" 
                    data-bs-target="#productModal" 
                    @click="openEditProductModal(product)"
                  >
                    <i class="bi bi-pencil me-1"></i>Editar
                  </button>
                  <button 
                    class="btn btn-danger btn-sm"
                    @click="confirmDelete(product)"
                  >
                    <i class="bi bi-trash me-1"></i>Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para editar o agregar producto -->
      <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel">
                {{ currentProduct.id ? 'Editar Producto' : 'Agregar Producto' }}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form @submit.prevent="saveProduct">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="name" class="form-label">Nombre</label>
                      <input v-model="currentProduct.name" type="text" class="form-control" id="name" required />
                    </div>
                    <div class="mb-3">
                      <label for="photo" class="form-label">Foto URL</label>
                      <input v-model="currentProduct.photo" type="url" class="form-control" id="photo" required />
                    </div>
                    <div class="mb-3">
                      <label for="provider" class="form-label">Proveedor</label>
                      <select v-model="currentProduct.provider" class="form-select" id="provider" required>
                        <option v-for="provider in providers" :key="provider.id" :value="provider.name">
                          {{ provider.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="price" class="form-label">Precio</label>
                      <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input v-model.number="currentProduct.price" type="number" class="form-control" id="price" required />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="stock" class="form-label">Cantidad en Stock</label>
                      <div class="input-group">
                        <input v-model.number="currentProduct.stock" type="number" class="form-control" id="stock" required />
                        <span class="input-group-text">unidades</span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="status" class="form-label">Estado</label>
                      <select v-model="currentProduct.status" class="form-select" id="status" required>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="discontinued">Descontinuado</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Modal para detalles del proveedor (sin cambios) -->
      <div class="modal fade" id="providerDetailsModal" tabindex="-1" aria-labelledby="providerDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="providerDetailsModalLabel">Detalles del Proveedor</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form @submit.prevent="saveProvider">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="providerName" class="form-label">Nombre</label>
                  <input v-model="selectedProvider.name" type="text" class="form-control" id="providerName" required />
                </div>
                <div class="mb-3">
                  <label for="providerPhone" class="form-label">Teléfono</label>
                  <input v-model="selectedProvider.phone" type="text" class="form-control" id="providerPhone" required />
                </div>
                <div class="mb-3">
                  <label for="providerUrl" class="form-label">URL</label>
                  <input v-model="selectedProvider.url" type="url" class="form-control" id="providerUrl" required />
                </div>
                <div class="mb-3 form-check">
                  <input v-model="selectedProvider.active" type="checkbox" class="form-check-input" id="providerActive" />
                  <label for="providerActive" class="form-check-label">Activo</label>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { 
            id: 1, 
            name: "Producto 1", 
            photo: "https://images.pexels.com/photos/30147974/pexels-photo-30147974/free-photo-of-iced-coffee-with-biscuit-topping-on-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
            provider: "Proveedor 1", 
            price: 100, 
            stock: 10,
            status: 'active'
          },
          { 
            id: 2, 
            name: "Producto 2", 
            photo: "https://images.pexels.com/photos/5195399/pexels-photo-5195399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
            provider: "Proveedor 2", 
            price: 200, 
            stock: 0,
            status: 'inactive'
          },
          { 
            id: 3, 
            name: "Producto 3", 
            photo: "https://images.pexels.com/photos/21701368/pexels-photo-21701368/free-photo-of-cup-of-tea-and-candle-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=10", 
            provider: "Proveedor 2", 
            price: 200, 
            stock: 20,
            status: 'active'
          },
          { 
            id: 4, 
            name: "Producto 4", 
            photo: "https://images.pexels.com/photos/28907971/pexels-photo-28907971/free-photo-of-refreshing-iced-drinks-in-cafe-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
            provider: "Proveedor 2", 
            price: 200, 
            stock: 10,
            status: 'active'
          },
        ],
        providers: [
          { id: 1, name: "Proveedor 1", phone: "123456789", url: "https://proveedor1.com", active: true },
          { id: 2, name: "Proveedor 2", phone: "987654321", url: "https://proveedor2.com", active: true },
        ],
        currentProduct: {
          id: null,
          name: "",
          photo: "",
          provider: "",
          price: 0,
          stock: 0,
          status: 'active'
        },
        selectedProvider: {
          id: null,
          name: "",
          phone: "",
          url: "",
          active: false,
        },
      };
    },
    methods: {
      openAddProductModal() {
        this.currentProduct = { 
          id: null, 
          name: "", 
          photo: "", 
          provider: "", 
          price: 0, 
          stock: 0,
          status: 'active'
        };
      },
      openEditProductModal(product) {
        this.currentProduct = { ...product };
      },
      saveProduct() {
        if (this.currentProduct.id) {
          const index = this.products.findIndex((p) => p.id === this.currentProduct.id);
          this.products[index] = { ...this.currentProduct };
        } else {
          this.currentProduct.id = Date.now();
          this.products.push({ ...this.currentProduct });
        }
        // Cerrar el modal después de guardar
        const modal = document.getElementById('productModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      },
      confirmDelete(product) {
        if (confirm(`¿Está seguro de eliminar el producto "${product.name}"?`)) {
          this.deleteProduct(product.id);
        }
      },
      deleteProduct(id) {
        this.products = this.products.filter((p) => p.id !== id);
      },
      openProviderDetails(providerName) {
        const provider = this.providers.find((p) => p.name === providerName);
        if (provider) {
          this.selectedProvider = { ...provider };
        }
      },
      saveProvider() {
        const index = this.providers.findIndex((p) => p.id === this.selectedProvider.id);
        if (index !== -1) {
          this.providers[index] = { ...this.selectedProvider };
        }
        // Cerrar el modal después de guardar
        const modal = document.getElementById('providerDetailsModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      },
      updateProductStock(product) {
        // Asegurarse de que el stock no sea negativo
        if (product.stock < 0) product.stock = 0;
      },
      updateProductStatus(product) {
        // Aquí puedes agregar lógica adicional cuando se actualiza el estado
        console.log(`Estado del producto ${product.name} actualizado a: ${product.status}`);
      },
      getStatusText(product) {
        if (product.stock === 0) return 'Agotado';
        switch (product.status) {
          case 'active': return 'Disponible';
          case 'inactive': return 'Inactivo';
          case 'discontinued': return 'Descontinuado';
          default: return 'Desconocido';
        }
      }
    },
  };
  </script>
  
  <style>
  .container-fluid {
    max-width: 1400px;
  }
  
  .table th {
    background-color: #2c3e50;
    color: white;
    font-weight: 500;
  }
  
  .btn-group {
    gap: 0.5rem;
  }
  
  .modal-lg {
    max-width: 800px;
  }
  
  .badge {
    min-width: 90px;
    padding: 0.5em 0.8em;
  }
  </style>