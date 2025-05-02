<template>
    <div>
      <!-- <my-dialog v-model:show="chooseInputVisible">
        <input-choise-form @create="handleChoice" />
      </my-dialog>
  
      <my-dialog v-model:show="manualInputVisible" >
        <manual-input-form @create="createDevice" />
      </my-dialog> -->
    </div>
  </template>
  
  <script>
  // import axios from 'axios';

  export default {
      // data() {
      //   return {
      //     chooseInputVisible: false,
      //     manualInputVisible: false
      //   }
      // },
  
      // methods: {
      //   showInputChoiseDialog() {
      //     this.chooseInputVisible = true;
      //   },
  
      //     handleChoice(type) {
      //     this.chooseInputVisible = false;
  
      //     if (type === 'manual') {
      //       this.manualInputVisible = true;
      //     }
      //     else if (type === 'auto') {
      //       this.$router.push('/autoAdd');
      //     }
      //   },

      //   async createDevice(device) {
      //     try {
      //       const response = await axios.post('/api/device/save', device);
      //       this.tableData.push(response.data);
      //       this.manualInputVisible = false;
      //     } 
      //     catch (error) {
      //       console.error("Ошибка при сохранении устройства:", error);
      //       this.manualInputVisible = false;
      //     }
      //   }
      // }
    }
  </script>
  
  <style>
  
  </style>