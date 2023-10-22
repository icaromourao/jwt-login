<template>
  <div class="sidebar-container">
    <div class="sidebar-content">
      <img class="sidebar-logo" src="@/assets/images/sidebar/logo.png" alt="logo.png">

      <div class="sidebar-menu">
        <router-link
          to="/"
          class="sidebar-menu-item"
          :class="{'active': isActive('/')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.29999 9.36024C3.29999 8.57117 3.68786 7.83251 4.33743 7.38453L12
            2.10001L19.6625 7.38453C20.3121 7.83251 20.7 8.57117 20.7 9.36024V19.5C20.7
            20.8255 19.6255 21.9 18.3 21.9H5.69999C4.3745 21.9 3.29999 20.8255 3.29999
            19.5V9.36024Z" stroke="#1B1B1B" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M9.29999 15.3C9.29999 14.6373 9.83725 14.1 10.5 14.1H13.5C14.1627 14.1 14.7
            14.6373 14.7 15.3V21.9H9.29999V15.3Z" stroke="#1B1B1B" stroke-width="1.5"
            stroke-linejoin="round"/>
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link
          to="/agenda"
          class="sidebar-menu-item"
          :class="{'active':
          isActive('/agenda')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.09998 2.10001V4.50001M8.09998 6.30001V4.50001M15.9 2.10001V4.50001M15.9
              6.30001V4.50001M8.09998 4.50001H4.49998C3.17449 4.50001 2.09998 5.57452 2.09998
              6.90001V19.5C2.09998 20.8255 3.17449 21.9 4.49998 21.9H19.5C20.8255 21.9
              21.9 20.8255 21.9 19.5V6.90001C21.9 5.57452 20.8255 4.50001 19.5
              4.50001H15.9M8.09998 4.50001H15.9M2.09998 10.5H21.9" stroke="#1B1B1B"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Agenda</span>
        </router-link>

        <router-link
          to="/cadastros"
          class="sidebar-menu-item"
          :class="{'active': isActive('/cadastros')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1 21.9H6.9C5.57452 21.9 4.5 20.8255 4.5 19.5V4.50001C4.5 3.17452 5.57452
            2.10001 6.9 2.10001H13.5M13.5 2.10001L19.5 8.10001M13.5 2.10001V8.10001H19.5M19.5
            8.10001V11.1M17.8125 23.1H15.3V20.5875L20.0672 15.8204C20.761 15.1266 21.8858 15.1266
            22.5796 15.8204C23.2735 16.5142 23.2735 17.639 22.5796 18.3328L17.8125 23.1Z"
            stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Cadastros</span>
        </router-link>

        <router-link
          to="/financeiro"
          class="sidebar-menu-item"
          :class="{'active': isActive('/financeiro')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.90001V17.1M8.09998 10.5V17.1M15.9 12.9V17.1M4.49998 21.9H19.5C20.8255
            21.9 21.9 20.8255 21.9 19.5V4.50001C21.9 3.17452 20.8255 2.10001 19.5
            2.10001H4.49998C3.17449 2.10001 2.09998 3.17452 2.09998 4.50001V19.5C2.09998 20.8255
            3.17449 21.9 4.49998 21.9Z" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"/>
          </svg>
          <span>Gestão financeira</span>
        </router-link>
      </div>

      <div @click="logout()" @keypress="logout()" class="sidebar-menu-logout">
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
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SideBarComponent',
  data() {
    return {};
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions(['logoutAction']),
    isActive(menuPath) {
      return this.currentPath === menuPath;
    },
    logout() {
      this.logoutAction();
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}
%side-bar-menu-item-style {
  display: flex;
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
}
.sidebar-container {
  width: 100%;
  max-width: 288px;
  height: 100vh;
  background: $white;
  padding: 32px 24px;
  .sidebar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .sidebar-logo {
      max-width: 205px;
      margin-bottom: 56px;
    }
    .sidebar-menu {
      display: flex;
      flex-direction: column;
      margin-bottom: 56px;
      height: 100%;
      .sidebar-menu-item {
        @extend %side-bar-menu-item-style;
        svg {
          margin-right: 8px;
        }
        &.active {
          color: $white;
          background: $primary;
          cursor: default;
          svg {
            path {
              stroke: $white;
            }
          }
        }
        &:hover {
          color: $white;
          background: $primary;
          svg {
            path {
              stroke: $white;
            }
          }
        }
      }
    }
    .sidebar-menu-logout {
      @extend %side-bar-menu-item-style;
      svg {
        margin-right: 8px;
      }
      &:hover {
        color: $white;
        background: $red60;
        svg {
          path {
            stroke: $white;
          }
        }
      }
    }
  }
}
</style>
