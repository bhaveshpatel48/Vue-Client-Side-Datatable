const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/getdata': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
    }
  }
});

// module.exports = {
//   devServer: {
//     proxy: {
//       '^/getdata': {
//         target: 'http://localhost:8000',
//         changeOrigin: true
//       },
//     }
//   },
//   transpileDependencies: true
// }
