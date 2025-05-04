<template>
  <input
    ref="ipInput"
    class="input"
    type="text"
  />
</template>

<script>
import Inputmask from "inputmask";

export default {
  name: 'my-pattern-input',

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  watch: {
    modelValue(newVal) {
      // Поддерживаем реактивность при внешнем изменении значения
      if (this.$refs.ipInput && this.$refs.ipInput.value !== newVal) {
        this.$refs.ipInput.value = newVal;
      }
    }
  },

  mounted() {
    const im = new Inputmask({
      alias: 'ip',
      greedy: false,
      clearIncomplete: true,
      oncomplete: () => {
        this.$emit('update:modelValue', this.$refs.ipInput.value);
      },
      onincomplete: () => {
        this.$emit('update:modelValue', this.$refs.ipInput.value);
      },
      oncleared: () => {
        this.$emit('update:modelValue', '');
      }
    });

    im.mask(this.$refs.ipInput);

    // Инициализировать значение
    this.$refs.ipInput.value = this.modelValue;

    // Обновление вручную
    this.$refs.ipInput.addEventListener('input', () => {
      this.$emit('update:modelValue', this.$refs.ipInput.value);
    });
  }
};
</script>

<style scoped>
.input {
  width: 95%;
  padding: 12px 16px;
  font-size: 16px;
  color: #111827;
  background-color: white;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  margin-bottom: 14px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.input:hover {
  border-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.2);
}
</style>