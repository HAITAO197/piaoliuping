<template>
  <div class="home">
    <div>
      <span>{{ message.message }}</span>
      <button @click="getMessage">捞</button>
    </div>
    <div>
      <input type="text" v-model="replyMsg" placeholder="请输入信息" />
      <button @click="replyMessage">回</button>
    </div>
    <br />
    <div>
      <input type="text" v-model="newMsg" placeholder="请输入信息" />
      <button @click="newMessage">扔</button>
    </div>
  </div>
</template>

<script>
// 引入API
import { query, create, reply } from "@/utils/request.js";
// 引入防抖函数
import { debounce } from "@/utils/publicMethods.js";
export default {
  name: "Home",
  data() {
    return {
      message: {},
      newMsg: "",
      replyMsg: "",
    };
  },
  methods: {
    // 捞
    getMessage: debounce(async function () {
      const { data } = await query();
      this.message = data.data;
    }),
    // 扔
    newMessage: debounce(async function () {
      const { data } = await create(this.newMsg);
      // this.message = data.data;
      console.log(data);
    }),
    // 回
    replyMessage: debounce(async function () {
      console.log(123);
      const { data } = await reply({ pid: this.message.id, msg: "" });
      // this.message = data.data;
      console.log(data);
    }),
  },
  created() {
    console.log(123);
    this.getMessage();
  },
};
</script>
