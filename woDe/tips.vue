<template>
    <view class="tips">
          <view class="tips-box">
             <view class="tips-title">
                 系统提示验证码获取过于频繁怎么办?
             </view>
             <view class="tips-text">
你点击修改重复发送验证码太频繁，验证码是个对个人信息隐私很重要的数据，为了保护你的安全，才会出现这个。
需要你停止发送验证码，等待十分钟后再次申请验证码，如果你操作行为严重，可能会一天以后。
             </view>
          </view>
    </view>
</template>

<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>

<style lang="scss" scoped>
    .tips{
        height: 100%;
        background-color: #FFFFFF;
        padding: 0 20rpx;
        box-sizing: border-box;
        .tips-box{
          height: 100%;
          background-color: #FFFFFF;
          .tips-title{
              font-weight: bold;
              font-size: 36rpx;
              color:#333333;
              height: 100rpx;
              line-height: 100rpx;
              border-bottom: 1rpx solid #F2F2F2;
          }
          .tips-text{
              font-size: 26rpx;
              color:#333333;
              line-height: 45rpx;
              margin-top:20rpx;
              text-indent:30rpx;
          }
        }
    }
</style>
