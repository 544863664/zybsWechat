<template>
    <view class="addProject">
        <view class="list">
            <view class="title">学校</view>
            <view class="content">
                <input class="uni-input" focus placeholder="请输入" maxlength="35" />
            </view>
        </view>
        <view class="list">
            <view class="title">学历</view>
            <picker class="content" @change="bindPickerChange" :value="index" :range="array">
                <!-- <view class="uni-input middle">{{ array[index] }}</view> -->
                <view class="uni-input middle">{{ currentVal }}</view>
                <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </picker>
        </view>
        <view class="list">
            <view class="title">专业</view>
            <view class="content">
                <input class="uni-input" placeholder="请输入" maxlength="12" />
            </view>
        </view>
        <view class="list">
            <view class="title">时间段</view>
            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
                <text class="date middle">{{ date }}</text>
                <text class="middle">—</text>
                <text class="date middle">{{ date }}</text>
            </picker>
        </view>
        <view class="list" @click="proDescribe">
            <view class="title">项目描述</view>
            <view class="content flex">
                <view class="describe">请输入</view>
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
            array: ['博士', '硕士'],
            currentVal: '请选择',
            index: 0
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
        },
        bindPickerChange: function(e) {
            // console.log('picker发送选择改变，携带值为', e.target.value);
            this.index = e.target.value;
            this.currentVal = this.array[this.index];
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
        line-height: 60rpx;
        font-size: 30rpx;
        color: #333333;
        .back-icon {
            width: 13rpx;
            height: 24rpx;
        }
        /deep/ .uni-input {
            width: 98%;
        }
        .describe {
            color: #888888;
        }
    }
    .date {
        text-align: center;
    }
}
</style>
