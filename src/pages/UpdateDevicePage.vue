<template>
  <div>
    <Table
      :data="tableData"
      actionType="edit"
      @edit="openUpdateForm"
      v-model:searchQuery="searchQuery"
    />

    <my-dialog v-model:show="updateFormVisible">
      <manual-input-form
        :initial-data="selectedItem"
        :submit-text="'Сохранить'"
        @create="updateDevice"
        :interfacesButtonText="'Редактировать интерфейсы'"
        :cpuButtonText="'Редактировать процессор'"
      />
    </my-dialog>

    <div v-intersection="loadMoreDevices"></div>
  </div>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    name: "UpdateDevicePage",

    data() {
      return {
        updateFormVisible: false,
        selectedItem: null,
        tableData: [],

        page: 0,
        limit: 10,
        isLoading: false,
        allPagesLoaded: false
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

      openUpdateForm(item) {
        this.selectedItem = {...item};
        this.updateFormVisible = true;
      },

      async updateDevice(device) {
        try {
          await axios.put(`/api/device/update/${device.id}`, device);
          const index = this.tableData.findIndex(d => d.id === device.id);
          if (index !== -1) {
            this.tableData[index] = { ...device };
          }
          this.updateFormVisible = false;
          this.selectedItem = null;
        }
        catch (error) {
          console.error("Ошибка при обновлении данных устройства:", error);
        }
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