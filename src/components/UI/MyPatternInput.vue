<template>
  <input
    ref="input"
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
    },
    maskType: {
      type: String,
      default: 'ip', // 'ip' или 'mac'
      validator: value => ['ip', 'mac'].includes(value)
    }
  },

  mounted() {
    this.applyMask(); // установить маску при монтировании
    this.$refs.input.value = this.modelValue;

    this.$refs.input.addEventListener('input', () => {
      this.$emit('update:modelValue', this.$refs.input.value);
    });
  },

  watch: {
    modelValue(newVal) {
      if (this.$refs.input && this.$refs.input.value !== newVal) {
        this.$refs.input.value = newVal;
      }
    }
  },

  methods: {
    applyMask() {
      let options = {};

      if (this.maskType === 'ip') {
        options = {
          alias: 'ip',
          greedy: false,
          clearIncomplete: true
        };
      } else if (this.maskType === 'mac') {
        options = {
          mask: "**:**:**:**:**:**",
          definitions: {
            '*': {
              validator: "[0-9A-Fa-f]",
              casing: "upper"
            }
          },
          placeholder: "_",
          clearIncomplete: true
        };
      }

      const im = new Inputmask({
        ...options,
        oncomplete: () => this.$emit('update:modelValue', this.$refs.input.value),
        onincomplete: () => this.$emit('update:modelValue', this.$refs.input.value),
        oncleared: () => this.$emit('update:modelValue', '')
      });

      im.mask(this.$refs.input);
    }
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