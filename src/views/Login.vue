<template>
  <div class="login">
    <Header id="header"></Header>
    <img id="bg" src="@/assets/background.jpg" :style="{ height: bgHeight + 'px' }"/>
    <div class="info">
      <div id="logo">
        <img src="@/assets/logo.png" />
      </div>
      <div class="inputBox">
        <img class="icon" src="@/assets/Email.svg" alt="email_icon" />
        <input type="text" v-model="form.username" placeholder="请输入用户名或邮箱"/>
      </div>
      <div class="inputBox">
        <img class="icon" src="@/assets/Password.svg" alt="password_icon" />
        <input @keyup.enter="Login" type="password" v-model="form.password" placeholder="请输入密码"/>
      </div>
      <div class="ForgetnRegister">
        <span @click="ForgetPw">忘记密码</span>
        <span id="symbol">|</span>
        <span @click="RegisterNow">立即注册</span>
      </div>
      <button @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Login",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      bgHeight: "",
    };
  },
  mounted() {
    this.bgHeight =  document.documentElement.clientHeight - $("#header").outerHeight(true) - 1;
  },
  methods: {
    ForgetPw() {
      this.$router.push("/emailverify");
    },
    RegisterNow() {
      this.$router.push("/register");
    },
    async Login() {
      if (this.form.username == "" || this.form.password == "") {
        this.$message.warning("邮箱/用户名和密码不可为空");
        return;
      }

      const formData = new FormData();
      formData.append("username", this.form.username);
      formData.append("password", this.form.password);

      await this.$axios({
        method: "post",
        url: "/api/v1/auth/login/",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          switch (res.status) {
            case 200:
              console.log(res.status);
              localStorage.setItem("token", res.data.tokens.access);
              this.$message.success("登录成功！");
              this.$store.dispatch("saveUserInfo", {
                user: {
                  username: res.data.username,
                  confirmed: true,
                  id: res.data.id,
                  profilePic: res.data.profile,
                },
              });

              const history_pth = localStorage.getItem("preRoute");
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 500);
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning("用户名/邮箱不存在或密码错误");
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
.login #logo img {
  width: 280px;
}
.login input {
  display: inline-block;
  background: none;
  border: none;
  width: 350px;
  height: 55px;
  font-size: 20px;
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.login input:focus {
  outline: none;
}
.login button {
  display: block;
  margin: 20px auto;
  height: 50px;
  width: 420px;
  border: none;
  background-color: rgba(245, 245, 245, 0.5);
  border-radius: 10px;
  font-size: 20px;
  font-weight: 100;
  letter-spacing: 2.5em;
  text-indent: 2.5em;
  color: rgb(72, 44, 1);
}
.login button:hover {
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  outline: none;
}
.ForgetnRegister span {
  display: inline-block;
  font-size: 18px;
  color: whitesmoke;
  cursor: pointer;
  margin-left: 10px;
}
.ForgetnRegister {
  display: inline-block;
  margin-left: 220px;
  width: 190px;
  margin-bottom: 20px;
}
.ForgetnRegister span:hover {
  color: rgb(248, 225, 202);
}
.login .inputBox {
  width: 420px;
  height: 55px;
  margin: 30px auto 0px;
  border-radius: 10px;
  background-color: rgba(90, 86, 86, 0.532);
}
.login .icon {
  display: inline;
  vertical-align: middle;
  width: 40px;
  margin: auto 10px 10px 10px;
}
.login .inputBox:focus-within {
  background-color: rgba(77, 72, 65, 0.6);
}
.login .inputBox:hover {
  background-color: rgba(77, 72, 65, 0.6);
}
#symbol {
  cursor: default;
  font-size: 25px;
  color: rgba(245, 245, 245, 0.523);
}
#symbol:hover {
  color: rgba(245, 245, 245, 0.523);
}
input,
select,
textarea {
  color: whitesmoke;
}
input::placeholder {
  color: whitesmoke;
}
#bg {
  width: 100%;
  position: absolute;
  z-index: -1;
  object-fit: cover;
}
.info {
  text-align: center;
  width: 720px;
  margin: 50px auto;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: rgba(245, 245, 245, 0.326);
}
</style>