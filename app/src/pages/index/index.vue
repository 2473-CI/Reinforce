<template>
  <!-- <CustomNavbar /> -->
  <uni-search-bar placeholder="快速搜索" @confirm="search" :focus="true" v-model="searchValue" @cancel="searchCancel"
    @clear="searchCancel">
  </uni-search-bar>
  <view class="search-result">
    <text class="search-result-text">当前输入为：{{ searchValue }}</text>
  </view>
  <uni-card title="基础卡片" sub-title="副标题" extra="额外信息"
    thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
    <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
  </uni-card>
  <uni-fab ref="fab" horizontal="right" vertical="bottom" @fabClick="fabClick" />
</template>

<script setup lang="ts">
import { ref } from "vue"

const searchValue = ref("")

const searchCancel = () => searchValue.value = ""

const search = () => console.log(searchValue.value)

const fabClick = () => uni.switchTab({ url: "/pages/start/index" })

</script>

<style scoped>
.banner {
  width: 100vw;
  height: 20vh;
}
</style>