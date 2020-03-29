<template>
    <view class="myorder">
        <view class="inv-h-w">
            <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">全部</view>
            <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">待支付</view>
        </view>
        <view class="list-wrap" v-show="Inv == 0">
            <view class="list" v-for="(item, i) in 5" :key="i">
                <view class="list-top">
                    <view class="order-wrap flex">
                        <view class="order-num">订单号：201912226739678348</view>
                        <text class="unpaid">待支付</text>
                    </view>
                    <view class="stick flex">
                        <view class="stick-left">
                            <image class="stick-img middle" src="../../../static/icon/stick.png" mode="aspectFit"></image>
                            <text class="middle">15天简历置顶</text>
                        </view>
                        <view class="stick-time">2019-12-22 09:12</view>
                    </view>
                </view>
                <view class="stick-bot flex">
                    <view class="bot-left">
                        <text class="yuan">¥ 99元</text>
                        <text class="coin">(或990中研币)</text>
                    </view>
                    <text class="pay">支付</text>
                </view>
            </view>
            <view class="list" v-for="(item, i) in 2" :key="i">
                <view class="list-top">
                    <view class="order-wrap flex">
                        <view class="order-num">订单号：201912226739678348</view>
                        <text class="paid">已支付</text>
                    </view>
                    <view class="stick flex">
                        <view class="stick-left">
                            <image class="stick-img middle" src="../../../static/icon/stick.png" mode="aspectFit"></image>
                            <text class="middle">15天简历置顶</text>
                        </view>
                        <view class="stick-time">2019-12-22 09:12</view>
                    </view>
                </view>
                <view class="stick-bot flex">
                    <view class="bot-left">
                        <text class="icon">实际付款:</text>
                        <text class="yuan">180元</text>
                    </view>
                    <text class="pay paid-btn">已支付</text>
                </view>
            </view>
        </view>
        <view class="list-wrap" v-show="Inv == 1">
            <view class="list" v-for="(item, i) in 3" :key="i">
                <view class="list-top">
                    <view class="order-wrap flex">
                        <view class="order-num">订单号：201912226739678348</view>
                        <text class="unpaid">待支付</text>
                    </view>
                    <view class="stick flex">
                        <view class="stick-left">
                            <image class="stick-img middle" src="../../../static/icon/stick.png" mode="aspectFit"></image>
                            <text class="middle">15天简历置顶</text>
                        </view>
                        <view class="stick-time">2019-12-22 09:12</view>
                    </view>
                </view>
                <view class="stick-bot flex">
                    <view class="bot-left">
                        <text class="yuan">¥ 99元</text>
                        <text class="coin">(或990中研币)</text>
                    </view>
                    <text class="pay">支付</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
export default {
    data() {
        return {
            Inv: 0
        };
    },
    components: {
        WucTab
    },
    mounted() {},
    methods: {
        swiperChange(e) {
            let { current } = e.target;
            this.TabCur = current;
        }
    }
};
</script>

<style lang="scss" scoped>
.myorder {
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
        margin: 0 140rpx;
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
    padding: 20rpx;
    .list {
        width: 100%;
        box-shadow: 0 0 10rpx #e9e9e9;
        border-radius: 12rpx;
        background: #ffffff;
        margin-bottom: 20rpx;
        font-size: 24rpx;
        &:last-child {
            margin-bottom: 0;
        }
        .list-top {
            padding: 30rpx 20rpx;
            border-bottom: 1rpx solid #f2f2f2;
            width: 100%;
            .order-wrap {
                .order-num {
                    color: #999999;
                }
                .unpaid {
                    color: #ff1919;
                }
                .paid {
                    color: #b3b3b3;
                }
            }
            .stick {
                margin-top: 30rpx;
                .stick-img {
                    width: 60rpx;
                    height: 60rpx;
                    margin-right: 20rpx;
                }
                .middle {
                    color: #333333;
                    font-size: 30rpx;
                    font-weight: 600;
                }
                .stick-time {
                    color: #b3b3b3;
                }
            }
        }
        .stick-bot {
            padding: 20rpx;
            .yuan {
                color: #ff1919;
                margin-right: 18rpx;
            }
            .coin {
                color: #333333;
            }
            .pay {
                width: 130rpx;
                height: 50rpx;
                text-align: center;
                line-height: 50rpx;
                background: #ff4c4c;
                border-radius: 25rpx;
                color: #ffffff;
            }
            .paid-btn {
                background: #cccccc;
            }
        }
    }
}
</style>
