<template>
  <form @submit.prevent class="form-container" ref="oldPassword">
    <h2 class="form-title">Измените пароль пользователя</h2>

    <div class="input-wrapper">
      <my-input
        type="password"
        v-model="oldPassword"
        placeholder="Старый пароль..."
        required
        class="input-field"
      />
    </div>

    <div class="button-wrapper">
      <my-button class="confirm-btn" @click="submitUsername">Подтвердить</my-button>
    </div>
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
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.form-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1f2937;
}

.input-wrapper {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 16px;
  box-sizing: border-box;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
