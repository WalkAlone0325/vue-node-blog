/**
 *  实时时间转换，相对时间
 *    1分钟以前，显示“刚刚”
 *    1分钟~1小时之间，显示“xx分钟前”
 *    1小时~1天之间，显示“XX小时前”
 *    1天~1个月之间，显示“xx天之前”
 *    大于1个月，显示“xx年xx月xx日”
 */
import Vue from 'vue'

let Time = {
  // 获取当前时间戳
  getUnix: function () {
    var date = new Date()
    return date.getTime()
  },
  // 获取今天0点0分0秒的时间戳
  getTodayUnix: function () {
    var date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取今年1月1日0点0分0秒的时间戳
  getYearUnix: function () {
    var date = new Date()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取标准年月日
  getLastDate: function (time) {
    var date = new Date(time)
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  },

  // 转换时间
  getFormatTime: function (isotime) {
    const utctime = this.getLastDate(isotime)
    var parts = utctime.match(/\d+/g);
    // 转为时间戳
    var timestamp = new Date(parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5]).getTime();
    var now = this.getUnix() // 当前时间戳
    var today = this.getTodayUnix() // 今天0点时间戳
    // var year = this.getYearUnix() // 今年0点时间戳
    var timer = (now - timestamp) / 1000 // 转换为秒级时间戳
    var tip = ''
    if (timer <= 0 || Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer >= 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    } else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  }
}

Vue.directive('time', {
  bind(el, binding) {
    el.innerHTML = Time.getFormatTime(binding.value)
    el.__timeout__ = setInterval(() => {
      el.innerHTML = Time.getFormatTime(binding.value)
    }, 60000)
  },
  unbind(el) {
    clearInterval(el.__timeout__)
    delete el.__timeout__
  }
})
