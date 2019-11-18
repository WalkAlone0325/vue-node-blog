<template>
  <div class="project-item-container">
    <div class="project-item pointer" v-for="n in 3" :key="n">
      <div class="img-box">
        <img src="../assets/images/avatar.jpg" alt />
      </div>
      <div class="content">
        <h3>菜鸟外卖</h3>
        <p>saisja osjlasmlaaisja osjlasmlaaisja osjlasmlaaisja osjlasmlaaisja osjlasmla</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.project-item-container {
  width: 70%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  .project-item {
    position: relative;
    width: 300px;
    height: 400px;
    background: #000;
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.5);

    &:hover .img-box img {
      opacity: 0;
    }

    .img-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.5s;
      }
    }
    .content {
      position: absolute;
      bottom: 20px;
      left: 20px;
      left: 10%;
      width: 80%;
      height: 50px;
      background: #fff;
      transition: 0.3s;
      overflow: hidden;
      padding: 15px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 20px;
        text-align: center;
      }
      p {
        margin: 10px 0 0;
        padding: 0;
        opacity: 0;
        line-height: 1.2em;
        transition: 0.3s;
        text-align: justify;
      }
    }
    &:hover .content {
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
    }
    &:hover .content p {
      opacity: 1;
      transition-delay: 0.3s;
    }
  }
}
</style>