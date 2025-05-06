<template>
    <div class="cpu-details">
      <h2>Информация о процессоре</h2>
  
      <div class="detail-row">
        <span class="label">Количество ядер:</span>
        <span class="value">{{ cpu?.coreCount ?? '_' }}</span>
      </div>
  
      <div class="detail-row">
        <span class="label">Загруженность процессора:</span>
        <span class="value">{{ cpu?.loadPercent ?? '_' }}%</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "cpu-details",
    props: {
      cpu: {
        type: Object,
        default: () => ({})
      }
    }
  };
  </script>
  
  <style scoped>
  .cpu-details {
    padding: 16px;
    font-size: 16px;
    line-height: 1.6;
    color: #1f2937;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #111827;
    font-weight: bold;
  }
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .label {
    font-weight: 600;
  }
  
  .value {
    color: #374151;
  }
  </style>
  