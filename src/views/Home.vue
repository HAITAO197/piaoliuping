<template>
  <div class="home">
    <h1>漂流瓶</h1>
    <div class="paper turn">
      <p>
        {{ message.message }}
      </p>

      <div class="replay flex-row">
        <input
          class="textbox"
          type="text"
          maxlength="180"
          v-model="replyMsg"
          placeholder="回复漂流瓶"
        />
        <div class="button" @click="replyMessage">回复</div>
        <div class="button" @click="getMessage">再捞一个</div>
      </div>
    </div>
    <div class="paper turnB" style="min-height: 100px; margin-top: 100px">
      <div class="replay flex-row">
        <input
          class="textbox"
          type="text"
          maxlength="180"
          v-model="newMsg"
          placeholder="告诉我你想说的话"
        />
        <div class="button" @click="newMessage">扔一个</div>
      </div>
    </div>
    <div class="alert" :class="{ default: !isAlertShow }" ref="alertBox">
      <span>{{ alert }}</span>
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
      alert: "这是一条通知 : )",
      isAlertShow: false,
    };
  },
  methods: {
    // 捞
    getMessage: debounce(async function () {
      const { data } = await query();
      this.message = data.data;
      this.alertMsg(data.msg);
    }),
    // 扔
    newMessage: debounce(async function () {
      const { data } = await create(this.newMsg);
      // this.message = data.data;
      this.newMsg = "";
      this.alertMsg(data.msg);
      console.log(data);
    }),
    // 回
    replyMessage: debounce(async function () {
      console.log(123);
      const { data } = await reply({
        pid: this.message.id,
        msg: this.replyMsg,
      });
      // this.message = data.data;
      this.replyMsg = "";
      this.alertMsg(data.msg);
      console.log(data);
    }),
    // 提示
    alertMsg(msg) {
      this.alert = msg;
      this.isAlertShow = true;
      setTimeout(() => {
        this.isAlertShow = false;
      }, 1500);
      // this.$refs.alertBox.style;
    },
  },
  created() {
    console.log(123);
    this.getMessage();
  },
};
</script>
<style lang="less" scoped>
.turn {
  transform: rotate(-3deg);
}
.turnB {
  transform: rotate(6deg);
}
.home {
  max-width: 1000px;
  height: 100%;
  min-height: 500px;
  // background-color: #eee;
  margin: 0 auto;
}
h1 {
  margin-left: 20px;
  font-size: 60px;
  line-height: 3;
}
.paper {
  position: relative;
  background-color: #d2bf9e;
  margin: 50px auto;
  width: 80%;
  min-height: 250px;
  box-shadow: 8px 8px 20px 0px rgb(71, 71, 71);
  padding: 20px;
  p {
    font-size: 28px;
    line-height: 40px;
    color: #333;
    text-indent: 2em;
  }
  .replay {
    width: 100%;
    position: absolute;
    justify-content: space-around;
    bottom: 20px;
    right: 20px;
  }
}
// 按钮样式
.button {
  width: 80px;
  height: 40px;
  background-color: #aa6e08;
  border: solid 1px #fff;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  line-height: 38px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c28a29;
    outline: solid 3px rgba(255, 255, 255, 0.1);
  }
  &:active {
    background-color: #835505;
    outline: solid 2px rgba(255, 255, 255, 0.3);
    color: #eee;
  }
}
// 输入框样式
.textbox {
  margin-left: 50px;
  width: 60%;
  height: 50px;
  font-size: 20px;
  padding-left: 20px;
  border: solid 2px #999;
  outline: none;
  border-radius: 0;
  background-color: #d2bf9e;
}
// 通知样式
.alert {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 50px;
  font-size: 30px;
  line-height: 60px;
  text-align: center;
  transition: all 0.5s;
  &.default {
    top: -60px;
  }
  span {
    display: inline-block;
    // width: 500px;
    padding: 0 20px;
    height: 60px;
    border-radius: 30px;
    background-color: #8f764cab;
    color: #fff;
  }
}
</style>
