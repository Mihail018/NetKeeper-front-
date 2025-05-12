<template>
  <div class="login-container">
    <form @submit.prevent ref="login" class="login-form">
      <h2>Вход</h2>

      <label for="username">Логин:</label>
      <div class="input-wrapper">
        <my-input v-model="username" placeholder="Введите логин..." required />
      </div>

      <label for="password">Пароль:</label>
      <div class="input-wrapper">
        <my-input v-model="password" type="password" placeholder="Введите пароль..." required />
      </div>
      
      <div class="button-group">
        <div class="button-wrapper">
          <my-button style="width: 100%;" @click="login">Войти</my-button>
        </div>
        <div class="button-wrapper">
          <my-button style="width: 100%;" @click="this.$router.push('/registration')">Зарегистрироваться</my-button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import axios from 'axios';
import { validateForm } from '@/validator/validateForm';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  
  methods: {
    async login() {
      if (!validateForm(this.$refs.login)) return;

      try {
            const response = await axios.post('/api/auth/login', {
            username: this.username,
            password: this.password,
            });

            alert(response.data);
            this.$router.push('/');
      } 
      catch (error) {
        alert(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f9f9f9;
  padding: 0 20px; /* Добавляем отступы по бокам контейнера */
}

.login-form {
  background: white;
  border: 1px solid #ddd;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%; /* Задаём форму на 100% ширины */
  max-width: 400px; /* Максимальная ширина формы, чтобы она не была слишком широкой */
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 32px;
  color: #333;
}

.login-form label {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: -8px;
  color: #555;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; /* Ширина группы кнопок на 100% */
}

.input-wrapper,
.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>