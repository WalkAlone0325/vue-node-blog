<template>
  <div class="contact-card">
    <div class="contact-header">
      <p>2112313123131313</p>
    </div>
    <!-- @click="handleSelect" -->
    <div class="contact-container">
      <div
        class="box first pointer"
        @click="handleSelect"
        :class="{ selected: isSelected }"
      >
        <span class="icon-cont">
          <i class="iconfont icon-git"></i>
        </span>
        <h3>github</h3>
        <br />
        <ul class="hidden">
          <li>求Star</li>
          <li>多多关照</li>
          <a
            @click.stop
            href="https://github.com/WalkAlone0325"
            target="_block"
          >
            进入我的github主页
          </a>
        </ul>
      </div>

      <div
        class="box second pointer"
        @click="handleSelect(2)"
        :class="{ selected: isSelected }"
      >
        <span class="icon-cont">
          <i class="iconfont icon-juejin"></i>
        </span>
        <h3>掘金</h3>
        <br />
        <ul class="hidden">
          <li>掘金收藏了文章</li>
          <li>看大神秀操作</li>
          <a
            @click.stop
            href="https://juejin.im/user/5b38cdb1e51d4558c4723f86"
            target="_block"
          >
            进入我的掘金主页
          </a>
        </ul>
      </div>

      <div
        class="box third pointer"
        @click="handleSelect(4)"
        :class="{ selected: isSelected }"
      >
        <span class="icon-cont">
          <i class="iconfont icon-weixin1"></i>
        </span>
        <h3>微信</h3>
        <br />
        <ul class="hidden">
          <li>WX：824079965</li>
          <img
            src="../assets/images/wechat.jpg"
            alt="二维码不见了，手动加吧"
            style="width: 120px; height: 120px"
          />
        </ul>
      </div>

      <div
        class="box fourth  pointer"
        @click="handleSelect(3)"
        :class="{ selected: isSelected }"
      >
        <span class="icon-cont">
          <i class="iconfont icon-QQ"></i>
        </span>
        <h3>QQ</h3>
        <br />
        <ul class="hidden">
          <li>QQ：2291763727</li>
          <a
            @click.stop
            href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=2291763727"
            target="class"
          >
            加我的QQ
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelected: false, // 切换类名
      val: null
    };
  },
  methods: {
    handleSelect() {
      this.isSelected = !this.isSelected;
    }
  }
};
</script>

<style lang="scss" scoped>
.contact-card {
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-image: linear-gradient(120deg, #8e44ad, #3495db, #8e44ad);
  .contact-container {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    .contact-header {
      p {
        color: #fff;
        background: #000;
      }
    }
    .box {
      height: 260px;
      padding: 15px;
      display: flex;
      background-position: center;
      border: 1px solid #000;
      position: relative;
      overflow: hidden;
      &:hover .icon-cont {
        animation: shady 3s linear infinite;
      }
      @keyframes shady {
        0% {
          box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5),
            0 0 0 0px rgba(3, 108, 129, 0.5);
        }
        20% {
          box-shadow: 0 0 0 100px rgba(255, 255, 255, 0),
            0 0 0 0px rgba(3, 108, 129, 0);
        }
        20.1% {
          box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5),
            0 0 0 0px rgba(3, 108, 129, 0.5);
        }
        50% {
          box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5),
            0 0 0 0px rgba(3, 108, 129, 0.5);
        }
        70% {
          box-shadow: 0 0 0 100px rgba(255, 255, 255, 0),
            0 0 0 0px rgba(3, 108, 129, 0);
        }
        70.1% {
          box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5),
            0 0 0 0px rgba(3, 108, 129, 0.5);
        }
        100% {
          box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5),
            0 0 0 0px rgba(3, 108, 129, 0.5);
        }
      }
      .icon-cont {
        border: 6px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 75px;
        height: 75px;
        margin: 20px auto;
        display: block;
        text-align: center;
        transition: 0.6s;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        z-index: 5;
        box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5),
          0 0 0 0px rgba(3, 108, 129, 0.5);
        i {
          color: #fff;
          opacity: 0.6;
          font-size: 2.5em;
          line-height: 75px;
        }
      }
      h3 {
        color: #fff;
        font-weight: 500;
        font-size: 24px;
        text-align: center;
        transition: 0.6s;
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0);
        position: absolute;
        top: 95px;
        width: 86%;
        z-index: 4;
      }
      ul {
        font-family: "Open Sans", Arial, sans-serif;
        color: #fff;
        font-size: 13px;
        line-height: 28px;
        text-indent: 14px;
        margin: 25px;
        margin-top: 399px;
        list-style-type: disc;
        margin-left: -15px;
        transition: 0.5s;
        a {
          color: #fff;
          &:hover {
            color: #3495db;
          }
        }
      }
    }
    .box.selected .icon-cont {
      transform: scale(1.5, 1.5);
      transition: 0.6s;
      opacity: 0.3;
      position: absolute;
      top: -20px;
      left: -5px;
      right: 180px;
    }
    .box.selected:hover .icon-cont {
      animation: none;
    }
    .box.selected h3 {
      transition: 0.6s;
      padding: 32px 15px 15px 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 86%;
      top: 16px;
    }
    .box.selected ul.hidden {
      transition: 0.5s;
      opacity: 1;
      margin-top: 95px;
    }
  }
}
</style>
