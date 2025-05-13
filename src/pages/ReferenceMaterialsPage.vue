<template>
  <div class="reference-page">
    <h1>Справочные материалы по оперативному статусу сетевых интерфейсов</h1>
    <div class="content-box">
      <p><strong>up(1)</strong> — Интерфейс активен</p>
      <p><strong>down(2)</strong> — Интерфейс не активен</p>
      <p><strong>testing(3)</strong> — Интерфейс проходит диагностику</p>
      <p><strong>unknown(4)</strong> — Состояние неизвестно</p>
      <p><strong>dormant(5)</strong> — Интерфейс ожидает внешних событий для активации</p>
      <p><strong>notPresent(6)</strong> — Интерфейс не установлен физически или отключен на уровне оборудования</p>
      <p><strong>lowerLayerDown(7)</strong> — Один из нижележащих интерфейсов отключен</p>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.reference-page {
  max-width: 900px;
  margin: 60px auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #022236;
  background-color: #f4f8fb;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.reference-page h1 {
  font-size: 32px;
  color: #022236;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #022236;
  padding-bottom: 10px;
}

.content-box p {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 16px;
}

.content-box strong {
  color: #01476e;
}
</style>
