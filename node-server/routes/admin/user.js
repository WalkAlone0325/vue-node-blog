var Koa = require('koa');
var app = new Koa();
const router = require('koa-router')()

router.prefix('/admin/api')

const AdminUser = require('../../models/AdminUser')
// 增
router.post('/admin', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new AdminUser(ctx.request.body).save()
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
router.delete('/admin/:id', async ctx => {
  const data = await AdminUser.findByIdAndDelete(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 改
router.put('/admin/:id', async ctx => {
  const data = await AdminUser.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data
  }
})

// 查
router.get('/admin', async ctx => {
  const admin = await AdminUser.find(ctx.request.body)
  // console.log(ctx)
  ctx.body = admin
})

// 登录
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 查询用户
  const user = await AdminUser.findOne({ username }).select('+password')

  if (!user) {
    ctx.response.status = 403;
    ctx.body = {
      code: 403,
      message: "用户不存在"
    }
    return
  }
  const isVaild = require('bcryptjs').compareSync(password, user.password)
  if (isVaild) {
    // 获取token
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = 'duxing666'
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '10h' });
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      message: "登录成功",
      token
    }
  } else {
    ctx.response.status = 401;
    ctx.body = {
      code: 401,
      message: "密码错误"
    }
  }
})


module.exports = router