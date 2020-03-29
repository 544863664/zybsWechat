<template>
    <view class="help">
        <view class="head">
            <image class="head-img" src="../static/icon/help.png"></image>
            <view class="head-text">我要反馈</view>
            <image class="head-img-right" src="../static/icon/back.png"></image>
        </view>
        <view class="question">常见问题解答</view>
        <view class="question-list">
            <view class="find-job" @click="gojob">
                <view class="job-text">找到工作了，如何删除我的简历</view>
                <image class="job-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="tips" @click="gotips">
                <view class="tips-text" >系统提示验证码获取过于频繁</view>
                <image class="tips-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="search" @click="goshield">
                <view class="search-text">如何让某些企业无法搜索到我的简历</view>
                <image class="search-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="issue" @click="goissue">
                <view class="issue-text" >我不想看到某些企业发布的职位，怎么办</view>
                <image class="issue-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="email" @click="goemail">
                <view class="email-text">如何修改邮箱</view>
                <image class="email-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="phone" @click="gophone">
                <view class="phone-text">如何修改手机号</view>
                <image class="phone-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="check" @click="gocheck">
                <view class="check-text">我的投递记录会被其他企业看到吗</view>
                <image class="check-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="how" @click="gohow">
                <view class="how-text">我是企业，如何在博士投招人</view>
                <image class="how-img-right" src="../static/icon/back.png"></image>
            </view>
            <view class="recall" @click="gorecall">
                <view class="recall-text">投出去的简历还能撤回吗</view>
                <image class="recall-img-right" src="../static/icon/back.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods:{
        gorecall(){
          uni.navigateTo({
              url:"/woDe/recall"
          })  
        },
        gohow(){
          uni.navigateTo({
              url:"/woDe/how"
          })
        },
        gocheck(){
          uni.navigateTo({
              url:"/woDe/check"
          })
        },
        gophone(){
          uni.navigateTo({
              url:"/woDe/phone"
          })
        },
        goemail(){
          uni.navigateTo({
              url:"/woDe/email"
          })
        },
        goissue(){
          uni.navigateTo({
              url:"/woDe/issue"
          })
        },
        goshield(){
          uni.navigateTo({
              url:"/woDe/shield"
          })
        },
        gojob(){
            uni.navigateTo({
                url:"/woDe/findjob"
            })
        },
        gotips(){
            uni.navigateTo({
                url:"/woDe/tips"
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.help {
    height: 100%;
    background-color: #ffffff;
    .head {
        width: 100%;
        height: 126rpx;
        padding: 0rpx 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .head-img {
            width: 40rpx;
            height: 37rpx;
        }
        .head-text {
            color: #333333;
            font-size: 30rpx;
            margin-right: 510rpx;
        }
        .head-img-right {
            height: 22rpx;
            width: 13rpx;
        }
    }
    .question {
        width: 100%;
        height: 60rpx;
        font-size: 30rpx;
        color: #333333;
        font-weight: bold;
        line-height: 60rpx;
        background-color: #f2f2f2;
        padding-left: 20rpx;
    }
    .question-list {
        height: 100%;
        background-color: #ffffff;
        box-sizing: border-box;
        padding: 0rpx 20rpx;
        .find-job,
        .tips,
        .search,
        .issue,
        .email,
        .phone,
        .check,
        .how,.recall{
            width: 100%;
            height: 126rpx;
            border-bottom: 1rpx solid #f2f2f2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .job-text,
            .tips-text,
            .search-text,
            .issue-text,
            .email-text ,.phone-text,.check-text,.how-text,.recall-text{
                color: #333333;
                font-size: 30rpx;
            }
            .job-img-right,
            .tips-img-right,
            .search-img-right,
            .issue-img-right,
            .email-img-right,.phone-img-right ,.check-img-right,.how-img-right,.recall-img-right{
                height: 22rpx;
                width: 13rpx;
            }
        }
    }
}
</style>
