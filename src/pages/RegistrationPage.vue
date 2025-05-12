<template>
  <form @submit.prevent ref="registration">
    <my-input v-model="username" placeholder="Введите логин..." required />
    <my-input v-model="password" type="password" placeholder="Введите пароль..." required />
    <my-input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль..." required />
    <my-button @click="registration">Зарегистрироваться</my-button>
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

            alert(response.data);
            this.$router.push('/');
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