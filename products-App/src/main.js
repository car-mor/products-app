// Importa los estilos de tu proyecto y Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // CSS de Bootstrap
import 'bootstrap'; // JavaScript de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Estilos de Font Awesome
// Importa Vue y las configuraciones de tu proyecto
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Crea la instancia de la aplicación
const app = createApp(App);

// Configura el router
app.use(router);

// Monta la aplicación
app.mount('#app');
