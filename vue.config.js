module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'pages': '@/pages',
      }
    }
  },
  outputDir: __dirname + '/./NeteaseCloudMusicApi-master/music',
  //publicPath: process.env.NODE_ENV === 'production' ? '/music/' : '/',
/*   devServer: {
    proxy: {
      "/api": {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: { 
          '^/api': '' //路径重写 
        }
      }
    },
    overlay: {
      warning: false,
      errors: false,
    }
  },
  lintOnSave: false, */
}