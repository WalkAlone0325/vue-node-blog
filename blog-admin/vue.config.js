module.exports = {
  // 输出的文件夹
  outputDir: __dirname + '/../node-server/public/admin',
  // 开发环境 ‘/’，生产环境访问时 添加为 /admin/...
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  productionSourceMap: false,
}