<template>
  <div class="login-wrap">
      <div class="vip-introduce">
        <h1 @click="fff">超级会员（SVIP）享专属特权</h1>
        <span>海量课程专享，付费课程免费学习，超低价课程，资源随心下，一切只为助力你的学习与成长。</span>
        <i class="vip-halo"></i>
      </div>
      <div class="vip-details">
        <div class="vip-year">
          <div class="vip-img"></div>
          <div class="vip-content">
            <h3>年度会员</h3>
            <label> 有效期为1年（365天）</label>
             <h3>¥199/年</h3>
          </div>
        </div>
<mt-button  size="large" plain @click.native="addOrderPay()">立即购买</mt-button>
      </div>
      <div class="vip-server">
        <h1>会员权益与服务说明</h1>
        <span>1、会员在有效期可免费学习会员免费课程。</span>
        <span>2、会员有效期，年度会员有效期为1年（365天）。</span>
        <span>1、会员在有效期可免费学习会员免费课程。</span>
        <span>2、会员有效期，年度会员有效期为1年（365天）。</span>
        <span>1、会员在有效期可免费学习会员免费课程。</span>
        <span>2、会员有效期，年度会员有效期为1年（365天）。</span>
      </div>
  </div>
</template>
<script>
// wechatPay
import {orderPay} from '@/api'
import {randomNo} from '@/utils/common'
export default {
  name: 'Member',
  data () {
    return {
      payObj: {
        comsumeDetail: '超级会员(365天)',
        comsumeSum: 0.01,
        courseId: '1239847788612403202'
      }
    }
  },
  methods: {
    fff () {
      // eslint-disable-next-line no-undef
      wx.scanQRCode({
      //  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          alert(JSON.stringify(res))
          var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
          alert('扫描结果：' + result)
        // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
        },
        error: function (res) {
          alert(res)
        }
      })
    },
    // pay () {
    //   let formData = '<xml><mch_id>' + 1559515401 + '</mch_id><nonce_str>' + this.rando() + '</nonce_str><sign>' + this.rando() + '</sign><key>' + 'Sjyitaksjhdyusadwq2019asmcyaskeq' + '</key> </xml>'
    //   wechatPay(formData).then(res => {
    //     console.log(res)
    //   })
    // },

    addOrderPay () {
      this.$popBox.Indicator.open()
      this.payObj.orderNumber = randomNo()
      orderPay(this.payObj).then(res => {
        if (res.code === 200) {
          this.$popBox.Indicator.close()
          this.payHandle(res.data)
        }
      }).catch(() => {
        this.$popBox.MessageBox('支付失败，稍后再试')
        this.$popBox.Indicator.close()
      })
    },
    onBridgeReady (data) {
      data.paySign = data.sign
      data.package = 'prepay_id=' + data.prepayid
      data.signType = 'MD5'
      console.log('=-=-=-=', data)
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } else {
            alert(res.err_msg)
          }
        })
    },
    payHandle (data) {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
      } else {
        this.onBridgeReady(data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrap{
  height: 100%;
  background: #f5f5f5;
  .vip-introduce{
    padding-top: 70px;
    height: 170px;
    background: #110c01;
    color:rgb(203, 159, 109);
    h1{
      font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin: 8px 0px 25px;
    }
    span{
          padding: 0px 55px;
    display: inline-block;
    }
    .vip-halo{
          position: absolute;
    left: 154px;
    top: 34px;
      display: inline-block;
      width: 50px;
      height: 50px;
      background-image: radial-gradient(circle,#5d3512, 30%,transparent 70%);;
    }
  }
  .vip-details{
      margin: 0px 10px;
      background: #fff;
      border-radius: 5px;
      margin-top:-40px;
      padding: 0px 8px 10px;
    .vip-year{
       display: flex;
       justify-content: start;
       padding: 8px;
       border-bottom: 1px solid gainsboro;
    .vip-img{
      min-width: 150px;
      min-height: 80px;
       background: #a7813a;

    }
    .vip-content{
        padding-left: 8px;
        h3{
          color: #4f4f4f;
          margin: 5px 0px;
          &:last-child{
            color:rgb(203, 159, 109);
          }
        }
        span{
          color: #838383;
        }
    }
    }
  }
}
/deep/.mint-button--large{
  border-color: rgb(203, 159, 109);;
  margin-top: 10px;
.mint-button-text{
  font-size: 15px;
  color:rgb(203, 159, 109);;
}
}
.vip-server{
  margin: 12px 10px;
h1{
  margin: 10px 0px;
  color: #000;
  font-weight: bold;
  font-size: 17px;
}
span{
  margin: 10px 0px;
      display: block;
    color: #969696;
}
}

</style>
