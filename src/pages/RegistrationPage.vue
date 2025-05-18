<template>
  <div class="login-container">
    <form @submit.prevent ref="registration" class="login-form">
      <h2>Регистрация</h2>

      <UserWidget />

      <label for="username">Логин:</label>
      <div class="input-wrapper">
        <my-input v-model="username" placeholder="Введите логин..." required />
      </div>

      <label for="username">Пароль:</label>
      <div class="input-wrapper">
        <my-input v-model="password" type="password" placeholder="Введите пароль..." required />
      </div>

      <label for="username">Повторите пароль:</label>
      <div class="input-wrapper">
        <my-input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль..." required />
      </div>

      <my-button style="width: 100%;" @click="registration">Регистрация</my-button>
      <my-button 
      style="width: 100%;" 
      @click="this.$router.push({ path: '/login', query: { redirect: this.$route.query.redirect } })">Назад</my-button>
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
      confirmPassword: ''
    };
  },

  methods: {
    async registration() {
      if (!validateForm(this.$refs.registration)) return;

      try {
        if (this.password == this.confirmPassword)
        {
            const response = await axios.post('/api/auth/registration', {
            username: this.username,
            password: this.password,
            });

            // Получаем путь редиректа
            const redirectPath = this.$route.query.redirect || '/';
            alert(response.data);
            this.$router.push(redirectPath);
        }
        else {
            alert('Введенные пароли не совпадают!');
        }
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
  padding: 16px 24px 24px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%; /* Задаём форму на 100% ширины */
  max-width: 400px; /* Максимальная ширина формы, чтобы она не была слишком широкой */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-form h2 {
  text-align: center;
  margin: 0 0 10px 0;
  font-size: 28px;
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