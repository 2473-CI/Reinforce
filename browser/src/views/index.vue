<script setup>
import { reactive } from 'vue';
const headerMsg = reactive({
    title: "周杰伦应援网站",
    subtitle: "欢迎来到周杰伦的应援网站，了解他的个人信息和最新动态。",
    context: "周杰伦，1979年1月18日出生于***新北市，华语流行男歌手、词曲创作人、演员、音乐制作人、导演、编剧、商人。2000年发行首张个人专辑《Jay》。"
})

const dynamicMsg = reactive({
    title: "最新动态",
    subtitle: "周杰伦新专辑即将发布，敬请期待！",
    cards: [
        { title: "周杰伦新专辑《时光机》即将上线", subtitle: "周杰伦新专辑《时光机》将于下月正式发布，敬请期待！", url: "/back/silder-1.png" },
        { title: "周杰伦新专辑《时光机》即将上线", subtitle: "周杰伦新专辑《时光机》将于下月正式发布，敬请期待！", url: "/back/silder-2.png" },
        { title: "周杰伦新专辑《时光机》即将上线", subtitle: "周杰伦新专辑《时光机》将于下月正式发布，敬请期待！", url: "/back/silder-2.png" },
        { title: "周杰伦新专辑《时光机》即将上线", subtitle: "周杰伦新专辑《时光机》将于下月正式发布，敬请期待！", url: "/back/silder-2.png" }
    ]
})

</script>


<template>
    <div class="header">
        <div class="row1">
            <div class="column">
                <div class="context">
                    <h1 class="title">{{ headerMsg.title }}</h1>
                    <div class="subtitle">{{ headerMsg.subtitle }}</div>
                </div>
                <div class="actions">
                    <el-button type="danger" round>新闻动态</el-button>
                    <el-button round>访谈花絮</el-button>
                </div>
            </div>
            <div class="column">
                <img style="width: 100%; position: absolute; bottom: 0;" src="/back/back_row1_right.png" alt="">
            </div>
        </div>
        <div class="row2">
            <div class="column">
                <img style="width: 100%;" src="/back/back_row2_left.png" alt="">
            </div>
            <div class="column" style="padding: 40px; box-sizing: border-box;">
                <div style="font-weight: 900; font-size: 2rem;">{{ headerMsg.context }}</div>
            </div>
        </div>
    </div>
    <div class="banner">
        <div class="dynamic-title">
            <h1 class="title">{{ dynamicMsg.title }}</h1>
            <div class="subtitle">{{ dynamicMsg.subtitle }}</div>
        </div>
        <el-carousel indicator-position="outside" arrow="never" pause-on-hover="true">
            <el-carousel-item v-for="item, index in  (dynamicMsg.cards.length / 2) " :key="index">
                <div class="dynamic-context">
                    <div class="card" v-for="_, _i in 2" :key="_i">
                        <img :src="dynamicMsg.cards[index * 2 + _i].url" alt="">
                        <div class="context">
                            <h1>{{ dynamicMsg.cards[index * 2 + _i].title }}</h1>
                            <div>
                                {{ dynamicMsg.cards[index * 2 + _i].subtitle }}
                            </div>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>
.header {
    width: 100vw;
    /* height: 62.7777777vw; */
    height: 100vh;
}

.header>.row1 {
    height: 59%;
    display: flex;
}

.header>.row2 {
    height: 41%;
    display: flex;
}

.header .column {
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.header .row1 .context {
    position: absolute;
    left: 5rem;
    top: 8rem;
}

.header .row1 .actions {
    position: absolute;
    left: 5rem;
    top: 18rem
}

.header .title {
    font-size: 3rem;
    line-height: 6rem;
}

.banner {
    width: 100vw;
    height: 46.388vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* background-color: antiquewhite; */
}

.dynamic-title {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dynamic-title .title {
    font-size: 4rem;
}

.dynamic-title .subtitle {
    font-size: 2rem;
}

.dynamic-context {
    display: flex;
    justify-content: space-evenly;
}

.dynamic-context .card {
    width: 40vw;
    height: 20vw;
    border-radius: 50px 20px;
    overflow: hidden;
    position: relative;
    /* background: red; */
}

.dynamic-context .card img {
    width: 100%;
}



.dynamic-context .card .context {
    position: absolute;
    top: 7rem;
    left: 4rem;
    color: white;
}

.dynamic-context .card .context h1 {
    font-size: 2rem;
}

.dynamic-context .card .context div {
    font-size: 1.3rem;
}
</style>