<template>
    <view class="attend">
        <view class="inv-h-w">
            <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">我的邀约</view>
            <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">已报名会议</view>
            <view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" @click="Inv = 2">意向单位</view>
        </view>
        <view class="list-wrap" v-show="Inv == 0">
            <view class="adress">
                <view class="title">我的邀约地址</view>
                <view class="url-box flex">
                    <text class="url">www.91boshuo.com/qwed/12fgs</text>
                    <text class="copy">点击复制</text>
                </view>
            </view>
            <view class="code flex">
                <view>我的邀约二维码</view>
                <view class="code-right">
                    <image class="code-icon middle" src="../../../static/icon/code.png" mode="aspectFit"></image>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
            <view class="list-title">我的邀约人员</view>
            <view class="list" v-for="(item, i) in 8" :key="i">
                <image class="portrait" src="../../../static/icon/portrait.png" mode="aspectFit"></image>
                <view class="list-info">
                    <view class="info-top flex">
                        <text class="name">马丽</text>
                        <text class="meet">
                            <text class="num">3</text>
                            次参会
                        </text>
                    </view>
                    <view class="regist">2019-10-04 注册成功</view>
                </view>
            </view>
        </view>
        <view class="list-wrap" v-show="Inv == 1">
            <navigator url="/woDe/meetings" class="apply-list" v-for="(item, i) in 5" :key="i">
                <view class="apply-top">
                    <image class="school-img middle" src="../../../static/icon/school.png" mode="aspectFit"></image>
                    <view class="apply-text middle">
                        <view class="apply-title">2019年10月北京线下专场</view>
                        <view class="unit">主办单位：北京大学</view>
                        <view class="unit">承办单位：中研博硕英才网</view>
                    </view>
                </view>
                <view class="start-time flex">
                    <text>开始时间：2019-10-08 09:00</text>
                    <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </navigator>
        </view>
        <view class="list-wrap" v-show="Inv == 2">
            <view class="tips">您可以填写，线下招聘会您期望的参会单位，我们负责邀约让您可以和心仪的单位来一次期待的面对面沟通。</view>
            <view class="unit-list flex">
                <text class="key">姓名</text>
                <view class="value">
                    <input class="uni-input middle" value="马丽" maxlength="10" />
                    <image class="middle" src="../../../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
            <view class="unit-list flex">
                <text class="key">联系电话</text>
                <view class="value">
                    <input class="uni-input middle" value="13806931175" maxlength="11" />
                    <image class="middle" src="../../../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
            <view class="unit-list flex">
                <text class="key">学历</text>
                <picker class="value" @change="bindPickerChange" :value="index" :range="education">
                    <text class="name middle">{{ education[index] }}</text>
                    <image class="middle" src="../../../static/icon/back.png" mode="aspectFit"></image>
                </picker>
            </view>
            <view class="unit-list flex">
                <text class="key">学校</text>
                <view class="value">
                    <text class="name middle">武汉大学</text>
                    <image class="middle" src="../../../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
            <view class="unit-list flex">
                <text class="key">会议名称</text>
                <view class="value">
                    <text class="name middle">2019年秋季硕士、博士专场巡回招聘会（北京站）</text>
                    <image class="middle" src="../../../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
            <view class="unit-tttle">意向单位</view>
            <input class="uni-input comm-ipt" placeholder="请输入意向单位" />
            <input class="uni-input comm-ipt" placeholder="请输入意向单位" />
            <input class="uni-input comm-ipt" placeholder="请输入意向单位" />
            <input class="uni-input comm-ipt" placeholder="请输入意向单位" />
            <input class="uni-input comm-ipt" placeholder="请输入意向单位" />
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            Inv: 0
        };
    },
    components: {},
    mounted() {},
  onLoad(options) {
      this.Inv = options.index;
  },
    methods: {}
};
</script>

<style lang="scss" scoped>
.attend {
    .inv-h-w {
        display: flex;
        border-bottom: 1rpx solid #f2f2f2;
        background: #ff8421;
        font-size: 30rpx;
        color: #ffdd9a;
        height: 80rpx;
    }
    .inv-h {
        flex: 1;
        text-align: center;
        margin: 0 50rpx;
        height: 60rpx;
        line-height: 60rpx;
        margin-top: 10rpx;
    }
    .inv-h-se {
        color: #ffffff;
        border-bottom: 3rpx solid #ffffff;
        font-weight: 600;
    }
}
.list-wrap {
    background: #ffffff;
    padding: 20rpx;
    .adress {
        padding-bottom: 50rpx;
        border-bottom: 1rpx solid #f2f2f2;
        .title {
            font-size: 30rpx;
            color: #333333;
            padding: 30rpx 0;
        }
        .url-box {
            width: 100%;
            height: 28rpx;
            border: 1rpx solid #d9d9d9;
            background: #f2f2f2;
            color: #999999;
            font-size: 24rpx;
            line-height: 28rpx;
            padding: 30rpx 20rpx;
            .url {
                color: #1d97ff;
            }
            .copy {
                border-left: 1px solid #d8d8d8;
                padding-left: 20rpx;
            }
        }
    }
    .code {
        height: 130rpx;
        line-height: 130rpx;
        color: #333333;
        font-size: 30rpx;
        border-bottom: 1rpx solid #f2f2f2;
        .code-icon {
            width: 30rpx;
            height: 30rpx;
            margin-right: 20rpx;
        }
        .back-icon {
            width: 13rpx;
            height: 22rpx;
        }
    }
    .list-title {
        font-size: 30rpx;
        color: #333333;
        padding: 50rpx 0 30rpx 0;
    }
    .list {
        width: 100%;
        box-shadow: 0 0 10rpx #e9e9e9;
        border-radius: 12rpx;
        padding: 20rpx;
        background: #ffffff;
        margin-bottom: 20rpx;
        &:last-child {
            margin-bottom: 0;
        }
        .portrait {
            width: 90rpx;
            height: 90rpx;
            display: inline-block;
            vertical-align: middle;
        }
        .list-info {
            width: calc(100% - 90rpx);
            display: inline-block;
            vertical-align: middle;
            padding-left: 20rpx;
            .info-top {
                color: #333333;
                .name {
                    font-size: 30rpx;
                    font-weight: 600;
                }
                .meet {
                    font-size: 24rpx;
                    .num {
                        color: #ff4c4c;
                        margin-right: 5rpx;
                    }
                }
            }
            .regist {
                font-size: 24rpx;
                color: #999999;
                line-height: 50rpx;
            }
        }
    }
    .apply-list {
        width: 100%;
        box-shadow: 0 0 10rpx #e9e9e9;
        border-radius: 12rpx;
        background: #ffffff;
        margin-bottom: 20rpx;
        font-size: 24rpx;
        color: #999999;
        .apply-top {
            padding: 20rpx;
            border-bottom: 1rpx solid #f2f2f2;
            .school-img {
                width: 120rpx;
                height: 120rpx;
                margin-right: 20rpx;
            }
            .apply-title {
                font-size: 30rpx;
                color: #333333;
                font-weight: 600;
            }
            .unit {
                line-height: 40rpx;
            }
        }
        .start-time {
            padding: 20rpx;
            .back-icon {
                width: 13rpx;
                height: 22rpx;
            }
        }
    }
    .tips {
        font-size: 24rpx;
        color: #333333;
        text-align: center;
        line-height: 40rpx;
        padding: 20rpx 20rpx 40rpx;
        border-bottom: 1rpx solid #f2f2f2;
    }
    .unit-list {
        line-height: 120rpx;
        border-bottom: 1rpx solid #f2f2f2;
        font-size: 30rpx;
        color: #333333;
        .value {
            font-size: 24rpx;
            color: #999999;
            .uni-input {
                text-align: right;
            }
            image {
                width: 13rpx;
                height: 22rpx;
                margin-left: 16rpx;
            }
        }
    }
    .unit-tttle {
        font-size: 30rpx;
        color: #333333;
        font-weight: 600;
        padding: 50rpx 0 30rpx 0;
    }
    .comm-ipt {
        background: #f2f2f2;
        border: 1px solid #d9d9d9;
        margin-bottom: 30rpx;
        padding-left: 20rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 24rpx;
        color: #999999;
    }
    .save {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }
}
</style>
