const router = require('koa-router')({
  prefix: '/admin/api'
})

const Project = require('../models/Project')
// 增
router.post('/project', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new Project(ctx.request.body).save()
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
router.delete('/project/:id', async ctx => {
  const data = await Project.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/project/:id', async ctx => {
  const data = await Project.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查
router.get('/project', async ctx => {
  const res = await Project.find()
  ctx.body = {
    code: 200,
    msg: '获取项目列表成功！',
    data: res
  }
})

module.exports = router