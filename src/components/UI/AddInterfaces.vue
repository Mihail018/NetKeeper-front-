<template>
    <div class="interfaces-form">
      <h1>Интерфейсы устройства</h1>
      <p class="description" v-show="interfaces.length > 0">
        Введите наименование, MAC-адрес, оперативный статус, максимальный размер пакета, входящий и исходящий трафик (в байтах)
      </p>
  
      <div class="interfaces-list">
        <div class="interface-group" v-for="(iface, index) in interfaces" :key="index">
            <div class="interface-header">
                <h3>Интерфейс №{{ index + 1 }}</h3>
                <my-button class="remove-btn" @click="removeInterface(index)">Удалить</my-button>
            </div>
        
          <div class="form-row">
            <my-input v-model="iface.name" placeholder="Наименование..." />
            <my-pattern-input v-model="iface.macAddress" placeholder="__:__:__:__:__:__" maskType="mac" />
            <my-select v-model="iface.operStatus" type="number" min="0" max="10" placeholder="Оперативный статус..." :options="operStatuses" />
            <my-input v-model="iface.maxPacketSize" type="number" placeholder="Макс. размер пакета (байт)..." />
            <my-input v-model="iface.incomingTrafficVolume" type="number" placeholder="Входящий трафик (байт)..." />
            <my-input v-model="iface.outcomingTrafficVolume" type="number" placeholder="Исходящий трафик (байт)..." />
          </div>
        </div>
      </div>
  
      <div class="form-actions">
        <my-button @click="addInterface">Добавить интерфейс</my-button>
        <my-button @click="$emit('save', interfaces)">Сохранить</my-button>
        <my-button @click="resetForm">Очистить</my-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'add-interfaces-form',
    props: {
      initialInterfaces: {
        type: Array,
        default: () => []
      }
    },
    
    data() {
      return {
        interfaces: JSON.parse(JSON.stringify(this.initialInterfaces)), // глубокая копия

        operStatuses: [
            { value: 1, label: 'up(1)', title: 'Интерфейс активен' },
            { value: 2, label: 'down(2)', title: 'Интерфейс не активен' },
            { value: 3, label: 'testing(3)', title: 'Интерфейс проходит диагностику' },
            { value: 4, label: 'unknown(4)', title: 'Состояние неизвестно' },
            { value: 5, label: 'dormant(5)', title: 'Интерфейс ожидает внешних событий для активации' },
            { value: 6, label: 'notPresent(6)', title: 'Интерфейс не установлен физически или отключен на уровне оборудования' },
            { value: 7, label: 'lowerLayerDown(7)', title: 'Один из нижележащих интерфейсов отключен' }
        ]
      };
    },

    methods: {
      addInterface() {
        this.interfaces.push({
          name: '',
          macAddress: '',
          operStatus: 1,
          maxPacketSize: null,
          incomingTrafficVolume: null,
          outcomingTrafficVolume: null
        });
      },

      resetForm() {
        this.interfaces = [];
      },

      removeInterface(index) {
        this.interfaces.splice(index, 1);
      },
    }
  }
  </script>
  
  <style scoped>
  .interfaces-form {
    max-height: 75vh;
    overflow-y: auto;
    padding-right: 10px;
    }

    h1 {
        text-align: center;
    }

    h3 {
        margin-top: 20px;
    }

    .form-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 10px;
        align-items: center;
    }

    .form-row > * {
        flex: 1;
        min-width: 200px; /* гарантирует минимальную ширину */
    }

    .interface-group {
        padding-bottom: 15px;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }

    .description {
        text-align: center;
        font-size: 18px;
        color: black;
        font-weight: bold;
        margin-bottom: 20px;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

    .interface-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .remove-btn {
        color: white;
        background-color: black;
        border: 2px solid black;
    }

    .remove-btn:hover {
        background-color: black;
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        border-color: black;
    }
  </style>  