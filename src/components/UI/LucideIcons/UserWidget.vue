<template>
  <div class="icon-wrapper">
    <CircleUserRound class="user-widget" />
  </div>
</template>

<script setup>
import { CircleUserRound } from 'lucide-vue-next';

defineOptions({
  name: 'UserWidget'
});
</script>

<style scoped>
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 10px; /* Уменьшены отступы сверху и снизу */
  background-color: #f3f4f6;
  padding: 16px;
  border-radius: 50%;
  width: fit-content;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.user-widget {
  width: 80px; /* немного уменьшена */
  height: 80px;
  color: #6b7280;
}
</style>
