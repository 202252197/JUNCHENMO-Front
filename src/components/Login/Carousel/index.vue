<template>
  <!--logo位置-->
  <div class="logo-div-jcm selector-disabled">
    <img :src="logoImg" width="25px" draggable="false" />
    <div>{{ logoTitle }}</div>
  </div>
  <!--轮播图-->
  <el-carousel
    :interval="3000"
    motion-blur="true"
    height="100vh"
    arrow="always"
    pause-on-hover="true"
  >
    <el-carousel-item v-for="item in carouselArr" :key="item">
      <div id="juzhong">
        <el-row style="margin-bottom: 10px">
          <el-col :span="24" style="text-align: center">
            <h1 style="color: aliceblue">{{ item.title }}</h1>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 50px">
          <el-col :span="24" style="text-align: center">
            <p style="color: #676767">{{ item.describe }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: center">
            <img :src="item.imgPath" width="60%" draggable="false" />
          </el-col>
        </el-row>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { carouselObj } from './type.ts'
defineProps({
  //logo的标题
  logoTitle: {
    type: String,
    default: 'JCM CHEN MO',
  },
  //logo的图片
  logoImg: String,
  //轮播图数据
  carouselArr: {
    type: Array<carouselObj>,
  },
})
</script>

<style scoped lang="scss">
.logo-div-jcm {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;
  color: aliceblue;
  font-size: 20px;
  img {
    vertical-align: middle;
  }
  div {
    margin-left: 5px;
    vertical-align: middle;
    line-height: normal;
  }
}

.el-carousel {
  background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
}

.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
