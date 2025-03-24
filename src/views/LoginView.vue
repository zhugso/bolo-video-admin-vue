<script setup>
import api from '@/api'
import { useTokenStore } from '@/stores/token'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 登录验证码url地址
const loginCaptchaImageUrl = ref('')

let captchaKey = ''
// 获取登录验证码
const getLoginCaptcha = () => {
  api.get('/admin/login/captcha')
    .then(function (response) {
      // 处理成功情况
      console.log('获取验证码数据：', response)
      captchaKey = response.data.key
      loginCaptchaImageUrl.value = response.data.image
    })
}

//=================== 登录 =========================
const loginForm = reactive({
  name: '',
  password: '',
  captchaCode: '',
  captchaKey: '',
})
const loginFormRules = {
  name: [
    {
      required: true,
      message: '请输入账号！',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码！',
      trigger: 'blur'
    },
  ],
  captchaCode: [
    {
      required: true,
      message: '请输入验证码！',
      trigger: 'blur'
    },
  ],
}
const tokenStore = useTokenStore()
const ruleLoginFormRef = ref()
const loginFormSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 验证码key添加到form表单中
      loginForm.captchaKey = captchaKey
      console.log('提交的表单数据：', loginForm)
      // 发起post请求，登录
      api.post('/admin/login', loginForm)
        .then((response) => {
          console.log('响应的数据：', response);
          if (response.code === '200') {
            // 登录成功
            // 保存返回的token
            tokenStore.setToken(response.data)
            router.push('/')
          } else if (response.code === '301') {
            // 验证码错误
          } else if (response.code === '302') {
            // 账号不存在
          } else if (response.code === '303') {
            // 账号或密码错误
          }
        })
    }
  })
}
const handleKeyDown = (event) => {
  if (event.ent && event.key === 'b') {
    // 在这里执行要触发的逻辑
    console.log('Alt + B is pressed!')
  }
}


// ================= 生命周期操作 ==============

onMounted(() => {
  getLoginCaptcha()
  document.addEventListener('keydown', handleKeyDown)
})


</script>

<template>
  <div class="login">
    <div class="login-main-container">
      <div class="header-img">
        <el-icon :size="60" color="rgb(121.3, 187.1, 255)">
          <UserFilled />
        </el-icon>
      </div>
      <el-form class="login-container" ref="ruleLoginFormRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item label="账号:" prop="name" label-position="top">
          <el-input v-model="loginForm.name" autocomplete="off" size="large">
          </el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password" label-position="top">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" size="large">
          </el-input>
        </el-form-item>

        <el-form-item label="验证码:" prop="captchaCode" label-position="top">
          <div class="captcha">
            <el-input @keydown.enter="loginFormSubmit(ruleLoginFormRef)" v-model="loginForm.captchaCode"
              autocomplete="off" size="large"></el-input>
            <el-image :src="loginCaptchaImageUrl" @click="getLoginCaptcha" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" plain @click="loginFormSubmit(ruleLoginFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;


  .login-main-container {
    width: 26%;

    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    margin-top: 30px;

    background-color: rgb(235.9, 245.3, 255);

    .header-img {
      margin-top: 30px;
      border-radius: 3px;
      background-color: #fff;
    }

    .login-container {
      margin-top: 20px;
      margin-bottom: 30px;

      .login-btn {
        height: 40px;
        width: 100%;
        margin-top: 10px;
      }

      .logon-btn {
        height: 40px;
        width: 100%;
        margin-top: 10px;
      }

      .captcha {
        display: flex;

        >.el-input {
          height: 40px;
        }

        .el-image {
          width: 120px;
          height: 40px;
          margin-left: 5px;
        }
      }

    }
  }

}
</style>
