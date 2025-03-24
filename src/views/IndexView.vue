<script setup>
import api from '@/api';
import { useTokenStore } from '@/stores/token';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const tokenStore = useTokenStore()

const personClick = () => {
  router.push('/person')
}

const logoutClick = () => {
  tokenStore.setToken('')
  router.push('/login')
}


onMounted(() => {
  api.get('/admin/getInfo')
    .then((res) => {
      console.log(res);

    })
})


</script>

<template>


  <div class="index">
    <el-container>
      <el-aside width="200px">
        <h1 class="bolo-title">bolo管理系统</h1>
        <el-menu default-active="/" class="el-menu-vertical-demo" router>

          <el-menu-item index="/">
            <el-icon>
              <House />
            </el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-sub-menu index="video-manage">
            <template #title>
              <el-icon>
                <VideoCamera />
              </el-icon>
              <span>视频管理</span>
            </template>

            <el-menu-item index="/video-manage/videos">
              <span>视频列表</span>
            </el-menu-item>

            <el-menu-item index="/video-manage/check">
              <span>视频审核</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item>
              <span>管理员</span>
            </el-menu-item>
            <el-menu-item>
              <span>普通用户</span>
            </el-menu-item>
          </el-sub-menu>

        </el-menu>

      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <el-button @click="personClick" link>
              个人中心
            </el-button>
            <el-button @click="logoutClick" link>
              退出登录
            </el-button>
          </div>

        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style lang="less" scoped>
.index {
  .el-container {
    .el-aside {
      .bolo-title {
        font-size: 14px;
        border-right: 1px solid var(--el-menu-border-color);

        // 字体垂直居中
        text-align: center;
        height: 50px;
        line-height: 50px;
      }
    }

    .el-header {

      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
