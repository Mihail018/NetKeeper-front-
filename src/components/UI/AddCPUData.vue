<template>
    <form @submit.prevent>
      <h1>Введите характеристики процессора:</h1>
      <div class="form-group">
        <label>Количество ядер процессора:</label>
        <my-input v-model="cpuData.coreCount" type="number" placeholder="Количество ядер процессора..." min="1" step="1" max="1024" />
      </div>

      <div class="form-group">
        <label>Загруженность процессора (в %):</label>
        <my-input v-model="cpuData.loadPercent" type="number" placeholder="Загруженность процессора (в %)..." min="1" step="1" max="100" />
      </div>

      <div class="form-actions">
        <my-button @click="$emit('save', cpuData)">Сохранить</my-button>
        <my-button @click="resetForm">Сбросить</my-button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    name: 'add-cpu-data-form',

    props: {
      initialCPUData: {
        type: Object,
        default: () => ({ coreCount: null, loadPercent: null })
      }
    },

    data() {
      return {
        cpuData: { ...this.initialCPUData }
      }
    },

    methods: {
      resetForm() {
        this.cpuData = { coreCount: null, loadPercent: null };
      }
    }
  }
  </script>
  
  <style scoped>
  .form-actions {
      display: flex;
      gap: 10px;
    }

  h1 {
    text-align: center;
  }

  label {
    font-weight: bold;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    min-width: 45vw;
  }
  </style>