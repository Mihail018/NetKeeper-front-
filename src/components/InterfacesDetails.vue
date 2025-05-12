<template>
    <div class="interfaces-details">
      <h2>Интерфейсы устройства</h2>
  
      <div class="table-wrapper" v-if="interfaces && interfaces.length">
        <table class="table">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>MAC-адрес</th>
              <th>Оперативный статус</th>
              <th>Макс. размер пакета</th>
              <th>Входящий трафик</th>
              <th>Исходящий трафик</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(iface, index) in interfaces" :key="index">
              <td title="Наименование">{{ iface.name }}</td>
              <td title="Mac-адрес">{{ iface.macAddress }}</td>
              <td title="Оперативный статус интерфейса">{{ iface.operStatus }}</td>
              <td title="Максимальный размер пакета (MTU)">{{ iface.maxPacketSize || 0 }} б</td>
              <td title="Объем входящего трафика">{{ iface.incomingTrafficVolume || 0 }} б</td>
              <td title="Объем исходящего трафика">{{ iface.outcomingTrafficVolume || 0 }} б</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-else>
        <p>Нет доступной информации об интерфейсах.</p>
      </div>
    </div>
</template>  

  
<script>
  export default {
    name: "interfaces-details",
    props: {
      interfaces: {
        type: Array,
        default: () => []
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

.interfaces-details {
  padding: 1rem;
}

/* Ограничиваем высоту и добавляем скролл */
.table-wrapper {
  max-height: 400px;
  overflow-y: auto;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
</style>