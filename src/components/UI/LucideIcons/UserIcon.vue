<template>
  <CircleUserRound class="user-icon"/>
</template>

<script setup>
import { CircleUserRound } from 'lucide-vue-next';

defineOptions({
        name: 'UserIcon'
    })
</script>

<style scoped>
.user-icon {
    width: 40px;
    height: 40px;
    color: #ffffff;
    cursor: pointer;
}
</style>
