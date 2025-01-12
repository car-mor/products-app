<template>
  <div class="h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div class="container py-4">
      <h2 class="mb-4">Carrito de Compras</h2>

      <!-- Verificación de datos -->
      <template v-if="cart && cart.items">
        <!-- Grid container -->
        <div class="row">
          <!-- Lista de Productos - Ocupa 8 columnas en pantallas grandes -->
          <div class="col-md-8">
            <div class="card shadow-md mb-4">
              <div class="card-body">
                <!-- Encabezado de la lista -->
                <div class="d-none d-md-flex w-full border-bottom pb-2 mb-3">
                  <div class="col-6">Producto</div>
                  <div class="col-2 text-center">Cantidad</div>
                  <div class="col-2 text-center">Precio</div>
                  <div class="col-2 text-center">Subtotal</div>
                </div>

                <!-- Items del carrito -->
                <template v-if="cart.items.length">
                  <div
                    v-for="item in cart.items"
                    :key="item.id"
                    class="row align-items-center py-3 border-bottom"
                  >
                    <!-- Información del producto -->
                    <div class="col-12 col-md-6 mb-2 mb-md-0">
                      <div class="d-flex align-items-center">
                        <img
                          :src="item.imageUrl"
                          :alt="item.name"
                          class="cart-item-image me-3"
                          style="width: 80px; height: 80px; object-fit: cover"
                        />
                        <div>
                          <h6 class="mb-0">{{ item.name }}</h6>
                          <small class="text-muted"
                            >Proveedor: {{ item.provider }}</small
                          >
                        </div>
                      </div>
                    </div>

                    <!-- Control de cantidad -->
                    <div class="col-12 col-md-2 mb-2 mb-md-0">
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <button
                          class="btn btn-sm btn-outline-secondary"
                          @click="decreaseQuantity(item)"
                          :disabled="item.quantity <= 1"
                        >
                          <MinusCircle class="w-4 h-4" />
                          <!-- Ícono de menos -->
                        </button>
                        <input
                          type="number"
                          class="form-control form-control-sm mx-2 text-center"
                          style="width: 60px"
                          v-model.number="item.quantity"
                          @change="updateQuantity(item)"
                        />
                        <button
                          class="btn btn-sm btn-outline-secondary"
                          @click="increaseQuantity(item)"
                        >
                          <PlusCircle class="w-4 h-4" />
                          <!-- Ícono de más -->
                        </button>
                      </div>
                    </div>

                    <!-- Precio unitario -->
                    <div class="col-6 col-md-2 text-end text-md-center">
                      <span class="d-inline d-md-none">Precio: </span>
                      {{ formatPrice(item.price) }}
                    </div>

                    <!-- Subtotal -->
                    <div class="col-6 col-md-2 text-end text-md-center">
                      <span class="d-inline d-md-none">Subtotal: </span>
                      {{ formatPrice(item.price * item.quantity) }}
                      <button
                        class="btn btn-sm text-danger ms-2"
                        @click="removeItem(item.id)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </template>

                <!-- Carrito vacío -->
                <div v-else class="text-center py-5">
                  <i class="bi bi-cart-x fs-1 text-muted"></i>
                  <p class="mt-2">Tu carrito está vacío</p>
                  <router-link to="/products" class="btn btn-primary">
                    Continuar Comprando
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen del Carrito -->
          <div class="col-md-4">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title mb-4">Resumen de Compra</h5>

                <!-- Dirección de envío -->
                <div class="mb-4">
                  <h6 class="mb-2">Dirección de Envío</h6>
                  <address class="mb-0" v-if="cart.shippingAddress">
                    {{ cart.shippingAddress.street }}<br />
                    {{ cart.shippingAddress.city }},
                    {{ cart.shippingAddress.state }}<br />
                    {{ cart.shippingAddress.zipCode }}<br />
                    {{ cart.shippingAddress.country }}
                  </address>
                  <button
  class="btn btn-sm btn-outline-primary mt-2"
  @click="showAddressForm = true"
>
  Cambiar dirección
</button>
<!-- Modal para editar dirección -->
<template v-if="showAddressForm">
  <div class="modal-overlay">
    <div class="modal-content">
      <h5>Editar Dirección</h5>
      <form @submit.prevent="updateShippingAddress">
        <div class="mb-3">
          <label for="street" class="form-label">Calle</label>
          <input
            id="street"
            type="text"
            v-model="editAddress.street"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">Ciudad</label>
          <input
            id="city"
            type="text"
            v-model="editAddress.city"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="state" class="form-label">Estado</label>
          <input
            id="state"
            type="text"
            v-model="editAddress.state"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="zipCode" class="form-label">Código Postal</label>
          <input
            id="zipCode"
            type="text"
            v-model="editAddress.zipCode"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="country" class="form-label">País</label>
          <input
            id="country"
            type="text"
            v-model="editAddress.country"
            class="form-control"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-secondary me-2" @click="showAddressForm = false">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>
                </div>

                <!-- Totales -->
                <div class="border-top pt-3">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>{{ formatPrice(cart.subtotal) }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Envío</span>
                    <span>{{ formatPrice(cart.shipping) }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between fw-bold mt-3 pt-3 border-top"
                  >
                    <span>Total</span>
                    <span>{{ formatPrice(cart.total) }}</span>
                  </div>

                  <button
                    class="btn btn-primary w-100 mt-4"
                    :disabled="!cart.items.length"
                    @click="proceedToCheckout"
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-center py-5">
          <p>Cargando...</p>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import { defineComponent, ref, onMounted } from "vue";
import PlusCircle from "vue-material-design-icons/PlusCircle.vue";
import MinusCircle from "vue-material-design-icons/MinusCircle.vue";

// Datos de prueba
const mockData = {
  items: [
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      provider: "Dell Computers",
      price: 24999.99,
      quantity: 1,
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 2,
      name: "Monitor LG 27'",
      provider: "LG Electronics",
      price: 5999.99,
      quantity: 2,
      imageUrl: "https://picsum.photos/201",
    },
    {
      id: 3,
      name: "Teclado Mecánico Logitech",
      provider: "Logitech",
      price: 1499.99,
      quantity: 1,
      imageUrl: "https://picsum.photos/202",
    },
  ],
  shippingAddress: {
    street: "Av. Insurgentes Sur 1234",
    city: "Ciudad de México",
    state: "CDMX",
    zipCode: "03100",
    country: "México",
  },
  totalItems: 4,
  subtotal: 32499.97,
  shipping: 150.0,
  total: 32649.97,
};

export default defineComponent({
  name: "ShoppingCart",

  components: {
    PlusCircle,
    MinusCircle,
  },

  setup() {
    const cart = ref({
      items: [],
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      totalItems: 0,
      subtotal: 0,
      shipping: 0,
      total: 0,
    });

    const showAddressForm = ref(false); // Controla la visibilidad del modal
    const editAddress = ref({ ...cart.value.shippingAddress }); // Dirección editable

    // Simular carga de datos
    const loadCart = async () => {
      try {
        // Simulamos una llamada a la API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        cart.value = mockData;
        editAddress.value = { ...mockData.shippingAddress }; // Inicializamos el formulario
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    // Actualizar dirección de envío
    const updateShippingAddress = () => {
      cart.value.shippingAddress = { ...editAddress.value }; // Actualizamos los datos del carrito
      showAddressForm.value = false; // Cerramos el modal
    };

    // Formatear precio
    const formatPrice = (price) =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(price);

    // Actualizar cantidad de un producto
    const updateQuantity = () => {
      cart.value.subtotal = cart.value.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      cart.value.total = cart.value.subtotal + cart.value.shipping;
      cart.value.totalItems = cart.value.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    };

    const increaseQuantity = (item) => {
      item.quantity++;
      updateQuantity();
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        item.quantity--;
        updateQuantity();
      }
    };

    const removeItem = (itemId) => {
      cart.value.items = cart.value.items.filter((item) => item.id !== itemId);
      if (cart.value.items.length > 0) {
        updateQuantity();
      } else {
        cart.value.totalItems = 0;
        cart.value.subtotal = 0;
        cart.value.total = 0;
      }
    };

    const proceedToCheckout = () => {
      alert("Redirigiendo al checkout...");
    };

    onMounted(loadCart);

    return {
      cart,
      showAddressForm,
      editAddress,
      updateShippingAddress,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      proceedToCheckout,
    };
  },
});
</script>


<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
