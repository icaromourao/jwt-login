<template>
  <div class="header-container" :class="{ 'search': variant === 'search' }">
    <div class="header-content">
      <div v-if="variant === 'dashboard'" class="header-info">
        <p class="header-info-today-text normal-text">{{ today }}.</p>
        <p class="header-info-welcome-text normal-text">Bem vindo de volta, {{ diplayName }}.</p>
      </div>

      <div v-if="variant === 'search'" class="header-search-container">
        <label for="search">
          <div class="header-search-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 13.5L18.25 18.25M15.25 8.5C15.25 12.2279 12.2279 15.25 8.5
              15.25C4.77208 15.25 1.75 12.2279 1.75 8.5C1.75 4.77208 4.77208 1.75 8.5
              1.75C12.2279 1.75 15.25 4.77208 15.25 8.5Z" stroke="#6C757D" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            id="search"
            placeholder="Pesquisa..."
            v-model="searchData"
            class="input-text">
        </label>
      </div>

      <div
        class="header-profile-container"
        tabindex="0"
        ref="profileContainer"
        @blur="hideProfileMenu()">
        <div
          @click="toggleProfileMenu()"
          @keypress="toggleProfileMenu()"
          class="header-profile d-flex">
          <div class="header-profile-circle">{{ getInitialsName(diplayName) }}</div>
          <div class="header-profile-texts">
            <div class="d-flex">
              <p class="header-profile-name small-text">{{ name }}</p>
              <svg class="header-profile-chevron" width="15" height="16" viewBox="0 0 15 16"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5625 6.3125L7.5 10.4375L11.4375 6.3125" stroke="white"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="header-profile-email small-text">{{ email }}</p>
          </div>
        </div>

        <div v-if="showProfileMenu" class="header-profile-menu d-flex-col">
          <div class="header-profile-menu-info d-flex">
            <div class="header-profile-menu-circle h6">{{ getInitialsName(diplayName) }}</div>
            <div class="header-profile-menu-texts">
              <p class="header-profile-menu-name small-text">{{ name }}</p>
              <p class="header-profile-menu-email small-text">{{ email }}</p>
            </div>
          </div>
          <div class="header-profile-menu-divider"></div>
          <div class="header-profile-menu-items d-flex-col fill-container">
            <router-link to="#" class="header-profile-menu-item">Conta</router-link>
            <router-link
              to="#"
              class="header-profile-menu-item">
                Política de privacidade
            </router-link>
          </div>
          <div class="header-profile-menu-divider"></div>
          <div
            class="header-profile-menu-logout fill-container d-flex"
            @click="logout()"
            @keypress="logout()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.25 10L8.75 10M17.25 10L14.25 6.75M17.25 10L14.25 13.25M9.25 1.75L4.75
              1.75C3.64543 1.75 2.75 2.64543 2.75 3.75L2.75 16.25C2.75 17.3546 3.64543 18.25 4.75
              18.25L9.25 18.25" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
            </svg>
            <span>Sair</span>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HeaderComponent',
  props: {
    variant: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showProfileMenu: false,
      searchData: '',
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    today() {
      return moment().format('dddd, LL');
    },
    diplayName() {
      return this.getUser.diplayName;
    },
    name() {
      return this.getUser.name;
    },
    email() {
      return this.getUser.email;
    },
  },
  methods: {
    ...mapActions(['logoutAction']),
    getInitialsName(nameParam, maxInitials = 2) {
      if (typeof nameParam !== 'string') {
        return nameParam;
      }
      const nomalizedName = this.removeAccents(nameParam);
      const names = nomalizedName.split(' ');
      let initials = '';

      names.forEach((name) => {
        initials += name[0];
      });

      return initials.substring(0, maxInitials);
    },
    removeAccents(string) {
      return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    },
    hideProfileMenu() {
      this.showProfileMenu = false;
    },
    logout() {
      this.logoutAction();
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  background: $primary;
  height: 200px;
  width: 100%;
  &.search {
    height: unset;
  }
  .header-content {
    display: flex;
    justify-content: space-between;
    padding: 32px 64px;
    .header-info {
      .header-info-today-text {
        margin: 0;
        color: $white;
        &::first-letter {
          text-transform: uppercase;
        }
      }
      .header-info-welcome-text {
        margin: 0;
        color: $gray30;
      }
    }
    .header-search-container {
      width: 100%;
      max-width: 550px;
      label {
        background: $gray10;
        display: flex;
        border-radius: 5px;
        .header-search-icon {
          padding: 8px 10px;
          padding-left: 15px;
        }
        .input-text {
          max-width: 550px;
          padding: 11px 0;
          padding-left: 5px;
          padding-right: 15px;
          background: $gray10;
          border: none;
          &::placeholder {
            color: $gray60;
          }
          &:focus {
            box-shadow: unset;
          }
        }
      }
    }
    .header-profile-container {
      position: relative;
      .header-profile {
        align-items: center;
        cursor: pointer;
        .header-profile-circle {
          border-radius: 100%;
          background: $gray20;
          margin-right: 8px;
          padding: 10px;
          color: $black;
          font-weight: bold;
          text-transform: capitalize;
          user-select: none;
        }
        .header-profile-texts {
          .header-profile-name {
            color: $white;
            margin: 0;
            margin-right: 8px;
            user-select: none;
          }
          .header-profile-email {
            color: $gray30;
            margin: 0;
            user-select: none;
          }
        }
      }
      .header-profile-menu {
        position: absolute;
        right: 0;
        top: 100%;
        margin: 8px 0;
        background: $white;
        border-radius: 10px;
        width: 296px;
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        align-items: center;
        padding-bottom: 16px;
        overflow: hidden;
        white-space: nowrap;
        .header-profile-menu-info {
          width: 100%;
          align-items: center;
          padding: 16px;
          .header-profile-menu-circle {
            border-radius: 100%;
            background: $gray20;
            margin-right: 8px;
            padding: 12px;
            color: $black;
            font-weight: bold;
            text-transform: capitalize;
            user-select: none;
          }
          .header-profile-menu-texts {
            .header-profile-menu-name {
              color: $black;
              margin: 0;
              margin-right: 8px;
            }
            .header-profile-menu-email {
              color: $gray60;
              margin: 0;
            }
          }
        }
        .header-profile-menu-divider {
          width: 296px;
          border: 1px solid $gray10;
        }
        .header-profile-menu-items {
          padding: 8px 0;
          .header-profile-menu-item {
            text-decoration: none;
            color: inherit;
            width: 100%;
            padding: 10px 16px;
            &:hover {
             background: $gray10;
            }
          }
        }
        .header-profile-menu-logout {
          cursor: pointer;
          width: 100%;
          height: 40px;
          padding: 10px 16px;
          margin-top: 8px;
          svg {
            margin-right: 8px;
          }
          &:hover {
            span {
              color: $red60;
            }
            svg {
              path {
                stroke: $red60;
              }
            }
          }
        }
      }
    }
  }
}
</style>
