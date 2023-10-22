<template>
  <div id="app" class="app-container">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['getUserByTokenAction', 'loggoutAction']),
    ...mapMutations(['setUser']),
    checkUser() {
      this.getUserByTokenAction()
        .then((userRes) => {
          this.setUser(userRes.data);
        }).catch(() => {
          // do nothing
        });
    },
  },
  created() {
    this.checkUser();
  },
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  margin: 0;
  #app {
    font-family: 'Inter', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $black;
    background: $gray10;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: $gray30;
  }
  ::-webkit-scrollbar-thumb {
    background: $gray70;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: $gray60;
  }

}
</style>
