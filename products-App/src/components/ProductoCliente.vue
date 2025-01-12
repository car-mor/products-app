<template>
    <div v-if="product" class="container py-4">
      <div class="row h-100">
        <!-- Columna de la imagen -->
        <div class="col-md-6 mb-4 h-100">
          <img 
            :src="product.mainImage || defaultImage" 
            :alt="product.name" 
            class="img-fluid rounded" 
          />
          
          <!-- Miniaturas adicionales solo si hay más de una imagen -->
          <div 
            v-if="product.additionalImages && product.additionalImages.length > 0" 
            class="d-flex mt-3 gap-2"
          >
            <div 
              v-for="(image, index) in product.additionalImages" 
              :key="index" 
              class="thumbnail-container"
              style="width: 80px; height: 80px;"
            >
              <img 
                :src="image" 
                :alt="product.name" 
                class="img-thumbnail"
                style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                @click="setMainImage(image)" 
              />
            </div>
          </div>
        </div>
  
        <!-- Columna de detalles -->
        <div class="col-md-6">
          <h2 class="mb-2">{{ product.name }}</h2>
          <p class="text-muted mb-3">de {{ product.provider }}</p>
          
          <div class="fs-3 fw-bold text-primary mb-4">
            {{ formatPrice(product.price) }}
          </div>
  
          <!-- Stock status -->
          <div class="mb-4">
            <span v-if="product.inStock" class="badge bg-success">En stock</span>
            <span v-else class="badge bg-danger">Agotado</span>
          </div>
  
          <!-- Cantidad y botón de agregar al carrito -->
          <div class="mb-4">
            <label for="quantity" class="form-label">Cantidad:</label>
            <div class="d-flex gap-3 align-items-center">
              <div class="input-group" style="width: 130px;">
                <button 
                  class="btn btn-outline-secondary" 
                  type="button" 
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <input 
                  type="number" 
                  class="form-control text-center" 
                  id="quantity"
                  v-model.number="quantity" 
                  min="1"
                  :max="product.maxQuantity" 
                />
                <button 
                  class="btn btn-outline-secondary" 
                  type="button" 
                  @click="increaseQuantity"
                  :disabled="quantity >= product.maxQuantity"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              
              <button 
                class="btn btn-primary" 
                @click="addToCart" 
                :disabled="!product.inStock"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
  
          <!-- Descripción -->
          <div class="mt-4">
            <h5>Descripción</h5>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
      <!-- Componente de reseñas -->
    <ResenasProducto :productId="product.id" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import ResenasProducto from '@/components/ResenasProducto.vue';
  
  // Datos de prueba
  const mockProduct = {
    id: 1,
    name: 'Bermuda Beige',
    provider: 'Regi Roots',
    price: 500.0,
    mainImage: 'https://http2.mlstatic.com/D_NQ_NP_605415-MLM77550499046_072024-O.webp',
    additionalImages: [
      'https://http2.mlstatic.com/D_NQ_NP_902994-MLM77768526235_072024-O.webp',
      'https://http2.mlstatic.com/D_NQ_NP_960488-MLM77550461176_072024-O.webp',
      'https://http2.mlstatic.com/D_NQ_NP_824987-MLM77797697772_072024-O.webp'
    ],
    description: 'Bermuda beige de gabardina con detalles rastas, bolsa secreta.',
    inStock: true,
    maxQuantity: 10
  };
  
  export default defineComponent({
    name: 'ProductDetail',
    components: {
    ResenasProducto
  },
    
    setup() {
      const product = ref(null);
      const quantity = ref(1);
      const defaultImage = 'https://via.placeholder.com/500'; // Imagen genérica por defecto
  
      // Cargar datos del producto
      const loadProduct = async () => {
        try {
          // Aquí iría tu llamada al backend
          await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
          product.value = mockProduct;
        } catch (error) {
          console.error('Error al cargar el producto:', error);
        }
      };
  
      // Formatear precio
      const formatPrice = (price) => {
        return new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        }).format(price);
      };
  
      // Manejar cantidad
      const increaseQuantity = () => {
        if (quantity.value < product.value.maxQuantity) {
          quantity.value++;
        }
      };
  
      const decreaseQuantity = () => {
        if (quantity.value > 1) {
          quantity.value--;
        }
      };
  
      // Cambiar imagen principal
      const setMainImage = (image) => {
        const currentMain = product.value.mainImage;
        product.value = {
          ...product.value,
          mainImage: image,
          additionalImages: product.value.additionalImages.map(img => 
            img === image ? currentMain : img
          )
        };
      };
  
      // Agregar al carrito
      const addToCart = () => {
        alert(`Agregado al carrito: ${quantity.value} unidad(es) de ${product.value.name}`);
      };
  
      onMounted(loadProduct);
  
      return {
        product,
        quantity,
        defaultImage,
        formatPrice,
        increaseQuantity,
        decreaseQuantity,
        setMainImage,
        addToCart
      };
    }
  });
  </script>
  
  <style scoped>
  .thumbnail-container {
    transition: all 0.2s ease-in-out;
  }
  
  .thumbnail-container:hover {
    transform: scale(1.05);
  }
  
  /* Asegurar que las imágenes mantengan su aspecto */
  .img-fluid {
    max-height: 500px;
    object-fit: contain;
  }
  </style>
  