<template>
  <div class="login-container">
    <div class="sys-title" />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item v-if="pwdForm" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          size="mini"
        />
      </el-form-item>

      <el-tooltip
        v-if="pwdForm"
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="off"
            size="mini"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item v-if="!pwdForm" prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="手机号"
          name="phone"
          type="text"
          tabindex="3"
          autocomplete="on"
          size="mini"
        />
      </el-form-item>

      <div v-if="!pwdForm" class="code-box">
        <el-form-item prop="code" style="width: calc(100% - 142px);">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="code"
            v-model="loginForm.code"
            placeholder="验证码"
            name="code"
            type="text"
            tabindex="4"
            autocomplete="off"
            size="mini"
          />
        </el-form-item>
        <el-button
          type="primary"
          style="margin-bottom: 22px;"
          @click.native.prevent="handleLogin"
        >发送验证码</el-button>
      </div>

      <div>
        <el-button
          type="text"
          class="text-btn"
          @click.native="switchForm"
        >{{ pwdForm ? '验证码登录' : '密码登录' }}</el-button>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername, validPhone } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码！'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (validPhone(value)) {
        callback(new Error('您输入的手机号不合法！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        phone: '',
        code: ''
      },
      pwdForm: true,
      loginRules: {
        username: [
          {
            required: this.pwdForm,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: this.pwdForm,
            trigger: 'blur',
            validator: validatePassword
          }
        ],
        phone: [
          {
            required: !this.pwdForm,
            trigger: 'blur',
            message: '请输入手机号！'
          },
          { trigger: 'blur', validator: validatePhone }
        ],
        code: [
          {
            required: !this.pwdForm,
            trigger: 'blur',
            message: '请输入验证码！'
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    switchForm() {
      this.pwdForm = !this.pwdForm
      this.$refs['loginForm'].resetFields()
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #21caad;
$main_color: #21caad;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
  .login-container .el-button--primary {
    background-color: $bg;
    border-color: $bg;
    color: $cursor;
  }
  .el-button.text-btn.el-button--text {
    float: right;
    padding-top: 0px;
    color: $main_color;
    padding-bottom: 22px;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      // color: $light_gray;
      // height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    border: 1px solid rgba(0, 0, 0, 0.5);
    // background: rgba(0, 0, 0, 0.1);
  }
}
</style>

<style lang="scss" scoped>
$bg: #21caad;
$dark_gray: #889aa4;
$light_gray: #21caad;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  background: url(./../../assets/imgs/login-bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // background-size: cover;

  .sys-title {
    position: relative;
    width: 360px;
    height: 50px;
    margin: 0 auto;
    margin-top: 50px;
    background: url(./../../assets/imgs/sys-title.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    // padding: 160px 35px 0;
    padding: 20px 35px 0;
    margin: 0 auto;
    margin-top: 80px;
    overflow: hidden;
    background-color: #fff;
  }

  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .code-box {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
