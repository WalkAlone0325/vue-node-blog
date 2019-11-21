const router = require('koa-router')({
  prefix: '/admin/api'
})

const Skill = require('../../models/Skill')
// 增
router.post('/skill', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new Skill(ctx.request.body).save()
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
router.delete('/skill/:id', async ctx => {
  const data = await Skill.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/skill/:id', async ctx => {
  const data = await Skill.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查
router.get('/skill', async ctx => {
  const skill = await Skill.find(ctx.request.body)
  // console.log(ctx)
  ctx.body = skill
})

module.exports = router