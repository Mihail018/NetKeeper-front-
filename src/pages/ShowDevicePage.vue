<template>
  <div>
    <Table
      :data="tableData"
      :showAddButton="true"
      @add="showInputChoiseDialog"
      v-model:searchQuery="searchQuery"
    />

    <my-dialog v-model:show="chooseInputVisible">
      <input-choise-form @create="handleChoice" />
    </my-dialog>

    <my-dialog v-model:show="manualInputVisible">
      <manual-input-form :submit-text="'Подтвердить'" @create="createDevice" />
    </my-dialog>

    <div v-intersection="loadMoreDevices"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ShowDevicePage",
  
  data() {
    return {
      chooseInputVisible: false,
      manualInputVisible: false,
      tableData: [],

      page: 0,
      limit: 10,
      isLoading: false,
      allPagesLoaded: false,
    };
  },

  mounted() {
    this.fetchDeviceData();
  },

  methods: {
    async fetchDeviceData() {
      try {
        const response = await axios.get('/api/device/data', {
          params: {
            page: this.page,
            limit: this.limit
          }
        })
        
        this.tableData = response.data;
        console.log(this.tableData);
        this.page += 1;
        this.isLoading = true;
      } 
      catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },

    async loadMoreDevices() {
      try {
        if (!this.isLoading || this.allPagesLoaded) return;

        const response = await axios.get('/api/device/data', {
          params: {
            page: this.page,
            limit: this.limit
          }
        })

        console.log("page = " + this.page + "\tlimit = " + this.limit);
        console.log(response.data);

        if (response.data.length >= this.limit) this.page += 1;
        else 
        {
          console.log("Все данные загружены!");
          this.allPagesLoaded = true;
        }

        this.tableData = [...this.tableData, ...response.data];

        // Вызываем функцию рекурсивно в случае, если поиск не находит нужное количество элементов
        const filteredCount = this.filteredDataLength;
        if (this.searchQuery && filteredCount < this.limit && !this.allPagesLoaded) this.loadMoreDevices();
      }
      catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },

    showInputChoiseDialog() {
      this.chooseInputVisible = true;
    },

    handleChoice(type) {
      this.chooseInputVisible = false;
      if (type === 'manual') {
        this.manualInputVisible = true;
      } else if (type === 'auto') {
        this.$router.push('/autoAdd');
      }
    },

    async createDevice(device) {
      try {
        await axios.post('/api/device/save', device);
        this.resetData();
        this.manualInputVisible = false;
      } 
      catch (error) {
        console.error("Ошибка при сохранении устройства:", error);
      }
    },

    // Для корректного отображения при добавлении элемента
    async resetData() {
      this.tableData = [],
      this.allPagesLoaded = false;
      this.page = 0;
      this.isLoading = false;

      await this.fetchDeviceData();
    }
  },

  computed: {
    filteredDataLength() {
      const query = this.searchQuery?.toLowerCase() ?? '';
      return this.tableData.filter(item => item.name.toLowerCase().includes(query)).length;
    }
  }
};
</script>

<style scoped>

</style>