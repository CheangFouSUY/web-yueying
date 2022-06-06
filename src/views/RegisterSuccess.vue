<template>
  <div>
        <Header></Header>
        <div class="registerSuccess">
        <el-row>
        <el-col  :lg="24">
            <el-result icon="success" title="注册成功" subTitle="请到邮箱进行验证">
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
    name:'RegisterSuccess',
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
        }
    }
}
</script>

<style>
.registerSuccess{
    margin-top: 130px;
}
.registerSuccess .el-result__icon svg{
    width: 128px;
    height: 128px;
}
.registerSuccess .el-result__title p{
    font-size: 36px;
}
.registerSuccess .el-result__subtitle p{
    font-size: 24px;
}
.registerSuccess .el-button--primary {
    color: #FFF;
    background-color: #79A3B1;
    border-color: #79A3B1;
}
.registerSuccess .el-button--primary:hover {
    color: #FFF;
    background-color: rgba(121, 163, 177, 0.6);
    border-color: rgba(121, 163, 177, 0.6);
}
.registerSuccess .el-button{
    font-size: 20px;
}
</style>