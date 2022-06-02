<template>
  <div>
        <Header></Header>
        <div class="resetPwd">
            <el-row justify="center" type="flex">
                <el-col :span="5"><div class="Title">
                <span>设置新密码</span>
                </div></el-col>
            </el-row>
            <el-row justify="center" type="flex">
                <el-col :span="5"><div class="Box">
                <span>新密码</span><el-input placeholder="请输入新密码" v-model="password1" show-password></el-input>
                </div></el-col>
            </el-row>
            <el-row justify="center" type="flex">
                <el-col :span="5"><div class="Box">
                <span>重复新密码</span><el-input placeholder="请重新输入新密码" v-model="password2" show-password></el-input>
                </div></el-col>
            </el-row>
            <el-row justify="center" type="flex">
                <el-col :span="8"><div class="Box">
                  <el-button type="primary" @click="confirmNewPassword">确定设置</el-button>
                </div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name:'ResetPwd1n2',
    components: {
        Header,
    },
    data() {
        return{
            password1:'',
            password2:'',
            token:'',
        }
    },
    methods: {
        returnLogin() {
            this.$router.push({ path:'/login'});
        },
        getToken(token) {
            this.$axios({
            method:'get',
            url:'/api/v1/auth/request-validate/?token=' + token,
            })
            .then((res) => {
                console.log(res);
                // console.log(res.data.tokens.access);
                localStorage.setItem('token', res.data.tokens.access);
            })
            .catch((error) => {
                console.log(error);
                this.$message.warning("此链接已过期，请重新申请邮箱验证");
                this.$router.push({path:'/emailverify'});
            });
    },
    confirmNewPassword() {
        if(this.password1 == '' || this.password2 == '') {
            this.$message.warning("新密码和重复新密码不可为空");
            return;
        }
        const formData = new FormData();
        formData.append("password", this.password1);
        formData.append("password2", this.password2);

        var header = {};
        if (localStorage.getItem("token"))
          header = { Authorization: "Bearer " + localStorage.getItem("token") };

        this.$axios({
            method:'put',
            url:'/api/v1/auth/resetpwd/email/',
            data: formData,
            headers: header,
            })
            .then((res) => {
                console.log(res);
                this.$router.push({ path:'/login'}),
                this.$message.success("设置成功，马上用新密码登录吧~")
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response.data.detail);

                if(error.response.data.detail == "Authentication credentials were not provided.")
                    this.$message.warning("此链接已过期，请重新申请邮箱验证");

                else switch(error.response.data.error[0]) {
                    case "Password must match.":
                        this.$message.warning("新密码和重复新密码不匹配");
                        break;
                    default:
                         this.$message.warning("密码需包含字母、数字及符号且字符数>=8");
                }
            });
        
    },
    },
    mounted() {
        const token = this.$route.query.token;
        this.getToken(token);
    }
}
</script>

<style scoped>
.resetPwd{
    margin-top: 100px;
}
.Box{
    margin: 20px;
    /* background-color: black; */
    text-align: center;
}
.Title{
    /* margin: 20px; */
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 0 0 5px #79A3B1;
}
.Box .el-input{
    margin-top: 10px;
}
.Box .el-button{
    background-color: #79A3B1;
    border-color: #79A3B1;
}
.Box .el-button:hover{
    background-color: #6f9caa;
    border-color: #6f9caa;
}
</style>