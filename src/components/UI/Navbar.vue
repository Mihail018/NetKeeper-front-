<template>
  <div class="navbar">
    <div class="nav-center">
      <my-button class="nav-btn" @click="$router.push('/')">Главная</my-button>
      <my-button class="nav-btn" @click="$router.push('/data')">Просмотр и добавление ТКО</my-button>
      <my-button class="nav-btn" @click="$router.push('/updateData')">Редактирование характеристик ТКО</my-button>
      <my-button class="nav-btn" @click="$router.push('/deleteData')">Удаление ТКО</my-button>
      <my-button class="nav-btn" @click="$router.push('/about')">О нас</my-button>
      <my-button class="nav-btn" @click="$router.push('/referenceMaterials')">Справка</my-button>
    </div>

    <!-- Неавторизованный пользователь -->
    <button 
    class="auth-button" 
    v-if="!isAuthenticated" 
    @click="$router.push('/login')"
    title="Войти в аккаунт">
    <UserIcon />
    </button>

    <!-- Aвторизованный пользователь -->
    <div class="auth-dropdown" v-else>
      <button class="auth-button" @click="toggleDropdown" title="Аккаунт">
        <UserIcon />
      </button>
      <div v-if="dropdownOpen" class="dropdown-menu">
        <div class="dropdown-item" @click="goToProfile">Личный кабинет</div>
        <div class="dropdown-item" @click="logout">Выход</div>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'navbar',

  data() {
    return {
      isAuthenticated: false,
      dropdownOpen: false
    };
  },

  created() {
    this.checkAuth();
  },

  watch: {
    // следим за маршрутом, чтобы обновить состояние при каждом переходе
    $route() {
      this.checkAuth();
      this.dropdownOpen = false
    }
  },

  methods: {
    async checkAuth() {
      try {
        const response = await axios.get('/api/auth/user/me', { withCredentials: true });
        this.isAuthenticated = true; // Пользователь аутентифицирован
      } 
      catch (error) {
        this.isAuthenticated = false; // Пользователь не аутентифицирован
      }
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    goToProfile() {
      this.dropdownOpen = false;
      this.$router.push('/profile');
    },

    async logout() {
      try {
        const data = await axios.post('/api/auth/logout', { withCredentials: true });
        console.log('data = ' + data);
        this.checkAuth(); // вручную обновляем
        this.$router.push('/login');
      } 
      catch (error) {
        console.error('Ошибка при выходе:', error.response || error);
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: #022236;
  padding: 12px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-center {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 0 auto;
}

/* Кнопки */
.nav-btn {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff33;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.nav-btn:hover {
  background-color: #ffffff22;
  border-color: #ffffff66;
  color: #ffffff;
}

/* Иконка входа/профиля */
.auth-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  padding: 0;
  color: white;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.auth-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  overflow: hidden;
  z-index: 200;
  width: 180px;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  animation: fadeIn 0.2s ease-out;
}

.dropdown-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
  color: #1d4ed8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>