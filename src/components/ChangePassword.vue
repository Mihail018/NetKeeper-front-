<template>
  <form class="form" ref="changePassword" @submit.prevent>
    <h1 class="title">Измените пароль пользователя</h1>

    <my-input style="width: 90%;"
      type="password"
      v-model="newPassword"
      placeholder="Новый пароль..."
      required
    />

    <my-input style="width: 90%;"
      type="password"
      v-model="confirmPassword"
      placeholder="Подтвердите пароль..."
      required
    />

    <my-button @click="submitUsername">Подтвердить</my-button>
  </form>
</template>

<script>
import { validateForm } from '@/validator/validateForm';

export default {
  name: "change-password",

  data() {
    return {
      newPassword: '',
      confirmPassword: '',
    };
  },

  methods: {
    submitUsername() {
        if (!validateForm(this.$refs.changePassword)) return;

        if (this.newPassword != this.confirmPassword) {
          alert("Введенные пароли не совпадают!");
          return;
        }

        this.$emit('submit', this.newPassword);
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 300px;
}

.title {
  font-size: 18px;
  margin: 0 0 8px;
  color: #333;
}
</style>
