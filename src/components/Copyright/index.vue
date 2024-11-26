<template>
    <div class="ivu-global-footer i-copyright">
       <div class="ivu-global-footer-links">
          <a :href="item.href" target="_blank" v-for="(item,index) in links" :key="index">{{item.title}}</a>
       </div>
       <div class="ivu-global-footer-copyright">{{copyright}}</div>
    </div>
</template>

<script lang="ts" setup>
// 定义数据
const links = ref([
    {
        title: 'GitHub',
        key: 'GitHub',
        href: 'https://github.com/202252197'
    },
    {
        title: 'Gitee',
        key: 'GitHub',
        href: 'https://github.com/202252197'
    },
    {
        title: '文档',
        key: '文档',
        href: 'http://doc.aaaaa.com'
    },
    {
        title: 'License',
        key: 'License',
        href: 'https://github.com/202252197'
    },
    {
        title: 'v2.1.7 community',
        key: 'v2.1.7 community',
        href: 'http://q.aaaaa.com'
    },
 
]);
const copyright = ref('Copyright © 2023-2024 | JUNCHENMO网络科技有限公司');

// 在mounted阶段获取版本信息并更新版权信息
onMounted(() => {
    const version = "1.0.0";
    copyright.value += version? '  |  ' + version : '';
});
</script>

<style scoped lang="scss">
.ivu-global-footer {
  padding: 5px;
  text-align: center;
  box-sizing: border-box;
  margin-top: 40px;
}

.i-copyright {
  flex: 0 0 auto;
}

.ivu-global-footer-links {
  margin-bottom: 5px;
}

.ivu-global-footer-links a:not(:last-child) {
  margin-right: 40px;
}

.ivu-global-footer-links a {
  text-decoration: none;
  font-size: 14px;
  color: #728ce3;
  transition: all 0.2s ease-in-out;
}

.ivu-global-footer-copyright {
  margin-top: 10px;
  color: #808695;
  font-size: 14px;
}
</style>