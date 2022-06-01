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
                  <el-button type="primary">确定设置</el-button>
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
        }
    },
    methods: {
        returnLogin() {
            this.$router.push({ path:'/login'} );
        }
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