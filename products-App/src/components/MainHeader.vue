<template>
    <header class="header">
      <div class="header-container">
        <!-- Logo -->
        <h1 class="logo">ElectroShop</h1>
  
        <!-- Menú de navegación -->
        <nav>
          <ul class="nav-menu">
            <li><a href="#" class="nav-link">Inicio</a></li>
            <li><a href="#" class="nav-link">Productos</a></li>
            <li><a href="#" class="nav-link">Ofertas</a></li>
            <li><a href="#" class="nav-link">Contacto</a></li>
          </ul>
        </nav>
  
        <!-- Grupo de búsqueda y acciones -->
        <div class="actions-group">
          <!-- Barra de búsqueda -->
          <div class="search-bar">
            <input
              type="text"
              placeholder="Buscar electrodomésticos..."
              v-model="searchQuery"
            />
            <SearchIcon class="search-icon" />
          </div>
  
          <div class="user-actions">
  <router-link to="/inicio-sesion" class="icon-button">
    <UserIcon />
  </router-link>
  <RouterLink to="/carrito-compras">
    <button class="icon-button cart-button">
      <ShoppingCartIcon />
      <span class="cart-count">{{ cartItemsCount }}</span>
    </button>
  </RouterLink>
</div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-vue-next'
  
  const searchQuery = ref('')
  const cartItemsCount = ref(0)
  </script>
  
  <style scoped>
  /* Estilos principales del header */
  .header {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2563eb;
    white-space: nowrap;
  }
  
  /* Menú de navegación */
  .nav-menu {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    text-decoration: none;
    color: #4b5563;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: #2563eb;
  }
  
  /* Grupo de acciones */
  .actions-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  /* Barra de búsqueda */
  .search-bar {
    position: relative;
    width: 300px;
    flex-shrink: 0;
  }
  
  .search-bar input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .search-bar input:focus {
    border-color: #2563eb;
  }
  
  .search-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #9ca3af;
  }
  
  /* Botones de usuario y carrito */
  .user-actions {
    display: flex;
    gap: 1rem;
  }
  
  .icon-button {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #4b5563;
    transition: color 0.3s ease;
    position: relative;
  }
  
  .icon-button:hover {
    color: #2563eb;
  }
  
  .cart-button {
    position: relative;
  }
  
  .cart-count {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background-color: #ef4444;
    color: white;
    font-size: 0.75rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Responsive para tabletas */
  @media (max-width: 1024px) {
    .search-bar {
      width: 200px;
    }
  }
  
  /* Responsive para móviles */
  @media (max-width: 768px) {
    .header-container {
      flex-wrap: wrap;
      gap: 1rem;
    }
  
    .nav-menu {
      order: 3;
      width: 100%;
      justify-content: space-around;
    }
  
    .actions-group {
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
  </style>