<template>
    <view>
        关于
        <div class="font">{{ userStore.profile }}</div>
        <button @click="userStore.setProfile({ name: 1, token: '123' })">set</button>
        <button @click="userStore.clearProfile()">clear</button>
        <button @click="getData">request</button>
    </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { http } from '@/utils/http'
const userStore = useUserStore()

const getData = async () => {
    const res = await http<string[]>({ method: "GET", url: "/home/banner" })
    console.log(res)
}

</script>

<style>
.font {
    font-size: 2rem;
}
</style>
