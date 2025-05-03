<template>
    <div v-if="!scanComplete" style="margin-top: 20px; font-weight: bold;">
      Сканирование сети!
    </div>

    <div v-else style="margin-top: 20px; color: green; font-weight: bold;">
      Сканирование завершено!
    </div> <br>

    <div style="display: flex; flex-direction: row; gap: 20px; font-weight: bold; align-items: center;">

      <div v-show="!scanComplete">
      Текущий адрес: {{ currentIp }}
      </div>
      
    </div>
    
    <div>
      <Table
        :data="tableData"
        :showAddButton="false" 
        actionType=""
      />

      <div style="display: flex; flex-direction: row; gap: 20px; align-items: center; margin-top: 20px;">
        <my-button v-show="!scanComplete" @click="stopScanning">Остановить сканирование</my-button>
        <my-button v-show="scanComplete" @click="initScan">Начать сканирование заново</my-button>
        <my-button v-show="scanComplete" @click="() => showDialog({
        message: 'Вы уверены, что хотите добавить найденные устройства в вашу таблицу?',
        onConfirm: addToDB
        })">Добавить к базе данных</my-button>
        <my-button v-show="scanComplete" @click="() => showDialog({
        message: 'Данное действие перезапишет текущие данные. Продолжить?',
        onConfirm: rewriteData
      })">Перезаписать</my-button>
      </div>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <message-box
        :message="dialogOptions.message"
        :onConfirm="dialogOptions.onConfirm"
        :onCancel="dialogOptions.onCancel"
        :confirmBtnMessage="dialogOptions.confirmBtnMessage"
        :cancelBtnMessage="dialogOptions.cancelBtnMessage"
      />
    </my-dialog>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    name: "data-table",
    data() {
      return {
        tableData: [],
        currentIndex: 0,
        intervalId: null,
        scanComplete: false,
        currentIp: '192.168.0.1',
        dialogVisible: false,
        dialogOptions: {
          message: '',
          onConfirm: () => {},
          onCancel: () => {},
          confirmBtnMessage: 'Да',
          cancelBtnMessage: 'Нет'
        }
      };
    },

    mounted() {
      window.addEventListener("beforeunload", this.handleBeforeUnload);

      this.initScan();
    },

    methods: {
      async startDeviceScan() {
        try {
          await axios.get('api/device/autoInput');
        }
        catch (error) {
          console.error("Ошибка сканирования сети:", error);
        }
      },

      pollCurrentIp() {
        setInterval(async () => {
          if (this.scanComplete) return;

          try {
            const response = await axios.get('/api/device/currentIp');
            this.currentIp = response.data;
            console.log(this.currentIp);

            if ((this.currentIp || '').trim() === '0.0.0.0') {
              const scanningStatus = await axios.get("/api/device/getScanningStatus");
              if (!scanningStatus.data) {
                this.scanComplete = true;
                this.deduplicateDevices();
              }
            }
          } 
          catch (error) {
            console.error("Ошибка получения текущего IP:", error);
          }
        }, 500);
      },

      pollCurrentDevices() {
        this.intervalId = setInterval(async () => {
          if (this.scanComplete) return;

          try {
            const response = await axios.get('/api/device/currentDevices');
            const newDevices = response.data;
            console.log(newDevices);

            // Добавляем все, которых ещё нет в tableData
            newDevices.forEach(device => {
              const exists = this.tableData.some(d => d.id === device.id);
              if (!exists) {
                this.tableData.push(device);
              }
            });
          } 
          catch (error) {
            console.error("Ошибка при получении новых устройств:", error);
          }
        }, 500);
      },

      handleBeforeUnload(event) {
        clearInterval(this.intervalId);
        this.scanComplete = true;
        this.deduplicateDevices();

        // Останавливаем сканирование
        navigator.sendBeacon('/api/device/stopScanning');
      },

      stopScanning() {
        clearInterval(this.intervalId);
        this.scanComplete = true;
        this.deduplicateDevices();
        axios.post('/api/device/stopScanning')
        .then(() => console.log('Сканирование остановлено'))
        .catch(err => console.error('Ошибка остановки сканирования', err));
      },

      initScan() {
        this.tableData = [],
        this.currentIp = this.ipStart;
        this.scanComplete = false;

        this.startDeviceScan();
        this.pollCurrentDevices();
        this.pollCurrentIp();
      },

      showDialog({ message, onConfirm, onCancel, confirmBtnMessage = 'Да', cancelBtnMessage = 'Нет' }) {
        this.dialogOptions = {
          message,

          onConfirm: () => {
            this.dialogVisible = false;
            onConfirm?.(); // вызываем, если передан
          },

          onCancel: () => {
            this.dialogVisible = false;
            onCancel?.(); // Аналогично
          },

          confirmBtnMessage,
          cancelBtnMessage
        };

        this.dialogVisible = true;
      },

      async addToDB() {
        try {
          await axios.post('/api/device/addToDB', this.tableData);
        }
        catch (error) {
          console.error("Ошибка при получении новых устройств в базу данных: ", error);
        }

        this.showDialog({
          message: 'Операция успешно завершена!',
          onConfirm: () => this.$router.push('/'),
          onCancel: () => this.$router.push('/data'),
          confirmBtnMessage: 'На главную',
          cancelBtnMessage: 'К таблице'
        });
      },

      async rewriteData() {
        try {
          await axios.delete('/api/device/cleanTable');
          await this.addToDB();
        }
        catch (error) {
            console.error("Ошибка при перезаписи таблицы: ", error);
        }
      },

      deduplicateDevices() {
        console.log("deduplicate вызван");

        const seenNames = new Set();
        const result = [];

        for (let i = this.tableData.length - 1; i >= 0; i--) {
          const device = this.tableData[i];
          const nameKey = device.name?.trim()?.toLowerCase(); // безопасное имя

          if (!nameKey) continue; // Если имя отсутствует, пропускаем

          if (!seenNames.has(nameKey)) {
            seenNames.add(nameKey);
            result.push(device);
          }
        }

        this.tableData = result.reverse();
      }
    },

    beforeUnmount() {
      window.removeEventListener("beforeunload", this.handleBeforeUnload);

      this.stopScanning();
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  