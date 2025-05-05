<template>
    <select
      :value="modelValue"
      @change="updateSelect"
      class="select"
    >
      <option disabled value="">Выберите значение</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :title="option.title"
      >
        {{ option.label }}
      </option>
    </select>
  </template>
  
  <script>
  export default {
    name: 'my-select',
    props: {
      modelValue: [String, Number],
      options: {
        type: Array,
        required: true
      }
    },
    methods: {
      updateSelect(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  }
  </script>
  
  <style scoped>
  .select {
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

    .select:hover {
    border-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    }

    .select:focus {
    outline: none;
    border-color: #1d4ed8;
    box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.2);
    }
    </style>