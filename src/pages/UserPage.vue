<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2>Личный кабинет</h2>

      <div class="user-info">
        <UserWidget class="user-icon" />
      </div>

      <div class="user-details">
        <p><strong>Имя пользователя:</strong> {{ username }}</p>
        <p><strong>Количество устройств:</strong> {{ deviceCount }}</p>
      </div>

      <div class="action-buttons">
        <my-button @click="changeUsername">Сменить логин</my-button>
        <my-button @click="changePassword">Сменить пароль</my-button>
        <my-button @click="deleteAccount" class="danger">Удалить аккаунт</my-button>
      </div>
    </div>

    <my-dialog v-model:show="loginDialogVisible">
      <change-login  @submit="handleUsernameChange" />
    </my-dialog>

    <my-dialog v-model:show="oldPasswordDialogVisible">
      <old-password  @submit="handleOldPassword" />
    </my-dialog>

    <my-dialog v-model:show="passwordDialogVisible">
      <change-password  @submit="handleNewPassword" />
    </my-dialog>

    <my-dialog v-model:show="deleteDialogVisible">
      <delete-user @confirm="handleDeleteAccount" @close="this.deleteDialogVisible = false" />
    </my-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      deviceCount: 0,

      loginDialogVisible: false,
      oldPasswordDialogVisible: false,
      passwordDialogVisible: false,
      deleteDialogVisible: false
    };
  },

  async mounted() {
    try {
      const response = await axios.get('/api/user/getProfileData');
      this.username = response.data.username;
      this.deviceCount = response.data.deviceCount;
    } 
    catch (error) 
    {
      alert('Ошибка при получении данных пользователя');
    }
  },

  methods: {
    changeUsername() {
      this.loginDialogVisible = true;
    },

    async handleUsernameChange(newUsername) {
        try {
            await axios.post('/api/user/updateUsername', null, {
                params: {
                    username: newUsername
                }
            }),
            alert('Имя пользователя успешно обновлено!');
            this.username = newUsername;
            this.loginDialogVisible = false;
        } 
        catch (error) {
            alert(error.response?.data || error.message);
            this.loginDialogVisible = false;
        }
    },

    changePassword() {
      this.oldPasswordDialogVisible = true;
    },

    async handleOldPassword(oldPassword) {
        try {
                const response = await axios.post('/api/user/verifyPassword', oldPassword, {
                headers: {
                    'Content-Type': 'text/plain' // важно для String в @RequestBody
                }
        });

        alert(response.data);
        this.oldPasswordDialogVisible = false;
        this.passwordDialogVisible = true;
        }
        catch (error) {
            alert(error.response?.data || "Ошибка при проверке пароля");
        }
    },

    async handleNewPassword(newPassword) {
        try {
                const response = await axios.post('/api/user/updatePassword', newPassword, {
                headers: {
                    'Content-Type': 'text/plain'
                }
        });

        alert(response.data);
        this.passwordDialogVisible = false;
        }
        catch (error) {
            alert(error.response?.data || "Ошибка при изменении пароля");
        }
    },

    deleteAccount() {
        this.deleteDialogVisible = true;
    },

    async handleDeleteAccount() {
        try {
            await axios.delete('/api/user/delete');
            alert('Аккаунт успешно удален!');
            this.$router.push("/login");
        }
        catch (error) {
            alert(error.response?.data || 'Ошибка при удалении аккаунта');
        }
    }
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.profile-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card h2 {
  text-align: center;
  font-size: 28px;
  margin: 0;
  color: #333;
}

.user-info {
  display: flex;
  justify-content: center;
}

.user-icon {
  width: 60px;
  height: 60px;
}

.user-details {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-details p {
  margin: 0;
  font-size: 18px;
  color: #444;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.danger {
  background-color: #FF0000 !important;
  color: white !important;
  border-color: #FF0000 !important;
}

.danger:hover {
  background-color :#8B0000 !important;
  border-color: #8B0000 !important;
}
</style>