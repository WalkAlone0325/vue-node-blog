const router = require('koa-router')({
  prefix: '/admin/api/page'
})

const About = require('../../models/About')

// 保存关于页面
router.post('/about', async ctx => {
  await About(ctx.request.body).save()
  ctx.body = {
    code: 200,
    message: '保存成功！'
  }
})

router.put('/about', async ctx => {
  // clone下来第一次需要先提交一次
  // await new About(ctx.request.body).save()
  await About.update(ctx.request.body)
  ctx.body = {
    code: 200,
    message: '保存成功！'
  }
})
// 获取关于页面
router.get('/about', async ctx => {
  const res = await About.find()
  ctx.body = res
})

module.exports = router