<template>
  <form class="form" ref="changeLogin" @submit.prevent>
    <h1 class="title">Введите новое имя пользователя</h1>

    <my-input style="width: 90%;"
      v-model="newUsername"
      placeholder="Новое имя пользователя"
      required
    />
    <my-button @click="submitUsername">Подтвердить</my-button>
  </form>
</template>

<script>
import { validateForm } from '@/validator/validateForm';

export default {
  name: "change-login",

  data() {
    return {
      newUsername: '',
    };
  },

  methods: {
    submitUsername() {
        if (!validateForm(this.$refs.changeLogin)) return;

        this.$emit('submit', this.newUsername);
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
