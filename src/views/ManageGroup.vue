<template>
    <div>
        <Header></Header>
        <el-row justify="center" type="flex">
            <el-col :span="12"><div class="manageGroup">
                <span>管理员申请</span>
            </div></el-col>
        </el-row>
        <el-row v-for="item in requestList" :key="item.id" justify="center" type="flex">
            <el-col :span="12"><div class="adminRequest">
                <el-avatar v-if="item.profile" id="userAvatar" :src="item.profile"></el-avatar>
                <el-avatar v-else id="userAvatar" icon="el-icon-user-solid"></el-avatar>
                <span id="itemUsername">{{ item.username }}</span>
                 <el-button class="accdecButton" type="success" round @click="acceptRequest(item.id)">同意</el-button>
                 <el-button class="accdecButton" type="danger" round @click="declineRequest(item.id)">拒绝</el-button>
            </div></el-col>
        </el-row>
        <el-row justify="center" type="flex">
        <el-col :span="12" v-if="requestList.length == 0"><div class="noRequest">
            <span>抱歉！目前暂无申请</span>
        </div></el-col>
        </el-row>
    </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import user from "@/store/user";

export default {
    name: 'Manage Group',
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            requestList:[],
            userId:'',
            isOwnerOrAdmin: false,
            admin:[],
            mainadmin:[],
        }
    },
    methods: {
        getRequest() {
            this.$axios({
                method:'get',
                url:'/api/v1/group/requestuser/' + this.$route.params.id,
            })
            .then(res =>{
                console.log(res);
                console.log(res.data.results.length);
                this.requestList = res.data.results;
            })
            .catch(err =>{
                console.log(err);
            })
        },
        acceptRequest(userId) {
        var header = {};
        if (localStorage.getItem("token"))
            header = { Authorization: "Bearer " + localStorage.getItem("token") };

        this.$axios({
            method: "put",
            url:
            "/api/v1/group/setRole/" +
            this.$route.params.id +
            "/" +
            userId +
            "/2",
            headers: header,
        })
            .then((res) => {
            console.log(res);
            this.$message.success("同意成功！");
            setTimeout(function () {
                location.reload(true);
            }, 500);
            })
            .catch((err) => {
            console.log(err);
            });
        },
        declineRequest(userId) {
        var header = {};
        if (localStorage.getItem("token"))
            header = { Authorization: "Bearer " + localStorage.getItem("token") };

        this.$axios({
            method: "put",
            url:
            "/api/v1/group/setRole/" +
            this.$route.params.id +
            "/" +
            userId +
            "/3",
            headers: header,
        })
            .then((res) => {
            console.log(res);
            this.$message.success("拒绝成功！");
            setTimeout(function () {
                location.reload(true);
            }, 500);
            })
            .catch((err) => {
            console.log(err);
            });
        },
        async getGroupInfo() {
            await this.$axios
                .all([
                this.getGroupMainAdmin(),
                this.getGroupAdmin(),
                ])
                .then(
                this.$axios.spread((gMAdmin, gAdmin) => {
                    this.admin = gAdmin.data.results;
                    this.mainadmin = gMAdmin.data.results;

                    for (let i = 0; i < gAdmin.data.results.length; i++) {
                    if (gAdmin.data.results[i].id === this.userId) {
                        this.isOwnerOrAdmin = true;
                        break;
                    }
                    }

                    if (gMAdmin.data.results[0].id === this.userId) {
                        this.isOwnerOrAdmin = true;
                    }

                    if(!this.isOwnerOrAdmin) {
                        this.$router.push({ path:'/group/' + this.$route.params.id})
                    }
                    console.log(this.isOwnerOrAdmin);
                })
                )
                .catch((err) => {
                console.log(err);
                });
        },
        getGroupMainAdmin() {
        return this.$axios({
            method: "get",
            url: "/api/v1/group/members/" + this.$route.params.id + "?role=1",
        });
        },
        getGroupAdmin() {
        return this.$axios({
            method: "get",
            url: "/api/v1/group/members/" + this.$route.params.id + "?role=2",
        });
        },
    },
    mounted() {
        this.getRequest();
        this.getGroupInfo();
    },
    created() {
        var userInfo;
        if ((userInfo = user.getters.getUser(user.state()))) {
            if (userInfo.user.confirmed) {
                this.userId = userInfo.user.id;
            }
        }
    }
}
</script>

<style scoped>
.manageGroup {
    /* background-color: red; */
    text-align: center;
    margin-top: 10px;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
}
.adminRequest {
    display: flex;
    background-color: #d0e8f2;
    /* border: 1px solid; */
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 30px;
    margin-bottom: 5px;
}
.accdecButton{
    /* float: right !important;
    margin-right: 10px; */
}
.noRequest{
    margin-top: 10px;
    text-align: center;
}
#itemUsername{
    margin-left: 10px;
    /* border: 1px solid; */
    width: 540px;
}
</style>