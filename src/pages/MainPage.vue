<template>
  <div class="home-page">
    <div class="about-container">
      <h1>NetKeeper</h1>
      <p>
        Добро пожаловать в систему <strong>NetKeeper</strong> — решение для точного и удобного учёта телекоммуникационного оборудования сетей связи.
      </p>
      <p>
        В условиях стремительного развития информационных технологий важно не теряться в массивах оборудования, разбросанного по различным локациям. Наше приложение упрощает задачу: вы получаете централизованный доступ к данным об устройствах, их характеристиках и расположении.
      </p>
      <p>
        В отличие от систем управления сетями, <strong>NetKeeper</strong> не вмешивается в процессы функционирования оборудования. Его цель — <em>отражать состояние инфраструктуры</em>, делая информацию прозрачной и доступной для анализа.
      </p>
      <p>
        Проект разработан в рамках дипломной работы под названием <strong>«Разработка программного обеспечения по учету телекоммуникационного оборудования сетей связи»</strong> и ориентирован на использование в организациях, где критически важна инвентаризация и контроль над сетевой структурой.
      </p>
      <div class="inline-info">
        <p>Для более подробной информации, смотрите вкладку:</p>
        <my-button @click="this.$router.push('/about')">О нас</my-button>
      </div>
    </div>
  </div>
</template>
  
  <script>

  export default {
     
    }
  </script>
  
  <style scoped>
  .about-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #022236;
  line-height: 1.8;
  font-size: 16px;
}

.about-container h1 {
  font-size: 36px;
  color: #022236;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #022236;
  padding-bottom: 10px;
}


.about-container strong {
  color: #01476e;
}

.about-container em {
  font-style: italic;
  color: #555;
}

.inline-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.inline-info p {
  margin: 0;
  padding: 0;
}

.home-page {
  max-width: 900px;
  margin: 60px auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #022236;
  background-color: #f4f8fb;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
  </style>