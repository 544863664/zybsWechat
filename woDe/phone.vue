<template>
    <view class="phone">
       <view class="phone-box">
         <view class="phone-title">如何修改手机号?</view>
         <view class="phone-text">操作方法如下: 点击下方的我的页面 -- 再点击编辑图标到个人信息 -- 再点击编辑图标即可编辑手机号</view>
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
    .phone{
      height: 100%;
      background-color: #ffffff;
      padding: 0 20rpx;
      box-sizing: border-box;
      .phone-box{
          height: 100%;
          background-color: #ffffff;
          .phone-title{
              font-weight: bold;
              font-size: 36rpx;
              color: #333333;
              height: 100rpx;
              line-height: 100rpx;
              border-bottom: 1rpx solid #f2f2f2;
          }
          .phone-text{
              font-size: 26rpx;
              color: #333333;
              line-height: 45rpx;
              margin-top: 20rpx;
              text-indent: 30rpx;
          }
      }
    }
</style>
