<template>
    <div class="login-container">
      <!-- Imagen a la izquierda -->
      <div class="login-image">
  <img
    src="@/assets/logoElectroShop.png"
    alt="Imagen de inicio de sesión"
    style="width: 500px; height: auto;" 
  />
</div>

  
      <!-- Formulario de inicio de sesión -->
      <div class="login-form">
        <h2 class="form-title">Inicia Sesión</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Campo de correo -->
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-control"
                :class="{ 'is-invalid': emailError }"
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <div v-if="emailError" class="invalid-feedback">{{ emailError }}</div>
          </div>
  
          <!-- Campo de contraseña -->
          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                id="password"
                v-model="password"
                class="form-control"
                :class="{ 'is-invalid': passwordError }"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <div v-if="passwordError" class="invalid-feedback">{{ passwordError }}</div>
          </div>
  
          <!-- Botón de inicio de sesión -->
          <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
  
        <router-link to="/home-screen" class="btn btn-outline-secondary w-100 mt-3">
  Regresar a Inicio
</router-link>

        <!-- Enlace para registrarse -->
        <p class="register-link">
          ¿No tienes cuenta? <router-link to="/registro-usuario">Regístrate aquí</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Estado de los campos
  const email = ref("");
  const password = ref("");
  
  // Errores
  const emailError = ref("");
  const passwordError = ref("");
  
  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Validaciones básicas
    emailError.value = "";
    passwordError.value = "";
  
    if (!email.value.includes("@")) {
      emailError.value = "Por favor ingresa un correo válido.";
    }
    if (password.value.length < 6) {
      passwordError.value = "La contraseña debe tener al menos 6 caracteres.";
    }
  
    // Si no hay errores, procede con la autenticación
    if (!emailError.value && !passwordError.value) {
      console.log("Iniciando sesión con:", email.value, password.value);
      // Aquí puedes llamar a tu API para autenticar al usuario
    }
  };
  </script>
  
  <style scoped>
  /* Estilos del contenedor principal */
  .login-container {
    display: flex;
    height: 100vh;
  }
  
  /* Imagen a la izquierda */
  .login-image {
    flex: 1;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .login-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  
  /* Formulario a la derecha */
  .login-form {
    flex: 1;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
  }
  
  .form-title {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .invalid-feedback {
    color: #dc3545;
    font-size: 0.875rem;
  }
  
  .register-link {
    text-align: center;
    margin-top: 1rem;
  }
  
  .register-link a {
    color: #007bff;
    text-decoration: none;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  
  /* Estilos de responsividad */
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
    }
  
    .login-image {
      height: 40vh;
      flex: none;
    }
  
    .login-form {
      flex: none;
    }
  }
  </style>
  