<template>
    <form @submit.prevent ref="manualInputForm">
      <h1>Введите характеристики ТКО:</h1>

    <div class="form-group">
      <label>Наименование ТКО:</label>
      <my-input v-model="localData.name" placeholder="Наименование ТКО..." required />
    </div>

    <div class="form-group">
      <label>IP-адрес ТКО:</label>
      <my-pattern-input v-model="localData.ipAddress" placeholder="_._._._" maskType="ip" required />
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
      <my-input v-model="localData.memoryRAM" required type="number" min="0" step="1" max="1073741824" placeholder="Оперативная память ТКО (максимум 1 ТБ)..." />
    </div>

    <div class="form-actions">
      <my-button @click="showInterfacesForm" class="sub-btn">{{ interfacesButtonText }}</my-button>
      <my-button @click="showCPUDataForm" class="sub-btn">{{ cpuButtonText }}</my-button>
    </div>

    <div class="form-actions">
      <my-button @click="submitData">{{ submitText }}</my-button>
      <my-button @click="resetForm">Очистить</my-button>
    </div>
    </form>

    <my-dialog v-model:show="cpuDataFormVisible">
      <add-cpu-data-form :initialCPUData="localData.cpuData" @save="saveCPUData" />
    </my-dialog>

    <my-dialog v-model:show="interfacesFormVisible">
      <add-interfaces-form :initialInterfaces="localData.interfaces" @save="saveInterfaces" />
    </my-dialog>
  </template>
  
  <script>
  import { validateForm } from '@/validator/validateForm';

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
      },

      interfacesButtonText: {
        type: String,
        default: 'Добавить интерфейсы'
      },
      
      cpuButtonText: {
        type: String,
        default: 'Добавить процессор'
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
        interfacesFormVisible: false
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
        if (!validateForm(this.$refs.manualInputForm)) return;

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

      showCPUDataForm() {
        this.cpuDataFormVisible = true;
      },

      saveCPUData(cpuData) {
        this.localData.cpuData = { ...cpuData };
        this.cpuDataFormVisible = false;
      },

      showInterfacesForm() {
        this.interfacesFormVisible = true;
      },

      saveInterfaces(interfaces) {
        this.localData.interfaces = [ ...interfaces ];
        this.interfacesFormVisible = false;
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