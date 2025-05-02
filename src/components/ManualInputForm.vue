<template>
    <form @submit.prevent>
      <h1>Введите характеристики ТКО:</h1>

    <div class="form-group">
      <label>Наименование ТКО:</label>
      <my-input v-model="localData.name" placeholder="Наименование ТКО..." />
    </div>

    <div class="form-group">
      <label>Дата создания ТКО:</label>
      <my-input v-model="localData.creationDate" type="date" class="date-input" />
    </div>

    <div class="form-group">
      <label>Дата ввода в эксплуатацию ТКО:</label>
      <my-input v-model="localData.commissionDate" type="date" class="date-input" />
    </div>

    <div class="form-group">
      <label>Местоположение ТКО:</label>
      <my-input v-model="localData.location" placeholder="Местоположение ТКО..." />
    </div>

    <div class="form-group">
      <label>Количество интерфейсов ТКО:</label>
      <my-input v-model="localData.interfacesValue" placeholder="Количество интерфейсов ТКО..." />
    </div>

    <div class="form-group">
      <label>Оперативная память ТКО (в кб):</label>
      <my-input v-model="localData.memoryRAM" type="number" min="1" step="1" placeholder="Оперативная память ТКО..." />
    </div>

    <div class="form-actions">
      <my-button @click="submitData">{{ submitText }}</my-button>
      <my-button @click="resetForm">Очистить</my-button>
    </div>
    </form>
  </template>
  
  <script>

  export default {
    name: 'manual-input-form',

    props: {
    initialData: {
        type: Object,
        default: () => ({})
      },

      submitText: {
        type: String,
        default: 'Отправить'
      }
    },

    data() {
        return {
        localData: {
          id: null,
          name: '',
          creationDate: '',
          commissionDate: '',
          location: '',
          interfacesValue: null,
          memoryRAM: null
        }
      };
    },

    mounted() {
        // Инициализация формы при открытии (например, для редактирования)
        if (this.initialData && Object.keys(this.initialData).length > 0) {
        this.localData = { ...this.initialData };
      }
    },
  
    methods: {
      submitData() {
        this.$emit('create', { ...this.localData });
      },

      resetForm() {
        this.localData = {
          id: this.localData.id,
          name: '',
          creationDate: '',
          commissionDate: '',
          location: '',
          interfacesValue: null,
          memoryRAM: null
        };
      }
    }
  }
  </script>
  
  <style scoped>
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

  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .date-input {
    width: 25%;
  }
  </style>