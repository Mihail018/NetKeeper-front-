<template>
    <form @submit.prevent>
      <h1>Введите характеристики ТКО:</h1>

    <div class="form-group">
      <label>Наименование ТКО:</label>
      <my-input v-model="localData.name" placeholder="Наименование ТКО..." />
    </div>

    <div class="form-group">
      <label>IP-адрес ТКО:</label>
      <my-pattern-input v-model="localData.ipAddress" placeholder="_._._._"  />
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
      <label>Оперативная память ТКО (в кб):</label>
      <my-input v-model="localData.memoryRAM" type="number" min="1" step="1" placeholder="Оперативная память ТКО..." />
    </div>

    <div class="form-actions">
      <my-button class="sub-btn">Добавить интерфейсы</my-button>
      <my-button @click="chooseCPUDataForm" class="sub-btn">Добавить процессор</my-button>
    </div>

    <div class="form-actions">
      <my-button @click="submitData">{{ submitText }}</my-button>
      <my-button @click="resetForm">Очистить</my-button>
    </div>
    </form>

    <my-dialog v-model:show="cpuDataFormVisible">
      <add-cpu-data-form :initialCPUData="localData.cpuData" @save="saveCPUData"/>
    </my-dialog>
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
          ipAddress: '',
          creationDate: '',
          commissionDate: '',
          location: '',
          interfacesValue: null,
          memoryRAM: null,
          interfaces: [],
          cpuData: null
        },

        cpuDataFormVisible: false,
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
        this.localData.interfacesValue = this.localData.interfaces.length;
        this.$emit('create', { ...this.localData });
      },

      resetForm() {
        this.localData = {
          id: this.localData.id,
          ipAddress: '',
          name: '',
          creationDate: '',
          commissionDate: '',
          location: '',
          interfacesValue: null,
          memoryRAM: null,
          interfaces: [],
          cpuData: null,
        };
      },

      chooseCPUDataForm() {
        this.cpuDataFormVisible = true;
      },

      saveCPUData(cpuData) {
        this.localData.cpuData = { ...cpuData };
        this.cpuDataFormVisible = false;
        console.log(this.localData.cpuData);
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
    cursor: pointer;
  }

  .sub-btn {
    color: white;
    background-color: black;
    border: 2px solid black;
  }

  .sub-btn:hover {
    background-color: black;
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border-color: black;
  }
  </style>