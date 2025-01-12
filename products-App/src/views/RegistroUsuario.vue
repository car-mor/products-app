<template>
    <div class="register-container">
      <!-- Imagen a la izquierda -->
      <div class="register-image">
        <img
          src="@/assets/logoElectroShop.png"
          alt="Imagen de registro"
          style="width: 500px; height: auto;"
        />
      </div>
  
      <!-- Formulario de registro -->
      <div class="register-form">
        <h2 class="form-title">Regístrate</h2>
        <form @submit.prevent="handleRegister">
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
  
          <!-- Campo de nombre -->
          <div class="form-group">
            <label for="name">Nombre</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              :class="{ 'is-invalid': nameError }"
              placeholder="Ingresa tu nombre"
              required
            />
            <div v-if="nameError" class="invalid-feedback">{{ nameError }}</div>
          </div>
  
          <!-- Campo de apellidos -->
          <div class="form-group">
            <label for="lastName">Apellidos</label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              class="form-control"
              placeholder="Ingresa tus apellidos"
              required
            />
          </div>
  
          <!-- Campo de dirección -->
          <div class="form-group">
            <label for="address">Dirección</label>
            <input
              type="text"
              id="address"
              v-model="address"
              class="form-control"
              placeholder="Ingresa tu dirección"
              required
            />
          </div>
  
          <!-- Campo de teléfono -->
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              v-model="phone"
              class="form-control"
              placeholder="Ingresa tu teléfono"
              required
            />
          </div>
  
          <!-- Campo de fecha de nacimiento -->
          <div class="form-group">
            <label for="birthDate">Fecha de Nacimiento</label>
            <input
              type="date"
              id="birthDate"
              v-model="birthDate"
              class="form-control"
              required
            />
          </div>
  
          <!-- Botón de registro -->
          <button type="submit" class="btn btn-primary w-100">Registrarse</button>
        </form>
  
        <!-- Botones para regresar y para iniciar sesión -->
        <div class="navigation-buttons mt-3">
          <router-link to="/home-screen" class="btn btn-outline-secondary w-100 mb-2">
            Regresar a Inicio
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Campos del formulario
  const email = ref("");
  const password = ref("");
  const name = ref("");
  const lastName = ref("");
  const address = ref("");
  const phone = ref("");
  const birthDate = ref("");
  
  // Errores de validación
  const emailError = ref("");
  const passwordError = ref("");
  const nameError = ref("");
  
  // Función para manejar el registro
  const handleRegister = () => {
    // Validaciones básicas
    emailError.value = email.value.includes("@") ? "" : "Correo no válido.";
    passwordError.value =
      password.value.length >= 6
        ? ""
        : "La contraseña debe tener al menos 6 caracteres.";
    nameError.value = name.value.trim() ? "" : "El nombre es obligatorio.";
  
    // Si no hay errores, procesar el registro
    if (!emailError.value && !passwordError.value && !nameError.value) {
      console.log("Registrando con:", {
        email: email.value,
        password: password.value,
        name: name.value,
        lastName: lastName.value,
        address: address.value,
        phone: phone.value,
        birthDate: birthDate.value,
      });
      // Aquí puedes llamar a tu API para registrar al usuario
    }
  };
  </script>
  
  <style scoped>
  /* Contenedor principal */
  .register-container {
    display: flex;
    height: 100vh;
  }
  
  /* Imagen a la izquierda */
  .register-image {
    flex: 1;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .register-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  
  /* Formulario a la derecha */
  .register-form {
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
  
  /* Botones de navegación */
  .navigation-buttons .btn {
    text-align: center;
  }
  </style>
  