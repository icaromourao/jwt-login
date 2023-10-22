module.exports = {
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_BASE_URL,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import 'src/global/theme/colors.scss';
          @import 'src/global/extends.scss';
          @import 'src/global/grid-system.scss';
        `,
      },
    },
  },
};
