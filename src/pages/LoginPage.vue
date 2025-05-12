<template>
  <form @submit.prevent ref="login">
    <my-input v-model="username" placeholder="Введите логин..." required />
    <my-input v-model="password" type="password" placeholder="Введите пароль..." required />
    <my-button @click="login">Войти</my-button> <br><br>
    <my-button @click="this.$router.push('/registration')">Регистрация</my-button>
  </form>
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