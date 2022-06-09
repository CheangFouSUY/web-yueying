<template>
  <div class="groupInner">
    <Header id="header"></Header>

    <el-row id="main" :style="{ 'min-height': mainMinHeight + 'px' }">
      <el-col :span="20">
        <div class="groupInfo">
          <el-row>
            <el-col :span="7" :offset="1">
              <div class="title">
                <span>{{ groupInfo.name }}</span>
              </div>
            </el-col>
            <el-col :span="15" :offset="1">
              <div class="buttonSlot">
                <el-button id="changeName" @click="changeVisible = true" v-if="isOwnerOrAdmin">更改小组信息</el-button>
                <el-dialog title="更改小组信息" :visible.sync="changeVisible" :close-on-click-modal="false" :show-close="false">
                  <el-form label-position="top" :model="groupInfo">
                    <el-form-item label="小组名字" :label-width="formLabelWidth">
                      <el-input v-model="groupInfo.nameTemp" autocomplete="off" maxlength="10" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="小组简介" :label-width="formLabelWidth">
                      <el-input type="textarea" autosize v-model="groupInfo.descTemp" autocomplete="off" show-word-limit resize="none"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelChanges">取消</el-button>
                    <el-button type="primary" @click="updateGroupInfo">
                      确定更改
                    </el-button>
                  </div>
                </el-dialog>
                <el-button id="manageGroup" v-if="isOwnerOrAdmin" @click="manageGroup">查看管理员申请</el-button>
                <el-button id="disbandGroup" type="danger" v-if="isOwner" @click="disbandGroup">解散小组</el-button>
                <el-button id="joinGroup" @click="join" v-if="!isGroupMember && isLogin">加入小组</el-button>
                <el-button id="leaveGroup" @click="leave" v-if="isGroupMember && isLogin">退出小组</el-button>
                <el-button id="requestAdmin" v-if="isGroupMember && !isOwnerOrAdmin" @click="requestAdmin">申请成为管理员</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="1">
            <div class="groupPic">
              <el-upload v-if="isOwnerOrAdmin" id="avatar-uploader" action="" :http-request="uploadAvatar" :show-file-list="false" accept="image/jpeg,image/gif,image/png,image/jpg">
                <el-avatar v-if="groupInfo.pic" shape="square" :size="256" :src="groupInfo.pic"></el-avatar>
                <el-avatar v-else shape="square" :size="256" icon="el-icon-lollipop"></el-avatar>
                <div id="change-pic">更换头像</div>
                </el-upload>
                <div v-else>
                  <el-avatar v-if="groupInfo.pic" shape="square" :size="256" :src="groupInfo.pic"></el-avatar>
                  <el-avatar v-else shape="square" :size="256" icon="el-icon-lollipop"></el-avatar>
                </div>
              </div>
            </el-col>

            <el-col :span="18">
              <div class="groupInfoInfo">
                <el-row>
                  <el-col :span="12">
                    <div class="info">
                      <span class="infoText">创建人&nbsp;:&nbsp;</span>
                      <span class="infoText2">{{ groupInfo.owner }}</span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="info">
                      <span class="infoText">类型&nbsp;:&nbsp;</span>
                      <span class="infoText2">{{ groupInfo.type }}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="info">
                      <span class="infoText">创建日期&nbsp;:&nbsp;</span>
                      <span class="infoText2">{{ groupInfo.date }}</span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="info">
                      <span class="infoText">人数&nbsp;:&nbsp;</span>
                      <span class="infoText2">
                        {{ groupInfo.peoplecount }}
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <div class="info2">
                      <span class="infoText">简介&nbsp;:&nbsp;</span>
                      <span class="infoText3">{{ groupInfo.desc }}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-button id="post" v-if="isGroupMember" @click="openPostFeed" icon="el-icon-position">发表帖子</el-button>
                
                <el-dialog title="发布帖子" :visible.sync="formVisible">
                  <el-form label-position="top" :model="form">
                    <el-form-item label="标题" :label-width="formLabelWidth">
                      <el-input v-model="form.title" autocomplete="off" maxlength="25" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                      <el-input type="textarea" autosize v-model="form.description" autocomplete="off" minlength="25" show-word-limit resize="none"></el-input>
                      <el-upload
                        action=""
                        :auto-upload="false"
                        :on-change="handleChange"
                        :before-remove="beforeRemove"
                        :limit="1"
                        accept="image/jpeg,image/gif,image/png,image/jpg"
                        :on-exceed="handleExceed"
                      >
                        <el-button class="form-upload-img" size="small" type="primary">
                          <i class="el-icon-picture-outline-round"></i>
                          上传图片
                        </el-button>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="formVisible = false">取消</el-button>
                    <el-button type="primary" @click="postFeed()" v-loading.fullscreen.lock="fullscreenLoading">发布</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-row class="feed-header">
            <span :style="{ color: allColor }" @click="showAll()"> 所有 </span>
            <el-divider direction="vertical"></el-divider>
            <span :style="{ color: featureColor }" @click="showFeature()">
              精华
            </span>
          </el-row>
          <div class="group-feed" v-if="isShowFeature && status">
            <FeedBox
              v-for="item in featuredFeeds"
              :key="item.id"
              :initialFeedId="item.id"
              :initialIsGroup="true"
              :initialIsPin="item.isPin"
              :initialIsFeatured="item.isFeature"
              :initialIsAdmin="isOwnerOrAdmin"
            ></FeedBox>
          </div>
          <div class="group-feed" v-else-if="!isShowFeature && status">
            <FeedBox
              v-for="item in feeds"
              :key="item.id"
              :initialFeedId="item.id"
              :initialIsInnerpage="false"
              :initialIsGroup="true"
              :initialIsPin="item.isPin"
              :initialIsFeatured="item.isFeatured"
              :initialIsAdmin="isOwnerOrAdmin"
            ></FeedBox>
          </div>
        </el-row>
      </el-col>
      <el-col :span="4">
        <div class="groupMember">
          <el-row>
            <el-col :span="24">
              <div class="adminbar">
                <span>
                  管理员&nbsp;({{ groupInfo.admin.length + groupInfo.mainadmin.length }})
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row v-for="item in groupInfo.mainadmin" :key="item.id">
            <el-col :span="24">
              <div class="adminlist">
                <el-avatar v-if="item.profile" :size="30" :src="item.profile"></el-avatar>
                <el-avatar v-else :size="30" icon="el-icon-user-solid"></el-avatar>
                <span @click="toProfile(item.id)" class="setRole">&nbsp;{{ item.username }}</span>
                <i class="el-icon-star-off"></i>
              </div>
            </el-col>
          </el-row>
          <el-row v-for="item in groupInfo.admin" :key="item.id">
            <el-col :span="24">
              <div class="adminlist">
                <el-avatar v-if="item.profile" :size="30" :src="item.profile"></el-avatar>
                <el-avatar v-else :size="30" icon="el-icon-user-solid"></el-avatar>
                <span @click="toProfile(item.id)" class="setRole">&nbsp;{{ item.username }}</span>
                <i class="el-icon-star-off"></i>
                <i class="el-icon-more" @click="setRole1(item.id)" v-if="isOwner"></i>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="memberbar">
                <span>成员&nbsp;({{ groupInfo.member.length }})</span>
              </div>
            </el-col>
          </el-row>
          <el-row v-for="item in groupInfo.member" :key="item.id">
            <el-col :span="24">
              <div class="memberlist">
                <el-avatar v-if="item.profile" :size="30" :src="item.profile"></el-avatar>
                <el-avatar v-else :size="30" icon="el-icon-user-solid"></el-avatar>
                <span @click="toProfile(item.id)" class="setRole">
                  &nbsp;{{ item.username }}
                </span>
                <i class="el-icon-more" @click="setRole2(item.id)" v-if="isOwnerOrAdmin"></i>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-dialog title="组员设置" :visible.sync="setRoleVisible" :close-on-click-modal="false" :show-close="false">
          <el-form label-position="top" :model="groupInfo">
            <el-form-item label="设置小组职位">
              <el-button type="primary" v-if="isOwner" @click="setOwner">主管理员</el-button>
              <el-button type="primary" @click="setAdmin">管理员</el-button>
              <el-button type="primary" @click="setMember">普通成员</el-button>
            </el-form-item>
            <el-form-item v-if="isOwnerOrAdmin" label="其他">
              <el-button type="danger" @click="banUser">移出小组</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSetRole">取消</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <Footer id="footer"></Footer>
    <el-backtop target=".groupInner">
      <i class="el-icon-arrow-up" style="color: #456268"></i>
    </el-backtop>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeedBox from "@/components/FeedBox.vue";
import user from "@/store/user";

export default {
  name: "CreateGroup",
  components: {
    Header,
    Footer,
    FeedBox,
  },
  mounted() {
    this.getGroupInfo();
    this.getFeed();
    this.mainMinHeight = document.documentElement.clientHeight - $("#header").outerHeight(true) - $("#footer").outerHeight(true) - 6;
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if (userInfo) {
      this.userId = userInfo.user.id;
      this.isLogin = true;
    }
    console.log(this.groupInfo)
  },
  methods: {
    join() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "post",
        url: "/api/v1/group/joinleave/" + this.$route.params.id,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          setTimeout(function () {
            location.reload(true);
          }, 500);
          this.$message.success("成功加入小组");
        })
        .catch((error) => {
          console.log(error);
          switch(error.response.data.message) {
            case "User already join the group":
                this.$notify({
                title: "您已被该小组移除，请于7天后再申请加入小组。",
                type: "warning",
                position: "top-left",
              });
              break;

            default:
              this.$notify({
              title: "请先登录！",
              type: "warning",
              position: "top-left",
            });
          }
        });
    },
    leave() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "delete",
        url: "/api/v1/group/joinleave/" + this.$route.params.id,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          setTimeout(function () {
            location.reload(true);
          }, 500);
          this.$message.success("成功退出小组");
        })
        .catch((error) => {
          console.log(error.response.status);
          switch (error.response.status) {
            case 403:
              this.$message.warning("请在退出小组前将主管理员职位转移");
              break;
            default:
              this.$message.warning("无法退出小组");
          }
        });
    },
    cancelChanges() {
      this.changeVisible = false;
      this.groupInfo.nameTemp = this.groupInfo.name;
      this.groupInfo.descTemp = this.groupInfo.desc;
      this.$message.info("取消更改");
    },
    validateInput(input) {
      if (input.length > 9) {
        return "小组名少于10字符";
      } else return true;
    },
    async getGroupInfo() {
      await this.$axios
        .all([
          this.getGroupDetail(),
          this.getGroupMainAdmin(),
          this.getGroupAdmin(),
          this.getGroupMember(),
          this.getFeed(),
        ])
        .then(
          this.$axios.spread((gDetail, gMAdmin, gAdmin, gMember) => {
            console.log(gDetail);
            this.groupInfo.groupId = gDetail.data.id;
            this.groupInfo.name = gDetail.data.groupName;
            this.groupInfo.nameTemp = gDetail.data.groupName;
            this.groupInfo.owner = gDetail.data.owner;
            this.groupInfo.pic = gDetail.data.img;
            this.groupInfo.date = gDetail.data.createdAt.slice(0, 10);
            if (gDetail.data.category === "b") this.groupInfo.type = "图书";
            else if (gDetail.data.category === "m")
              this.groupInfo.type = "影视";
            else if (gDetail.data.category === "o")
              this.groupInfo.type = "其他";
            this.groupInfo.peoplecount = gDetail.data.members;
            this.groupInfo.desc = gDetail.data.description;
            this.groupInfo.descTemp = gDetail.data.description;
            this.groupInfo.member = gMember.data.results;
            this.groupInfo.admin = gAdmin.data.results;
            this.groupInfo.mainadmin = gMAdmin.data.results;

            for (let i = 0; i < gAdmin.data.results.length; i++) {
              if (gAdmin.data.results[i].id === this.userId) {
                this.isOwnerOrAdmin = true;
                this.isGroupMember = true;
                this.isAdmin = true;
                this.isOwnerOrAdminTemp = true;
                break;
              }
            }

            for (let i = 0; i < gMember.data.results.length; i++) {
              if (gMember.data.results[i].id === this.userId) {
                this.isGroupMember = true;
                break;
              }
            }

            if (gMAdmin.data.results[0].id === this.userId) {
              this.isOwnerOrAdmin = true;
              this.isOwnerOrAdminTemp = true;
              this.isGroupMember = true;
              this.isOwner = true;
              this.isOwnerTemp = true;
            }
            this.status = true;
          })
        )
        .catch((err) => {
          console.log(err);
        });
    },
    getGroupDetail() {
      return this.$axios({
        method: "get",
        url: "/api/v1/group/" + this.$route.params.id,
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
    getGroupMember() {
      return this.$axios({
        method: "get",
        url: "/api/v1/group/members/" + this.$route.params.id + "?role=3",
      });
    },
    openPostFeed() {
      if (this.isLogin) {
        this.formVisible = true;
      } else {
        this.$notify({
          title: "请先登录！",
          type: "warning",
          position: "top-left",
        });
      }
    },
    postFeed() {
      if (!this.form.title) {
        this.$notify({
          showClose: true,
          type: "warning",
          title: "标题不能为空",
          position: "top-left",
        });
        return;
      } else if (this.form.description.length < 25) {
        this.$notify({
          showClose: true,
          type: "warning",
          title: "帖子内容不能少于25字",
          position: "top-left",
        });
        return;
      }
      this.fullscreenLoading = true;
      let formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("img", this.form.img);
      formData.append("groupId", this.$route.params.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "post",
        url: "/api/v1/group/feed/create/" + this.$route.params.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          this.formVisible = false;
          console.log(res);
          this.fullscreenLoading = false;
          switch (res.status) {
            case 201:
              this.$notify({
                showClose: true,
                message: "已发表帖子",
                type: "success",
                position: "top-left",
              });
              setTimeout(function () {
                location.reload();
              }, 1500);
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          switch (err.response.status) {
            case 400:
              this.$notify({
                title: "标题和内容不能为空！",
                type: "warning",
                position: "top-left",
              });
              break;
            case 401:
              this.$notify({
                title: "请先加入小组！",
                type: "warning",
                position: "top-left",
              });
              break;
          }
        });
    },
    async uploadAvatar(file) {
      const formData = new FormData();
      formData.append("groupName", this.groupInfo.name);
      formData.append("description", this.groupInfo.desc);
      formData.append("img", file.file);
      formData.append("groupId", this.$route.params.id);
      console.log(file.file);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "put",
        url: "/api/v1/group/" + this.$route.params.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.groupInfo.pic = res.data.profile;
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateGroupInfo() {
      const formData = new FormData();
      formData.append("groupName", this.groupInfo.nameTemp);
      formData.append("description", this.groupInfo.descTemp);
      formData.append("owner", this.groupInfo.owner);
      formData.append("groupId", this.$route.params.id);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "put",
        url: "/api/v1/group/" + this.$route.params.id,
        data: formData,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.groupInfo.name = this.groupInfo.nameTemp;
          this.groupInfo.desc = this.groupInfo.descTemp;
          this.changeVisible = false;
          this.$message.success("修改信息成功！");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getFeed() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      await this.$axios({
        method: "get",
        url: "/api/v1/group/feed/list/" + this.$route.params.id,
        headers: header,
      }).then((res) => {
        this.feeds = res.data.results;
        for (let i = 0; i < this.feeds.length; i++) {
          if (this.feeds[i].isPin == 0) this.feeds[i].isPin = false;
          else this.feeds[i].isPin = true;
          if (this.feeds[i].isFeatured == 0) this.feeds[i].isFeatured = false;
          else this.feeds[i].isFeatured = true;
        }
        console.log(this.feeds);
      });
    },
    setRole1(abc) {
      if (this.isOwner) {
        this.setRoleVisible = true;
        //abc is the userId that we're gonna do something like ban or set role
        this.banOrput = abc;
      } else {
        this.$message.warning("非主管理员，无法对管理员进行操作");
      }
    },
    setRole2(abc) {
      console.log(abc);
      if (this.isGroupMember && !this.isOwnerOrAdmin) {
        this.$message.warning("非小组管理员，无法对用户进行操作");
      } else if (this.isOwnerOrAdmin) {
        this.setRoleVisible = true;
        //abc is the userId that we're gonna do something like ban or set role
        this.banOrput = abc;
      } else {
        this.$message.warning("非小组成员，无法对用户进行操作");
      }
    },
    cancelSetRole() {
      this.setRoleVisible = false;
    },
    banUser() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "put",
        url:
          "/api/v1/group/banMember/" +
          this.groupInfo.groupId +
          "/" +
          this.banOrput,
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.setRoleVisible = false;
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setOwner() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "put",
        url:
          "/api/v1/group/setRole/" +
          this.groupInfo.groupId +
          "/" +
          this.banOrput +
          "/1",
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.setRoleVisible = false;
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setAdmin() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "put",
        url:
          "/api/v1/group/setRole/" +
          this.groupInfo.groupId +
          "/" +
          this.banOrput +
          "/2",
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.setRoleVisible = false;
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setMember() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method: "put",
        url:
          "/api/v1/group/setRole/" +
          this.groupInfo.groupId +
          "/" +
          this.banOrput +
          "/3",
        headers: header,
      })
        .then((res) => {
          console.log(res);
          this.setRoleVisible = false;
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(file, fileList) {
      this.form.img = file.raw;
      console.log(this.form.img);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    showAll() {
      this.isShowFeature = false;
      this.allColor = "#79A3B1";
      this.featureColor = "#456268";
    },
    showFeature() {
      this.isShowFeature = true;
      this.featureColor = "#79A3B1";
      this.allColor = "#456268";
    },
    manageGroup() {
      this.$router.push({ path:'/managegroup/' + this.groupInfo.groupId})

    },
    disbandGroup() {
      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method:'delete',
        url:'/api/v1/group/' + this.groupInfo.groupId,
        headers: header,
      })
      .then(res =>{
        console.log(res);
        this.$message.success("解散小组成功！");
        this.$router.push({ path:'/group'})
      })
      .catch(err =>{
        console.log(err);
      })
    },
    requestAdmin() {
      const formData = new FormData();
      formData.append("user", this.userId);
      formData.append("group", this.groupInfo.groupId);
      formData.append("groupId", this.groupInfo.groupId);

      var header = {};
      if (localStorage.getItem("token"))
        header = { Authorization: "Bearer " + localStorage.getItem("token") };

      this.$axios({
        method:'post',
        url:'/api/v1/group/admin/' + this.groupInfo.groupId,
        data: formData,
        headers: header,
      })
      .then(res =>{
        console.log(res);
        this.$message.success("申请成功！请耐心等待管理员的批审")
      })
      .catch(err =>{
        console.log(err);
      })
    },
    toProfile(userid) {
      this.$router.push({ path: `/profile/${userid}` });
    },
  },
  computed: {
    featuredFeeds() {
      return this.feeds.filter((item) => {
        return item.isFeatured || item.isPin;
      });
    },
  },
  data() {
    return {
      status: false,
      fullscreenLoading: false,
      isGroupMember: false,
      isOwnerOrAdmin: false,
      isOwnerOrAdminTemp: false,
      isOwner: false,
      isOwnerTemp: false,
      isAdmin: false,
      isLogin: false,
      banOrput: "",
      url: "@/assets/Book.svg",
      userId: "",
      groupInfo: {
        groupId: "",
        name: "",
        nameTemp: "",
        pic: "",
        owner: "",
        date: "",
        time: "",
        type: "",
        peoplecount: "",
        desc: "",
        descTemp: "",
        mainadmin: [],
        admin: [],
        member: [],
      },
      form: {
        title: "",
        description: "",
        img: "",
      },
      formVisible: false,
      changeVisible: false,
      setRoleVisible: false,
      feeds: [],
      formLabelWidth: "120px",
      isShowFeature: false,
      allColor: "#79A3B1",
      featureColor: "#456268",
      mainMinHeight: "",
    };
  },
};
</script>

<style scoped>
.group-feed {
  width: 92%;
  margin-left: 50px;
}
.feed-header {
  cursor: pointer;
}
.feed-header {
  margin: 0 50px 20px;
  font-size: 24px;
}
.groupInfo .el-row {
  margin-bottom: 10px;
}
.groupInfoInfo .el-row {
  margin-bottom: 20px;
}
.groupMember .el-row {
  margin-bottom: 0px;
}
.groupPic:hover #change-pic {
  display: block;
}
#change-pic:hover {
  cursor: pointer;
}
#change-pic {
  display: none;
  height: 40px;
  width: 256px;
  position: absolute;
  top: 216px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
}
.groupInfo {
  width: 92%;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 40px;
  padding-bottom: 15px;
  background-color: #fcf8ec;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.25);
}
.title {
  margin-top: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #456268;
}
.buttonSlot {
  margin-top: 20px;
  height: 50px;
}
.groupMember {
  margin-top: 20px;
  max-height: 540px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px 0 0 0;
  overflow-y: auto;
  float: right;
  position: fixed;
  width: 255px;
}
.groupPost {
  margin-left: 50px;
}
.groupInfoInfo {
  height: 250px;
  margin-left: 30px;
  display: relative;
}
.info {
  font-size: 24px;
}
.info2 {
  font-size: 24px;
  display: flex;
}
.infoText {
  color: #79a3b1;
  font-weight: bold;
  display: inline-block;
}
.infoText2 {
  color: #456268;
  display: inline-block;
  max-width: 290px;
}
.infoText3 {
  color: #456268;
  display: inline-block;
  max-width: 630px;
  word-break: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
.adminbar,
.memberbar {
  height: 30px;
  background-color: #d0e8f2;
  color: #456268;
  border-radius: 10px 0 0 0;
  padding-left: 10px;
}
.adminlist,
.memberlist {
  display: flex;
  font-size: 20px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  flex-wrap: wrap;
}
.setRole:hover {
  color: #d0e8f2;
  cursor: pointer;
}
.feed-publisher {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 0px;
  color: #456268;
}
.el-icon-star-off {
  margin-top: 4px;
  margin-left: 5px;
}
.el-icon-more{
  margin-left: auto;
  margin-right: 5px;
  order: 2;
  transform: rotate(90deg);
}
.el-icon-more:hover{
  cursor: pointer;
}
.form-button:hover {
  cursor: pointer;
}
.form-upload-img {
  margin-top: 30px;
  padding: 5px 15px;
  border: none;
  background-color: rgba(121, 163, 177, 0.25);
  color: #456268;
  border-radius: 5px;
  font-size: 18px;
}
#changeName {
  margin-top: 5px;
  color: #456268;
  border-color: #456268;
  background-color: #fcf8ec;
}
#changeName:hover,
#leaveGroup:hover, #manageGroup:hover {
  background-color: rgb(205, 205, 205);
}
#joinGroup {
  margin-top: 5px;
  float: right;
  margin-right: 20px;
  background-color: #456268;
  color: #fcf8ec;
}
#leaveGroup {
  margin-top: 5px;
  float: right;
  margin-right: 20px;
  border-color: #456268;
  background-color: #fcf8ec;
  color: #456268;
}
#joinGroup:hover, #requestAdmin:hover {
  background-color: #79a3b1;
}
#requestAdmin {
  margin-top: 5px;
  margin-right: 10px;
  background-color: #456268;
  color: #fcf8ec;
  float: right;
}
#manageGroup {
  margin-top: 5px;
  margin-left: 10px;
  color: #456268;
  border-color: #456268;
  background-color: #fcf8ec;
}
#post {
  font-size: 20px;
  float: right;
  position: absolute;
  bottom: 0px;
  right: 20px;
  background-color: #d0e8f2;
  color: #456268;
}
.groupInner {
  height: 100vh;
  overflow-x: hidden;
}
#main {
  margin: auto;
  padding: 30px 0;
  box-sizing: border-box;
}
#footer {
  bottom: 0;
}

</style>

<style>
.el-dialog__header {
  background-color: #afc8d0;
}
.el-dialog__title,
.el-dialog__headerbtn i {
  color: #456268;
  font-size: 24px;
}
.el-form-item__label {
  color: #456268;
  font-size: 20px;
}
</style>