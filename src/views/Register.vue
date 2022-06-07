<template>
  <div>
    <Header id="header"></Header>
    <img id="bg" src="@/assets/background.jpg" :style="{ height: bgHeight + 'px' }"/>
    <div id="registerBox">
      <div id="logo">
        <img src="@/assets/logo.png" />
      </div>
      <div class="Row">
        <span>用户名</span>
        <input type="text" v-model="form.username" placeholder="例 : 黄乐乐" />
      </div>
      <div class="Row">
        <span>邮箱</span>
        <input
          type="email"
          v-model="form.email"
          placeholder="example@gmail.com"
        />
      </div>
      <div class="Row">
        <span>密码</span>
        <input type="password" v-model="form.password" placeholder="密码需包含字母、数字及符号"/>
      </div>
      <div class="Row">
        <span>重复密码</span>
        <input type="password" v-model="form.password2" placeholder="请重新输入密码"/>
      </div>
      <div class="Row">
        <span>密保问题</span>
        <select id="sQuestion" name="sQuestion" v-model="form.securityQ">
          <option value="0" style="display: none"></option>
          <option value="1">您最喜欢的颜色是？</option>
          <option value="2">您最讨厌的食物？</option>
          <option value="3">您的最要好闺蜜/兄弟是？</option>
          <option value="4">您的爱好是？</option>
          <option value="5">您的初恋是？</option>
        </select>
      </div>
      <div class="Row">
        <span>密保答案</span>
        <input type="text" v-model="form.securityQans" placeholder="请输入密保答案"/>
      </div>
      <button id="goLogin" @click="Login">已有帐号，立即登录</button>
      <div>
        <button id="submit" @click="Submit" v-loading.fullscreen.lock="fullscreenLoading">
          注册
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Register",
  components: {
    Header,
  },
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        password2: "",
        securityQ: 0,
        securityQans: "",
      },
      fullscreenLoading: false,
      bgHeight: "",
    };
  },
  mounted() {
    this.bgHeight =  document.documentElement.clientHeight - $("#header").outerHeight(true) - 1;
  },
  methods: {
    Login() {
      this.$router.push("/login");
    },
    Submit() {
      if (
        this.form.username === "" ||
        this.form.email === "" ||
        this.form.password === "" ||
        this.form.password2 === "" ||
        this.form.securityQ === 0 ||
        this.form.securityQans === ""
      ) {
        this.$message.warning("请填写所有空格（包括密保问题）");
        return;
      }
      if (this.form.username.length > 10) {
        this.$message.warning("名字字符数不超过10");
        return;
      }
      this.fullscreenLoading = true;
      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("username", this.form.username);
      formData.append("password", this.form.password);
      formData.append("password2", this.form.password2);
      formData.append("securityQuestion", this.form.securityQ);
      formData.append("securityAnswer", this.form.securityQans);

      this.$axios({
        method: "post",
        url: "/api/v1/auth/register/",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          switch (res.status) {
            case 201:
              // this.$message.success("注册成功，请到邮箱进行认证");
              this.$router.push("/registersuccess");
              this.fullscreenLoading = false;
              this.$store.dispatch("saveUserInfo", {
                user: {
                  confirmed: false,
                },
              });
              break;
          }
        })
        .catch((err) => {
          console.log(err.response.data.code);
          // const key = Object.keys(err.response.data)[0];
          // switch(err.response.data[key][0]) {
          switch (err.response.data.code) {
            case 1001:
              this.$message.warning("邮箱已被使用");
              break;
            case 1002:
              this.$message.warning("用户名已被使用");
              break;
            case 1003:
              this.$message.warning("密码与重复密码不匹配");
              break;
            case 1004:
              this.$message.warning("密码需包含字母、数字及符号且字符数>=8");
              break;
            default:
              this.$message.warning("填写信息错误");
          }
        });
    },
  },
};
</script>

<style scoped>
::placeholder {
  color: rgba(245, 245, 245, 0.5);
  font-size: 18px;
}
#logo img{
  width: 210px;
}
input:focus,
select:focus {
  background-color: rgba(77, 72, 65, 0.6);
  outline: none;
}
input:hover {
  background-color: rgba(77, 72, 65, 0.6);
}
input, #sQuestion {
  display: inline-block;
  margin: 5px auto;
  height: 45px;
  width: 350px;
  padding-left: 20px;
  border: none;
  border-radius: 10px;
  background-color: rgba(90, 86, 86, 0.5);
  color: whitesmoke;
  font-size: 20px;
  vertical-align: middle;
  box-sizing: border-box;
  -webkit-border-sizing: border-box;
  -moz-border-sizing: border-box;
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
#sQuestion:hover {
  background-color: rgba(77, 72, 65, 0.6);
  cursor: pointer;
}
#sQuestion {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
  color: whitesmoke;
  outline: none;
}
#sQuestion option {
  background-color: whitesmoke;
  color: rgb(72, 44, 1);
}

#goLogin {
  width: 480px;
  margin: 0 auto;
  text-align: right;
  font-size: 14px;
  color: whitesmoke;
  border: none;
  background: none;
}
#goLogin:hover {
  color: rgb(248, 225, 202);
}

#submit {
  height: 50px;
  width: 460px;
  margin: 20px auto;
  border: none;
  font-size: 20px;
  border-radius: 10px;
  background-color: rgba(245, 245, 245, 0.459);
  border-radius: 10px;
  font-size: 20px;
  letter-spacing: 2.5em;
  text-indent: 2.5em;
  color: rgb(72, 44, 1);
}
#submit:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}
button {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
  cursor: pointer;
}
#registerBox span {
  width: 80px;
  display: inline-block;
  color: whitesmoke;
  margin: auto 15px auto;
  vertical-align: middle;
  text-align: right;
  /* outline: 1px black solid; */
}
#registerBox {
  margin: 20px auto;
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
  width: 720px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: rgba(245, 245, 245, 0.326);
}
#bg {
  width: 100%;
  position: absolute;
  z-index: -1;
  object-fit: cover;
}
</style>