<template>
  <div>
    <div class="search-container">
      <div class="search-input-wrapper">
        <transition name="slide-fade">
          <my-input v-model="searchQuery" placeholder="Поиск..." style="width: 98%;" v-show="isSearched" @update:modelValue="$emit('update:searchQuery', $event)"></my-input>
        </transition>
      </div>

      <div class="search-button-wrapper">
        <button 
        class="search-button" 
        @click="changeSearch"
        :title="isSearched ? 'Скрыть панель поиска' : 'Добавить панель поиска'">
        <SearchIcon v-show="!isSearched" /> <HideSearchIcon v-show="isSearched" />
        </button>
      </div>
    </div>

    <my-button v-if="showAddButton" @click="$emit('add')">Добавить устройство</my-button>
    <h1>Список телекоммуникационного оборудования</h1>
    <table class="table" v-if="filteredData.length > 0">
      <thead>
        <tr>
          <th>Наименование ТКО</th>
          <th>IP-адрес</th>
          <th>Дата создания</th>
          <th>Время работы устройства</th>
          <th>Местоположение</th>
          <th>Количество интерфейсов</th>
          <th>Оперативная память</th>
          <th v-if="showActions">Действие</th>
          <th v-if="showMoreDetails">Интерфейсы</th>
          <th v-if="showMoreDetails">Процессор</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td title="Наименование">{{ item.name }}</td>
          <td title="IP-адрес">{{ item.ipAddress }}</td>
          <td title="Дата создания">{{ item.creationDate }}</td>
          <td title="Дата ввода в эксплуатацию">{{ item.commissionDate }}</td>
          <td title="Местоположение">{{ item.location }}</td>
          <td title="Количество интерфейсов">{{ item.interfacesValue }}</td>
          <td title="Оперативная память">{{ item.memoryRAM }} Кб</td>
          <td v-if="showActions">
            <my-button v-if="actionType === 'edit'" @click="$emit('edit', item)">Редактировать</my-button>
            <my-button v-else-if="actionType === 'delete'" @click="$emit('delete', item.id)">Удалить</my-button>
          </td>
          <td v-if="showMoreDetails"><my-button @click="$emit('viewInterfaces', item)">Подробности</my-button></td>
          <td v-if="showMoreDetails"><my-button @click="$emit('viewCpuData', item)">Подробности</my-button></td>
        </tr>
      </tbody>
    </table>

    <div v-else style="color: red;"><strong>Нет элементов в таблице</strong></div>
  </div>
</template>

<script>
export default {
  name: 'Table',

  props: {
    data: Array,
    showAddButton: Boolean,
    showMoreDetails: Boolean,
    actionType: String,
    // Связываем поиск с родительскими окнами для корректной подгрузки данных
    searchQuery: String,
  },
  emits: ['update:searchQuery'],

  data() {
    return {
      searchQuery: '',
      isSearched: true
    };
  },

  computed: {
    showActions() {
      return this.actionType === 'edit' || this.actionType === 'delete';
    },

    filteredData() {
      return this.data.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },

  methods: {
    changeSearch() {
      this.isSearched = !this.isSearched;
      this.searchQuery = '';
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.table thead th {
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  padding: 16px;
  border: 1px solid #d1d5db;
}

.table tbody tr {
  background-color: #ffffff;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #e5e7eb;
}

.table tbody tr:hover {
  background-color: #f9fafb;
}

.table td {
  color: #111827;
  font-size: 15px;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
}

.table td:hover {
  cursor: pointer;
}

.table td:last-child {
  text-align: right;
}

.table tr:last-child {
  border-bottom: 2px solid #d1d5db;
}

@media (max-width: 768px) {
  .table td,
  .table th {
    font-size: 13px;
    padding: 10px;
  }
}

/* Стили для кнопки поиска */
.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
  margin-top: 20px;
}

.search-input-wrapper {
  flex-grow: 1; /* поле растягивается */
}

.search-button-wrapper {
  flex-shrink: 0;
}

.search-container .input {
  margin-bottom: 0;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  padding: 0;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
}

/* Анимация появления поиска */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-100%); /* полностью из-за левого края */
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%); /* уходит обратно за экран */
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.table tbody tr {
  animation: fadeSlideIn 0.4s ease forwards;
}
</style>
