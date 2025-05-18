<template>
  <form class="form" ref="oldPassword" @submit.prevent>
    <h1 class="title">Измените пароль пользователя</h1>

    <my-input style="width: 90%;"
      type="password"
      v-model="oldPassword"
      placeholder="Старый пароль..."
      required
    />

    <my-button @click="submitUsername">Подтвердить</my-button>
  </form>
</template>

<script>
import { validateForm } from '@/validator/validateForm';

export default {
  name: "old-password",

  data() {
    return {
      oldPassword: ''
    };
  },

  methods: {
    submitUsername() {
        if (!validateForm(this.$refs.oldPassword)) return;

        this.$emit('submit', this.oldPassword);
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
