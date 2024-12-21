<template>
  <button class="custom-button" :class="buttonClasses" :style="buttonStyles" @click="handleClick">
    <slot name="icon">
    </slot>
    <template v-if="title!=''">
      <span class="button-text">
      <span>
        {{ title }}
      </span>
    </span>
    </template>
   
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

// 定义props接收外部传入的属性
const props = defineProps({
  buttonVariant: {
    type: String,
    default: 'default',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  buttonBgColor: {
    type: String,
    default: '#488aec', // 设置默认背景颜色，与原来的$default-bg-color一致，可根据需要调整
  },
  title:{
    type: String,
    default: '',
  }
});

// 响应式的按钮类名列表
const buttonClasses = ref([]);
// 响应式的按钮样式对象
const buttonStyles = ref({});

// 处理按钮点击事件，如果按钮未禁用且传入了点击处理函数，则执行
const handleClick = () => {
  if (!props.isDisabled && props.clickHandler) {
    props.clickHandler();
  }
};

// 根据传入属性动态设置按钮类名和样式
watchEffect(() => {
  buttonClasses.value = [
    `btn-${props.buttonVariant}`,
    props.isDisabled? 'disabled' : '',
  ].filter(Boolean);
  //只有默认的不设置背景颜色
  if(props.buttonVariant==="default"){
    buttonStyles.value = {
      backgroundColor: props.buttonBgColor,
    };
  }
});
</script>

<style lang="scss" scoped>
// 定义Sass变量，用于基础样式配置，可根据项目需求扩展修改
$text-color: #ffffff;
$font-size: 0.8rem;
$line-height: 1rem;
$font-weight: 700;
$border-radius: 0.5rem;
$box-shadow-base: 0 4px 6px -1px rgba(72, 138, 236, 0.19),
  0 2px 4px -1px rgba(72, 138, 236, 0.09);
$box-shadow-hover: 0 10px 15px -3px rgba(72, 138, 236, 0.31),
  0 4px 6px -2px rgba(72, 138, 236, 0.09);
$svg-size: 1.4rem;
$gap: 0.35rem;

// 基础按钮样式，提取公共部分
.button-base {
  margin-left: 5px;
  border: none;
  display: flex;
  padding: 0.55rem 1rem;
  cursor: pointer;
  text-transform: uppercase;
  vertical-align: middle;
  align-items: center;
  user-select: none;
  gap: $gap;
  transition: all 0.6s ease;
}

// 不同按钮变体对应的样式
.btn-default {
  @extend.button-base;
  color: $text-color;
  font-size: $font-size;
  line-height: $line-height;
  font-weight: $font-weight;
  border-radius: $border-radius;
  box-shadow: $box-shadow-base;
}
.btn-info {
  @extend.button-base;
  background-color: #909399;
  color: $text-color;
  font-size: $font-size;
  line-height: $line-height;
  font-weight: $font-weight;
  border-radius: $border-radius;
  box-shadow: $box-shadow-base;
}

.btn-default:hover {
  box-shadow: $box-shadow-hover;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.custom-button svg {
  width: $svg-size;
  height: $svg-size;
}

.custom-button.button-text {
  margin-left: $gap;
}
</style>