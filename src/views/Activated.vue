<template>
  <div>
        <Header></Header>
        <div class="activateSuccess">
        <el-row>
        <el-col  :lg="24">
            <el-result icon="success" title="恭喜！账号激活成功" subTitle="赶快到登录界面登录吧~">
            <template slot="extra">
                <el-button type="primary" @click="returnLogin">返回登录</el-button>
            </template>
            </el-result>
        </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name:'ActivateSuccess',
    components: {
        Header
    },
    data() {
        return{

        }
    },
    methods: {
        returnLogin() {
            this.$router.push({ path:'/login'} );
        },
        getToken(token) {
            this.$axios({
            method:'get',
            url:'/api/v1/auth/activate/?token=' + token,
            })
            .then((res) => {
                console.log(res);
                // console.log(res.data.tokens.access);
                // localStorage.setItem('token', res.data.tokens.access);
            })
            .catch((error) => {
                console.log(error);
                this.$message.warning("此链接已过期");
                this.$router.push({path:'/register'});
            });
        },
    },
    mounted() {
        const token = this.$route.query.token;
        this.getToken(token);
    }
}
</script>

<style>
.activateSuccess{
    /* border: 1px solid black; */
    margin-top: 130px;
}
.activateSuccess .el-result__icon svg{
    width: 128px;
    height: 128px;
}
.activateSuccess .el-result__title p{
    font-size: 36px;
}
.activateSuccess .el-result__subtitle p{
    font-size: 24px;
}
.activateSuccess .el-button--primary {
    color: #FFF;
    background-color: #79A3B1;
    border-color: #79A3B1;
}
.activateSuccess .el-button--primary:hover {
    color: #FFF;
    background-color: rgba(121, 163, 177, 0.6);
    border-color: rgba(121, 163, 177, 0.6);
}
.activateSuccess .el-button{
    font-size: 20px;
}
</style>