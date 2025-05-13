<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
   <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>NetKeeper</h3>
        <p>Система учета телекоммуникационного оборудования. Обеспечивает безопасность и контроль.</p>
      </div>

      <div class="footer-section">
        <h4>Навигация</h4>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/data">Устройства</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li><router-link to="/referenceMaterials">Справка</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Контакты</h4>
        <p>Email: support@netkeeper.ru</p>
        <p>Телефон: +7 (913) 506-84-09</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 NetKeeper. Все права защищены.</p>
    </div>
  </footer>
</template>
<script>

</script>

<style>
.app {
  min-height: calc(100vh - 200px); /* Чтобы содержимое не залезало на футер */
  padding-bottom: 60px;
}

/* footer */
.site-footer {
  background-color: #022236;
  color: #fff;
  padding: 40px 20px 20px;
  font-family: Arial, sans-serif;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1 1 250px;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 12px;
  color: #ffffff;
}

.footer-section p,
.footer-section ul {
  font-size: 14px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #bbb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #fff;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #444;
  font-size: 13px;
  color: #aaa;
}

</style>
