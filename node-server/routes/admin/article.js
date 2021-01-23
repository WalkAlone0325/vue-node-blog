const router = require('koa-router')({
  prefix: '/admin/api',
})

const Tag = require('../../models/Tag')
const Article = require('../../models/Article')
// 增
router.post('/article', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const res = await new Article(ctx.request.body).save()
    if (res) {
      ctx.body = {
        code: 200,
        msg: '添加成功',
        res,
      }
    }
    return
  } catch (err) {
    console.log(err)
  }
  ctx.body = {
    code: 500,
    msg: '添加失败',
  }
})

// 删
router.delete('/article/:id', async ctx => {
  await Article.findByIdAndDelete(ctx.params.id)
  ctx.body = {
    code: 200,
    success: '删除成功',
  }
})

// 改
router.put('/article/:id', async ctx => {
  const data = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = {
    code: 200,
    success: true,
    data,
  }
})

// 查
router.get('/article', async ctx => {
  const total = await Article.countDocuments() // 文章总数
  const reqParam = ctx.query
  const title = reqParam.title
  // const resource = reqParam.resource
  const page = Number(reqParam.page) // 当前第几页
  const size = Number(reqParam.size) // 每页显示的记录条数
  // 显示符合前端分页请求的列表查询
  const reg = new RegExp(title, 'i')
  const res = await Article.find(
    {
      $or: [
        { title: { $regex: reg } },
        // { resource: { $in: resource } }
      ],
    },
    {
      // title: 0
    },
    {
      populate: 'tags',
      sort: { updated: -1 },
      skip: (page - 1) * size,
      limit: size,
    },
  )

  // const res = await Article.find({ title: search }).sort({ '_id': -1 }).populate('tags').skip((page - 1) * size).limit(size)
  //是否还有更多
  const hasMore = total - (page - 1) * size > size ? true : false
  ctx.response.type = 'application/json'
  //返回给前端
  ctx.body = { hasMore: hasMore, article: res, total: total }
})

// 详情数据
router.get('/article/:id', async ctx => {
  const article = await Article.findById(ctx.params.id)
  ctx.body = article
})

// 上传图片
const multer = require('koa-multer')
// const multer = require('multer')
const MAO = require('multer-aliyun-oss')
//配置
// var storage = multer.diskStorage({
//   //文件保存路径
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/') //注意路径必须存在
//   },
//   //修改文件名称
//   filename: function (req, file, cb) {
//     var fileFormat = file.originalname.split('.')
//     cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
//   },
// })

//加载配置
// var upload = multer({ storage: storage })
var upload = multer({
  // dest: __dirname + '/public/uploads/',

  storage: MAO({
    config: {
      region: 'oss-cn-qingdao',
      accessKeyId: 'LTAI4G7Bvnf3SQ3XpBxfq4FY',
      accessKeySecret: 'tRD1gcDeQ242X9tMQXs7cWwY0hwJPs',
      bucket: 'vue-node-blog',
    },
  }),
})
router.post('/upload', upload.single('file'), async ctx => {
  // const file = ctx.request.file
  console.log(ctx.req.file)
  ctx.body = {
    code: 200,
    message: '上传成功',
    // filename: 'http://api.loner.shop/uploads/' + ctx.req.file.filename,
    filename: ctx.req.file.url,
  }
})

module.exports = router
