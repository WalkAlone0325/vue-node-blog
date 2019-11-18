<template>
  <div class="eyes">
    <div class="eye">
      <div class="ball"></div>
    </div>
    <div class="eye">
      <div class="ball"></div>
    </div>
  </div>
</template>

<script>
var balls = document.getElementsByClassName("ball");
document.onmousemove = function() {
  var x = (event.clientX * 100) / window.innerWidth + "%";
  var y = (event.clientY * 100) / window.innerHeight + "%";
  for (let i = 0; i < 2; i++) {
    balls[i].style.left = x;
    balls[i].style.top = y;
    balls[i].style.transform = `translate(-${x},-${y})`;
  }
};
export default {};
</script>

<style lang="scss" scoped>
.eyes {
  position: fixed;
  bottom: 0;
  right: 0;
  .eye {
    width: 80px;
    height: 40px;
    background: #3593da;
    display: inline-block;
    margin: 5px 10px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    .ball {
      width: 30px;
      height: 30px;
      background: #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 10px solid #864bb1;
    }
  }
}
</style>