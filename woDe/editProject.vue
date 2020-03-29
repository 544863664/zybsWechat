<template>
    <view class="addProject">
        <view class="list">
            <view class="title">项目名称</view>
            <view class="content">
                <input class="uni-input" focus placeholder="请输入" maxlength="16" :value="inputValue"/>
            </view>
        </view>
        <view class="list">
            <view class="title">担任角色</view>
            <view class="content">
                <input class="uni-input" placeholder="请输入"  maxlength="12" :value="role"/>
            </view>
        </view>
        <view class="list">
            <view class="title">项目时间</view>
            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
                <text class="date middle">{{date}}</text>
                <text class="middle">—</text>
                <text class="date middle">{{date}}</text>
            </picker>
        </view>
        <view class="list" @click="proDescribe">
            <view class="title">项目描述</view>
            <view class="content flex">
                <view class="describe">1.负责公司软件产品的设计与开发;负责公司软件产品的设计与开发</view>
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        const currentDate = this.getDate({
            format: true
        });
        return {
            date: currentDate,
            inputValue: '人工智能实验项目',
            role: 'web前端开发'
        };
    },
    components: {},
    mounted() {},
    computed: {
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
    },
    methods: {
        bindDateChange: function(e) {
            this.date = e.target.value;
        },
        getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            // let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;
            // day = day > 9 ? day : '0' + day;
            return `${year}-${month}`;
        },
        proDescribe() {
            // 项目描述
            uni.navigateTo({
                url: '/woDe/proDescribe'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.addProject {
    padding: 20rpx;
}
.list {
    padding: 16rpx 0;
    border-bottom: 1rpx solid #f2f2f2;
    .title {
        font-size: 24rpx;
        color: #999999;
        line-height: 50rpx;
    }
    .content {
        height: 60rpx;
        font-size: 30rpx;
        color: #333333;
        .back-icon {
            width: 13rpx;
            height: 24rpx;
        }
        /deep/ .uni-input {
            width: 90%;
        }
        .describe{
            color: #333333;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .date {
        text-align: center;
    }
}
</style>
