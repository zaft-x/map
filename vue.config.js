const path = require('path');
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
  configureWebpack: {
    externals:{
      "BMap": "BMap"
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://111.231.93.196:43667',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
},
  lintOnSave : true,
  chainWebpack:(config)=>{
    config.resolve.alias
      .set('src',resolve('src'))
  }
}