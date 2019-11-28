const router = require('koa-router')({
  prefix: '/admin/api'
})

const Friendlink = require('../../models/Friendlink')
// 增
router.post('/friendlink', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new Friendlink(ctx.request.body).save()
    if (res) {
      ctx.body = {
        code: 200,
        msg: '添加成功',
        res
      }
    }
    return
  } catch (err) {
    console.log(err)
  }
  ctx.body = {
    code: 500,
    msg: '添加失败'
  }
})


// 删
router.delete('/friendlink/:id', async ctx => {
  const data = await Friendlink.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/friendlink/:id', async ctx => {
  const data = await Friendlink.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查
router.get('/friendlink', async ctx => {
  const friendlink = await Friendlink.find(ctx.request.body)
  ctx.body = friendlink
})

module.exports = router