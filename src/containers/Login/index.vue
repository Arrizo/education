<template>
  <div class="login-wrap">
    <div class="loging-file" v-show="register">
          <mt-navbar v-model="selected">
  <mt-tab-item id="tab1">登录</mt-tab-item>
  <mt-tab-item id="tab2">注册</mt-tab-item>
</mt-navbar>
    <mt-tab-container v-model="selected" :swipeable='true'>
  <mt-tab-container-item id="tab1">
<mt-field label="账号" placeholder="输入身份证或手机号码" v-model="commonUser.mobile"></mt-field>
<mt-field label="密码" placeholder="请输入密码" type='password' v-model="commonUser.password"></mt-field>
<mt-button type="primary" size="large" @click.native="loginSubmit()">登录</mt-button>
<div class="login-regist"><span @click="register=false">忘记密码</span> </div>
 </mt-tab-container-item>
  <mt-tab-container-item id="tab2">
<mt-field label="手机号" placeholder="请输入手机" v-model="registData.mobile"></mt-field>
<mt-field label="验证码" v-model="registData.code" placeholder="验证码">
 <mt-button type="primary" @click.native="getCode(registData,'regisCode','registText')" :disabled='regisCode'>{{registText}}</mt-button>
</mt-field>
<mt-field label="密码" placeholder="请输入密码" type='password' v-model="registData.password"></mt-field>
<mt-field label="确认密码" placeholder="请输入确认密码" type='password' v-model="registData.repassword"></mt-field>
<mt-button type="primary" size="large" @click.native="registSubmit()">注册</mt-button>
<div class="login-regist to-login"></div>
  </mt-tab-container-item>
</mt-tab-container>
</div>
<transition name="fade">
<div class="loging-file" v-show="!register">
  <mt-field label="手机号" placeholder="请输入手机" v-model="updataObj.mobile"></mt-field>
<mt-field label="验证码" v-model="updataObj.code" placeholder="验证码">
 <mt-button type="primary" @click="getCode(updataObj,'updataCode','updataText')" :disabled='updataCode'>{{updataText}}</mt-button>
</mt-field>
<mt-field label="密码" placeholder="请输入密码" type='password' v-model="updataObj.newPassword"></mt-field>
<mt-field label="确认密码" placeholder="请输入确认密码" type='password' v-model="updataObj.confirmPassword"></mt-field>
<mt-button type="primary" size="large" @click.native="updata_pass()">修改密码</mt-button>
<div class="login-regist to-login"> <span @click="register=true">登录</span> </div>
</div>
</transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {userLogin, userRegist, sendCode, updataPass, checkUser, updateMobile} from '@/api'
export default {
  name: 'Login',
  computed: {
    ...mapGetters([
      'clientData'
    ])
  },
  data () {
    return {
      selected: 'tab1',
      register: true,
      registText: '获取验证码',
      regisCode: false,
      updataText: '获取验证码',
      updataCode: false,
      commonUser: {mobile: '', password: ''},
      loginInfo: {},
      registData: {mobile: '', password: '', repassword: '', code: ''},
      updataObj: {mobile: '', newPassword: '', confirmPassword: '', code: ''}
    }
  },
  mounted () {
    console.log(this.$route.query.redirect)
  },
  methods: {
    async loginSubmit () {
      // /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0\d|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
      // if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.loginInfo.mobile.trim()))) {
      let regx = /(^\d{15}$)|(^\d{17}([0-9]|X)$)|(^1[3|4|5|7|8]\d{9}$)/
      if (!(regx.test(this.commonUser.mobile.trim()))) {
        this.$popBox.MessageBox('提示', '请输入正确账户')
        return false
      }
      if (this.commonUser.password.length < 6) {
        this.$popBox.MessageBox('提示', '请输入正确的密码')
        return false
      }
      this.loginInfo = {...this.commonUser}
      if (this.commonUser.mobile.trim().length > 11) {
        await new Promise((resolve, reject) => {
          checkUser({idCard: this.commonUser.mobile}).then(res => {
            if (!res.data.mobile) {
              this.$popBox.MessageBox.prompt('您未绑定手机号，请绑定正确手机号码', {
                inputPattern: /^1[3|4|5|7|8]\d{9}$/,
                inputErrorMessage: '请输入正确的手机号码'
              }).then(({ value, action }) => {
                this.loginInfo.mobile = value
                updateMobile({idCard: this.commonUser.mobile, mobile: value})
                resolve()
              })
            } else {
              this.loginInfo.mobile = res.data.mobile
              resolve()
            }
          })
        })
      }
      this.$popBox.Indicator.open()
      this.loginInfo.clientId = this.clientData.id
      userLogin(this.loginInfo).then(res => {
        if (res.code === 200) {
          this.$store.dispatch('loginInfo', res.data)
          this.$router.replace({path: this.$route.query.redirect || '/home'})
        } else {
          this.$popBox.MessageBox('提示', res.msg)
        }
        this.$popBox.Indicator.close()
      })
    },
    // 注册
    registSubmit () {
      if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.registData.mobile.trim())) || this.registData.mobile.trim().length !== 11) {
        this.$popBox.MessageBox('提示', '输入正确手机')
        return false
      }
      if (!this.registData.code.trim()) {
        this.$popBox.MessageBox('提示', '输入验证码')
        return false
      }
      if (this.registData.password.length < 6 || this.registData.password.length > 16) {
        this.$popBox.MessageBox('', '请输入6-16位的登录密码,区分大小写,不可有空格')
        return false
      }
      if (this.registData.password !== this.registData.repassword) {
        this.$popBox.MessageBox('', '两次输入密码不一致')
        return false
      }
      this.registData.clientId = this.clientData.id
      this.$popBox.Indicator.open()
      userRegist(this.registData).then(res => {
        if (res.code === 200) {
          this.$popBox.MessageBox.confirm('注册成功，立即登录?').then(action => {
            this.selected = 'tab1'
            this.loginInfo = {...this.registData}
            Object.assign(this.$data.registData, this.$options.data().registData)
          })
        } else {
          this.$popBox.MessageBox('', res.msg)
        }
        this.$popBox.Indicator.close()
      }).catch(() => {
        this.$popBox.Indicator.close()
        this.$popBox.MessageBox('', '注册失败，稍后再试')
      })
    },
    getCode (data, show, code) {
      sendCode({mobile: data.mobile, clientId: this.clientData.id}).then(res => {
        if (res.data.code === 200) {
          this.timeOut(show, code)
        }
      }).catch(() => {
        this.$popBox.MessageBox('', '验证码获取失败，稍后再试')
      })
    },
    timeOut (show, code) {
      this[show] = true
      let num = 60
      this[code] = num + '秒重试'
      let nt = setInterval(() => {
        if (num <= 0) {
          clearInterval(nt)
          this[code] = '重新获取'
          this[show] = false
        } else {
          num--
          this[code] = num + '秒重试'
        }
      }, 1000)
    },
    updata_pass () {
      if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.updataObj.mobile.trim())) || this.updataObj.mobile.trim().length !== 11) {
        this.$popBox.MessageBox('提示', '输入正确手机')
        return false
      }
      if (!this.updataObj.code.trim()) {
        this.$popBox.MessageBox('提示', '输入验证码')
        return false
      }
      if (this.updataObj.newPassword.length < 6 || this.updataObj.newPassword.length > 16) {
        this.$popBox.MessageBox('', '请输入6-16位的登录密码,区分大小写,不可有空格')
        return false
      }
      if (this.updataObj.confirmPassword !== this.updataObj.newPassword) {
        this.$popBox.MessageBox('', '两次输入密码不一致')
        return false
      }
      this.registData.clientId = this.clientData.id
      this.$popBox.Indicator.open()
      updataPass(this.updataObj).then(res => {
        if (res.code === 200) {
          this.$popBox.MessageBox.confirm('修改成功，立即登录?').then(action => {
            this.selected = 'tab1'
          })
        } else {
          this.$popBox.MessageBox(res.msg)
        }
        this.$popBox.Indicator.close()
      }).catch(() => {
        this.$popBox.Indicator.close()
        this.$popBox.MessageBox('密码重置失败，稍后再试')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrap{
  height: 100%;
  padding: 60px 10px;
.login-regist{
  height: 50px;
  line-height: 50px;
  margin: 5px;
  display: flex;
  font-size: 17px;;
  justify-content: flex-end;
}
.to-login{
justify-content: flex-end;
}
}
/deep/.mint-navbar{
  .mint-tab-item {
      .mint-tab-item-label{
        font-size:18px;
      }
      &.is-selected{
         border-bottom: 5px solid #26a2ff;/*no*/
      }
  }
}
</style>
