<template>
  <div class="hit-det">
    <div class="hit-bg">
      <div class="result">
          <h1>{{$route.query.items.score}}分</h1>
          <h4>本次测试成绩</h4>
      </div>
      <div class="hit-percent">
         <div>
           <span class="start-title">正确题数</span><span class="seconde" :style="{width:$route.query.items.rightCount+'px'}"></span><span>{{$route.query.items.rightCount}}</span>
          <!-- <mt-progress :value="222" :bar-height="5">
              <div slot="start" class="start-progress"></div>
            <div slot="end">{{detailsObj.errorCount}}333</div></mt-progress> -->
         </div>
         <div>
               <span class="start-title">错误题数</span><span class="seconde" :style="{width:$route.query.items.errorCount+'px'}"></span><span>{{$route.query.items.errorCount}}</span>
            <!-- <mt-progress :value="6" :bar-height="5">
              <div slot="start" class="start-progress"></div>
            <div slot="end">{{detailsObj.}}</div></mt-progress> -->
         </div>
         <div>
            <!-- <mt-progress :value="6" :bar-height="5">
              <div slot="start" class="start-progress">正确题数</div>
            <div slot="end">{{detailsObj.examTime}}</div></mt-progress>
          <h1>{{detailsObj.}}min</h1>
          <h4></h4> -->
           <span class="start-title">考试用时:</span><span></span><span>{{ time($route.query.items.examTime)}}</span>
         </div>
      </div>

    </div>
      <mt-button type="primary" class="primary" size='large' @click="$router.go(-1)">确认</mt-button>
  </div>
</template>
<script>
// import {historyDetail} from '@/api'
import {timeOut} from '@/utils/common'
export default {
  name: 'historyDetail',
  data () {
    return {
      detailsObj: {}
    }
  },
  created () {
    // this.getDetails()
  },
  methods: {
    time (time) {
      return timeOut(time)
    }
    // getDetails () {
    //   historyDetail({id: this.$route.query.id}).then(res => {
    //     if (res.data) {
    //       this.detailsObj = res.data
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.hit-det{
  height: calc(100vh - 40px);
  padding-top: 80px !important;
  padding: 40px 20px;
box-sizing: border-box;
  .hit-bg{
    width: 100%;
    // height: 100%;
      // background-image: linear-gradient(-45deg, #1897bb, #89bfe4);
      padding: 70px 0px ;
      box-sizing: border-box;
      .result{
        text-align: center;
        margin-bottom: 30px;
        h1{
          margin: 0 auto;
          background: #f9f6f2;
              font-weight: bold;
            font-family: serif;
            font-size: 42px;
            height: 120px;
            width: 120px;
            line-height: 120px;
            border-radius: 50%;
            margin-bottom: 15px;
        }
        h4{
          color: #26a2ff;
          padding: 5px;
          background-color: #f1f9ff;
          border-radius: 20px;
        }
      }
      .hit-percent{
         div{
            padding: 15px 0px;
        span{
          display: inline-block;
          &:first-child{
            font-size: 14px;
            color: #636262;;
            margin-right: 10px;
          }
          &:last-child{
              margin-left: 5px;
          }
        }
                .seconde{
background: #26a2ff;
max-width: 250px;
overflow: hidden;
height: 8px;
border-radius: 5px;
// vertical-align: middle;
        }
         }
      }
  }
}
.primary{
  display: block;
}
</style>
