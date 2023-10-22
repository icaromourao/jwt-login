<template>
  <div class="login-container">
    <div class="login-content">

      <div class="login-image">
        <img src="@/assets/images/login/banner-image.jpg" alt="login-banner-image">
      </div>

      <form class="login-form-container">
        <div class="login-form-content">
          <div class="mb-4">
            <h3 class="login-form-title mb-1">Bem-vindo</h3>

            <p class="login-form-subtitle normal-text">
              Bem-vindo! Informe as suas credenciais para entrar.
            </p>
          </div>

          <div class="login-form-label-container mb-3">
            <label for="username">
              <span class="input-text-label">Nome de usuário</span>
              <input
                type="text"
                id="username"
                placeholder="Digite seu nome de usuário"
                v-model="formData.username"
                class="input-text">
            </label>
          </div>

          <div class="login-form-label-container mb-2">
            <label for="password" class="login-form-label">
              <span class="input-text-label">Senha</span>
              <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              v-model="formData.password"
              class="input-text">
            </label>
          </div>

          <div class="login-form-input-row-3 mb-3">
            <div class="login-form-label-container">
              <label for="remember" class="login-form-checkbox-label">
                <input
                  type="checkbox"
                  v-model="formData.remember"
                  id="remember"
                  class="input-checkbox">
                <span class="input-checkbox-label">Lembrar por 7 dias</span>
              </label>
            </div>

            <p class="login-form-forgot-pass">Esqueci minha senha</p>
          </div>

          <button class="button mb-2 fill-container" @click.prevent="login">Entrar</button>

          <AppLoader v-if="isRequesting" />

          <span
            class="small-text error-text text-center"
            v-if="errorMessage">
            {{ errorMessage }}
          </span>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      formData: {
        username: '',
        password: '',
        remember: false,
      },
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters(['getIsRequesting']),
    isRequesting() {
      return this.getIsRequesting;
    },
  },
  methods: {
    ...mapActions(['loginAction']),
    login() {
      this.errorMessage = '';

      if (this.formData.username === '' || this.formData.password === '') {
        this.errorMessage = 'Preencha todos os campos';
        return;
      }

      this.loginAction({
        ...this.formData,
      }).then(() => {
        this.$router.go('/');
      }).catch((error) => {
        if (error.status === 400) {
          this.errorMessage = 'Usuário ou senha inválida';
        } else if (error.status === 500) {
          this.errorMessage = 'Erro desconhecido. Entre em contato conosco.';
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  .login-content {
    display: flex;
    width: 100%;
    .login-image {
      width: 47%;
      img {
        max-width: 100%;
        height: 100vh;
        object-fit: cover;
        object-position: top;
      }
    }
    .login-form-container {
      width: 53%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $white;
      .login-form-content {
        max-width: 400px;
        .login-form-title {
          text-align: left;
        }
        .login-form-subtitle {
          color: $gray60;
          margin: 0;
        }
        .login-form-input-row-3 {
          display: flex;
          justify-content: space-between;
          .login-form-checkbox-label {
            cursor: pointer;
          }
          .login-form-forgot-pass {
            font-size: 14px;
            font-weight: normal;
            text-align: center;
            cursor: pointer;
            text-decoration: underline;
            margin: 0;
          }
        }
        .login-form-button {
          margin-bottom: 26px;
        }
      }
    }
  }
}
</style>
