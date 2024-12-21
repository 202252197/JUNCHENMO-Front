<template>
    <div id="wifi-loader" :style="loaderStyles">
      <svg class="circle-outer" viewBox="0 0 86 86">
        <circle class="back" cx="43" cy="43" r="40"></circle>
        <circle class="front" cx="43" cy="43" r="40"></circle>
        <circle class="new" cx="43" cy="43" r="40"></circle>
      </svg>
      <svg class="circle-middle" viewBox="0 0 60 60">
        <circle class="back" cx="30" cy="30" r="27"></circle>
        <circle class="front" cx="30" cy="30" r="27"></circle>
      </svg>
      <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
      </svg>
      <div class="text" :data-text="textContent">{{ textContent }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 定义响应式变量，用于控制组件的样式相关属性
  const loaderStyles = ref({});
  const textContent = ref('Searching');
  
  // 定义CSS变量，可根据需要在外部传入不同的值来改变样式
  const background = ref('#62abff');
  const frontColor = ref('#4f29f0');
  const backColor = ref('#c3c8de');
  const textColor = ref('#414856');
  
  // 根据响应式变量更新loaderStyles对象，用于绑定到组件的样式上
  watchEffect(() => {
    loaderStyles.value = {
      '--background': background.value,
      '--front-color': frontColor.value,
      '--back-color': backColor.value,
      '--text-color': textColor.value,
      width: '64px',
      height: '64px',
      borderRadius: '50px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  });
  </script>
  
  <style lang="scss" scoped>
  #wifi-loader {
    width: 64px;
    height: 64px;
    border-radius: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      & circle {
        position: absolute;
        fill: none;
        stroke-width: 6px;
        stroke-linecap: round;
        stroke-linejoin: round;
        transform: rotate(-100deg);
        transform-origin: center;
      }
      & circle.back {
        stroke: var(--back-color);
      }
      & circle.front {
        stroke: var(--front-color);
      }
    }
    & svg.circle-outer {
      height: 86px;
      width: 86px;
      & circle {
        stroke-dasharray: 62.75 188.25;
      }
      & circle.back {
        animation: circle-outer135 1.8s ease infinite 0.3s;
      }
      & circle.front {
        animation: circle-outer135 1.8s ease infinite 0.15s;
      }
    }
    & svg.circle-middle {
      height: 60px;
      width: 60px;
      & circle {
        stroke-dasharray: 42.5 127.5;
      }
      & circle.back {
        animation: circle-middle6123 1.8s ease infinite 0.25s;
      }
      & circle.front {
        animation: circle-middle6123 1.8s ease infinite 0.1s;
      }
    }
    & svg.circle-inner {
      height: 34px;
      width: 34px;
      & circle {
        stroke-dasharray: 22 66;
      }
      & circle.back {
        animation: circle-inner162 1.8s ease infinite 0.2s;
      }
      & circle.front {
        animation: circle-inner162 1.8s ease infinite 0.05s;
      }
    }
    &.text {
      position: absolute;
      bottom: -40px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: lowercase;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.2px;
      &::before,
      &::after {
        content: attr(data-text);
      }
      &::before {
        color: var(--text-color);
      }
      &::after {
        color: var(--front-color);
        animation: text-animation76 3.6s ease infinite;
        position: absolute;
        left: 0;
      }
    }
  }
  
  @keyframes circle-outer135 {
    0% {
      stroke-dashoffset: 25;
    }
    25% {
      stroke-dashoffset: 0;
    }
    65% {
      stroke-dashoffset: 301;
    }
    80% {
      stroke-dashoffset: 276;
    }
    100% {
      stroke-dashoffset: 276;
    }
  }
  
  @keyframes circle-middle6123 {
    0% {
      stroke-dashoffset: 17;
    }
    25% {
      stroke-dashoffset: 0;
    }
    65% {
      stroke-dashoffset: 204;
    }
    80% {
      stroke-dashoffset: 187;
    }
    100% {
      stroke-dashoffset: 187;
    }
  }
  
  @keyframes circle-inner162 {
    0% {
      stroke-dashoffset: 9;
    }
    25% {
      stroke-dashoffset: 0;
    }
    65% {
      stroke-dashoffset: 106;
    }
    80% {
      stroke-dashoffset: 97;
    }
    100% {
      stroke-dashoffset: 97;
    }
  }
  
  @keyframes text-animation76 {
    0% {
      clip-path: inset(0 100% 0 0);
    }
    50% {
      clip-path: inset(0);
    }
    100% {
      clip-path: inset(0 0 0 100%);
    }
  }
  </style>