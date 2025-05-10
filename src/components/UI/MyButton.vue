<template>
    <button class="btn" type="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
.btn {
  padding: 12px 24px;
  background-color: white;
  color: #111827;
  border: 2px solid #3b82f6;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
}

.btn:hover {
  background-color: #f3f4f6;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-color: #2563eb;
}

.btn:active {
  transform: scale(0.98);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

</style>