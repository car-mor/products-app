<template>
    <div>
      <MainHeader />
      <div class="container py-4 mt-4">
        <!-- Grid de Productos -->
        <main>
          <div class="row g-4">
            <div v-for="(product, index) in products" 
                 :key="index" 
                 class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card h-100">
                <img :src="product.image" 
                     class="card-img-top"
                     style="height: 200px; object-fit: cover;"
                     :alt="product.name" />
                <div class="card-body">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">
                    <span class="fw-bold">Proveedor:</span> {{ product.supplier }}
                  </p>
                  <p class="card-text">
                    <span class="fs-4 text-primary fw-bold">${{ product.price.toLocaleString() }}</span>
                  </p>
                  <button class="btn btn-primary w-100">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
import MainHeader from '@/components/MainHeader.vue';
  
  const products = ref([
    { 
      name: 'Refrigerador', 
      price: 12000.99, 
      supplier: 'Samsung', 
      image: 'https://www.cityclub.com.mx/dw/image/v2/BGBD_PRD/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dwa4f29c65/images/product/8806090742965_D.jpg?sw=1000&sh=1000&sm=fit' 
    },
    { 
      name: 'Televisor LED', 
      price: 8500.50, 
      supplier: 'LG', 
      image: 'https://i5.walmartimages.com/asr/39375d22-104a-41f9-b554-329186699894.14f57b6742ee947ee678157620513c23.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' 
    },
    { 
      name: 'Licuadora', 
      price: 1500.99, 
      supplier: 'Oster', 
      image: 'https://ostermx.vtexassets.com/arquivos/ids/161140-800-auto?v=638131135285000000&width=800&height=auto&aspect=true' 
    },
    { 
      name: 'Lavadora', 
      price: 9500.00, 
      supplier: 'Whirlpool', 
      image: 'https://www.mueblesamerica.mx/img/1024/1024/resize/L/G/LG_01440_x1_1.jpg' 
    },
    { 
      name: 'Lavadora', 
      price: 9500.00, 
      supplier: 'Whirlpool', 
      image: 'https://www.mueblesamerica.mx/img/1024/1024/resize/L/G/LG_01440_x1_1.jpg' 
    },
    { 
      name: 'Lavadora', 
      price: 9500.00, 
      supplier: 'Whirlpool', 
      image: 'https://www.mueblesamerica.mx/img/1024/1024/resize/L/G/LG_01440_x1_1.jpg' 
    },
    { 
      name: 'Lavadora', 
      price: 9500.00, 
      supplier: 'Whirlpool', 
      image: 'https://www.mueblesamerica.mx/img/1024/1024/resize/L/G/LG_01440_x1_1.jpg' 
    },
  ])
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  .card-img-top {
    object-fit: cover;
    height: 200px;
  }
  
  .container {
    clear: both;
  }
  
  .btn-primary {
    margin-top: auto;
  }
  </style>