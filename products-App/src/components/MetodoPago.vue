<template>
    <div class="payment-container">
        
      <h2 class="text-center mb-4">Proceso de Pago</h2>
  
      <div class="card shadow-lg p-4">
        <!-- Formulario Informativo de Pago -->
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nombre Completo</label>
            <input type="text" class="form-control" v-model="name" id="name" placeholder="Ingresa tu nombre" disabled />
          </div>
  
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="Ingresa tu correo" disabled />
          </div>
  
          <div class="mb-3">
            <label for="amount" class="form-label">Monto a Pagar (USD)</label>
            <input type="number" class="form-control" v-model="amount" id="amount" placeholder="Monto" disabled />
          </div>
  
          <div class="mb-3">
            <label for="card-element" class="form-label">Tarjeta de Crédito</label>
            <!-- Este es solo un campo informativo. No hay integración real con Stripe -->
            <input type="text" class="form-control" value="**** **** **** 1234" disabled />
          </div>
  
          <!-- Mensaje de Información -->
          <div v-if="showInfo" class="alert alert-info mt-4" role="alert">
            ¡Simulación! El pago de <strong>${{ amount }}</strong> será procesado con la tarjeta terminada en <strong>1234</strong>. <br />
            Esto es solo una demostración informativa, no se ha realizado ningún pago real.
          </div>
  
          <!-- Botón Informativo -->
          <button type="button" class="btn btn-primary w-100 mt-3" @click="showInfo = !showInfo">
            Mostrar detalles de pago
          </button>
          <router-link to="/home-screen" class="btn btn-outline-secondary w-100 mt-3">
  Regresar a Inicio
</router-link>
          
        </form>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        amount: 50,
        showInfo: false // Mostrar detalles informativos al hacer clic en el botón
      };
    }
  };
  </script>
  
  <style scoped>
  .payment-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .alert {
    font-size: 16px;
  }
  </style>