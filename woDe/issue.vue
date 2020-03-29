<template>
    <view class="issue">
         <view class="issue-box">
          <view class="issue-title">
              我不想看到某些企业发布的职位，怎么办?
          </view>
          <view class="issue-text">
             操作方法如下: 点击下方的我的【隐私设置】--【添加屏蔽企业】,添加的企业也无法查看您的在线简历,您也无法看到企业发布的职位。
          </view>
          <image class="issue-img" src="../static/icon/liucheng.png"></image>
          <image class="issue-imgtwo" src="../static/icon/liucheng2.png"></image>
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
    .issue{
        height: 100%;
        background-color: #ffffff;
        padding: 0 20rpx;
        box-sizing: border-box;
        .issue-box{
            height: 100%;
            background-color: #FFFFFF;
            .issue-title{
                font-weight: bold;
                font-size: 36rpx;
                color: #333333;
                height: 100rpx;
                line-height: 100rpx;
                border-bottom: 1rpx solid #f2f2f2;
            }
            .issue-text{
                font-size: 26rpx;
                color: #333333;
                line-height: 45rpx;
                margin-top: 20rpx;
                text-indent: 30rpx;
            }
            .issue-img{
            width: 100%;
            height: 95%;
            margin-top: 10rpx;
            }
            .issue-imgtwo {
                width: 100%;
                height: 60%;
                margin-top: 30rpx;
            }
        }
    }
</style>
