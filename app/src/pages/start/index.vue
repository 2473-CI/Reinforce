<template>
  <uni-section title="时" type="line"></uni-section>
  <uni-forms style="margin-left: 15px; margin-right: 15px;">
    <uni-forms-item label-width="40" label="起卦时间" required>
      <uni-datetime-picker type="datetime" v-model="startTime" />
    </uni-forms-item>
  </uni-forms>

  <uni-section title="地" type="line"></uni-section>
  <uni-forms style="margin-left: 15px; margin-right: 15px;">
    <uni-forms-item label-width="40" label="地区选择">
      <picker :value="district.index" :range="district.array">
        <view class="uni-input">{{ district.array[district.index] }}</view>
      </picker>
    </uni-forms-item>
  </uni-forms>

  <uni-section title="人" type="line"></uni-section>

  <uni-swipe-action>
    <uni-swipe-action-item v-for="h, i in humans" :key="i" :right-options="rightPptions" :show="h.show"
      :auto-close="false" @change="h.show = 'right'" @click="(e) => humanCardClcik(e, i)">
      <uni-card :is-shadow="false">
        <view style="display: flex; justify-content: space-around;">
          <view>{{ h.name == "" ? "佚名" : h.name }}</view>
          <view>{{ h.birthday }}</view>
          <view>{{ h.gender }}</view>
        </view>

      </uni-card>
    </uni-swipe-action-item>

  </uni-swipe-action>
  <view style="margin: 20px;">
    <button class="button" type="default" @click="openHuman">+</button>
    <uni-popup ref="humanPopup" background-color="#fff">
      <view style="width: 90vw;" class="center">
        <!-- <text style="font-size: 1rem;">添加人物</text> -->
        <uni-title type="h1" align="center" title="添加人物"></uni-title>
      </view>
      <hr />
      <view style="margin: 0 20px;">
        <uni-forms ref="baseForm" :modelValue="human" label-position="top">
          <uni-forms-item label="姓名">
            <uni-easyinput v-model="human.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="性别" required>
            <uni-segmented-control :current="0" :values="genders" style-type="button" active-color="#007aff"
              @clickItem="clickItem" />
          </uni-forms-item>
          <uni-forms-item label="出生日期" required>
            <picker mode="date" :value="human.birthday" @change="changeBirthday">
              <view class="uni-input"><uni-easyinput v-model="human.birthday" placeholder="请输入年龄" /></view>
            </picker>
          </uni-forms-item>

        </uni-forms>
      </view>
      <view style="margin: 10px; " class="center">
        <button class="mini-btn" type="default" size="mini" @click="clearHuman">取消</button>
        <button class="mini-btn" type="default" size="mini" @click="closeHuman">暂存</button>
        <button class="mini-btn" type="primary" size="mini" :plain="true" @click="addHuman">添加</button>
      </view>
    </uni-popup>
  </view>

  <uni-section title="法" type="line"></uni-section>
  <view style="margin: 20px;">
    <uni-forms label-position="top">
      <uni-forms-item label="贵人取法" required>
        <uni-segmented-control :current="0" :values="signHuman.task1" style-type="button" active-color="#007aff" />
        <view style="height: 10px;"></view>
        <uni-segmented-control :current="0" :values="signHuman.task2" style-type="button" active-color="#007aff" />
      </uni-forms-item>
      <uni-forms-item label="月将取法" required>
        <!-- <uni-segmented-control :values="monthGeneral" style-type="button" active-color="#007aff" /> -->
        <!-- <uni-card :is-shadow="false"> -->
        <view style="border: 1px solid silver; border-radius: 3px; height: 2rem;">
          <picker @change="monthChange" :value="fa.month" :range="monthGeneral">
            <view class="uni-input" style="text-align: center; line-height: 2rem;">{{ fa.month }}</view>
          </picker>
        </view>
        <!-- </uni-card> -->
      </uni-forms-item>
      <uni-forms-item label="涉害取法" required>
        <uni-segmented-control :current="0" :values="harms" style-type="button" active-color="#007aff" />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" :plain="true">起卦</button>
  </view>
</template>


<script setup lang="ts">
import { reactive, ref } from "vue";
import { DateTime } from 'luxon'
import type { UniSegmentedControlCurrent } from "@uni-helper/uni-ui-types";

interface Human {
  name?: string,
  birthday: string,
  gender: string,
  show?: UniHelper.UniSwipeActionItemShow
}

const district = reactive({
  array: ['中国', '美国', '巴西', '日本'],
  index: 0
})
// _UniSwipeActionItemOption
// _UniSwipeActionItemShow

const rightPptions: UniHelper.UniSwipeActionItemOption[] = [
  { text: '置顶', style: { backgroundColor: '#007aff', color: "white", fontSize: "1rem" } },
  { text: '删除', style: { backgroundColor: '#F56C6C', color: "white", fontSize: "1rem" } }
]
const signHuman = {
  task1: ["甲戊庚牛羊", "甲羊戊寅牛"],
  task2: ["自动选贵", "指定昼贵", "指定夜贵"]
}

const harms = ["根据深度", "直取孟仲季"]

const human = reactive<Human>({
  name: "",
  birthday: "2000-01-01",
  gender: "男",
  show: "none"
})

const changeBirthday = (data: UniHelper.DatePickerOnChangeEvent) => human.birthday = data.detail.value

const humans = ref<Human[]>([])
const humanPopup = ref<UniHelper.UniPopup | null>(null)

const dateToStr = (date: Date): string => date ? DateTime.fromJSDate(date).toFormat("yyyy'-'MM'-'dd'-'") : null;


const nowTime = (): Date => {
  const luxonDateTime = DateTime.local().setZone('Asia/Shanghai')
  const year = luxonDateTime.year;
  const month = luxonDateTime.month;
  const day = luxonDateTime.day;
  const hour = luxonDateTime.hour;
  const minute = luxonDateTime.minute;
  const second = luxonDateTime.second;

  return new Date(year, month - 1, day, hour, minute, second);
}

const genders = ['男', '女']

const monthGeneral = ["自动选择", "子", "丑", "寅", "卯", "巳", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
const clickItem = (args: UniHelper.UniSegmentedControlOnClickItemEvent) => human.gender = genders[args.currentIndex]

const openHuman = () => humanPopup.value?.open()

const addHuman = () => {
  humans.value.push(JSON.parse(JSON.stringify(human)))
  human.birthday = "2000-01-01";
  human.gender = "男"
  human.name = ""
  humanPopup.value?.close()
}

const clearHuman = () => {
  human.birthday = "2000-01-01";
  human.gender = "男"
  human.name = ""
  humanPopup.value?.close()
}

const closeHuman = () => humanPopup.value?.close()
// _UniSwipeActionItemOnClick
const humanCardClcik = (e: UniHelper.UniSwipeActionItemOnClickEvent, i: number) => {
  const move = humans.value.splice(i, 1);
  if (e.index == 0) {
    move[0].show = "none"
    humans.value.unshift(move[0]);
  }
}

const fa = reactive({
  task1: "",
  task2: "",
  month: "自动选择",
  harm: ""
})
// _SelectorPickerOnChange
const monthChange = (e: UniHelper.SelectorPickerOnCancelEvent) => fa.month = monthGeneral[e.detail.value]
const startTime = ref(nowTime())

</script>

<style scoped>
.uni-input {
  height: 25px;
  padding: 7px 12px;
  line-height: 25px;
  font-size: 14px;
  background: #fff;
}

.center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.uni-input {
  padding: 0;
}
</style>