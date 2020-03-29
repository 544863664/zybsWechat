<template>
    <view class="check">
        <navigator :url="'/pages/qiuZhi/xiaoXi/hrD?bsid=' + item.hrid" class="checkbox" v-for="(item, i) in checksol" :key="i" @longpress="longpress(item.bsid)">
            <image class="msgimg" :src="item.lglj"></image>
            <text class="title">{{ item.xm }}</text>
            <text class="checktitle">{{ item.zw }}-{{ item.dwmc }}</text>
            <text class="time">今天{{ item.create_time.substring(11, 15) }}</text>
            <text class="see">查看了您</text>
        </navigator>
        <view class="delete-btn" @click="deleteAll">
            <image class="icon" src="../../../static/icon/delete-btn.png" mode="aspectFit"></image>
            <view class="text">清空</view>
        </view>
        <view class="loading">
            <text class="loading-text">{{ loadingType === 0 ? contentText.contentdown : loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore }}</text>
        </view>
    </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            bsid: '',
            allid:"",
            currPage: '1', //当前页面
            limit: '7', //当前页面显示的数量
            totalCount: 0, //总数量
            totalPage: 0, //总页数
            checksol: [], //列表
            loadingType: 0,
            contentText: {
                contentdown: '上拉显示更多',
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了'
            }
        };
    },
    mounted() {
        this.checkList();
    },
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    methods: {
        checkList() {
            this.loadingType = 0;
            uni.showNavigationBarLoading(); //在当前页面显示导航条加载动画
            this.$http({
                url: `/qz/qyckjljl/list/${this.currPage}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data.code == 0) {
                        this.checksol = data.data.page.list;
                        // this.checksol.forEach((item,i)=>{
                        //     this.allid = item.bsid
                        // })
                        this.currPage = data.data.page.currPage; //当前页数
                        this.totalCount = data.data.page.totalCount; //总数量
                        this.totalPage = data.data.page.totalPage; //总页数
                        if (this.checksol.length == data.data.page.totalCount) {
                            this.loadingType = 2;
                            uni.hideNavigationBarLoading(); //关闭加载动画
                            return false;
                        }
                    }
                }
            });
        },
        //上拉加载
        onReachBottom() {
            setTimeout(() => {
                this.getNewList();
            }, 1000);
        },
        getNewList() {
            let currPage = this.currPage + 1;
            if (currPage > this.totalPage) {
                return false;
            }
            if (this.loadingType != 0) {
                //loadingType!=0;直接返回
                return false;
            }
            this.loadingType = 1;
            uni.showNavigationBarLoading(); //显示加载动画
            this.$http({
                url: `/qz/qyckjljl/list/${currPage}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data.code === 0) {
                        this.currPage = data.data.page.currPage; //当前页数
                        this.totalCount = data.data.page.totalCount; //总数量
                        this.totalPage = data.data.page.totalPage; //总页数
                        this.checksol = this.checksol.concat(data.data.page.list); //将数据拼接在一起
                        console.log(this.cPage);
                        if (this.checksol.length == data.data.page.totalCount) {
                            this.loadingType = 2;
                            uni.hideNavigationBarLoading(); //关闭加载动画
                            return false;
                        }
                        this.loadingType = 0; //将loadingType归0重置
                        uni.hideNavigationBarLoading(); //关闭加载动画
                    }
                }
            });
        },
        //长按删除
        longpress(bsid) {
            console.log('bsid', bsid);
            uni.showModal({
                title: '提示',
                content: '是否删除这条信息?',
                success: function(res) {
                    if (res.confirm) {
                        this.checkDelete(bsid);
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }.bind(this)
            });
        },
        //删除
        checkDelete(bsid) {
            this.$http({
                url: `/qz/qyckjljl/deleteBatch`,
                method: 'POST',
                header: {
                    token: this.token
                },
                data: [bsid],
                success: data => {
                    if (data.data.code === 0) {

                        this.currPage =1
                    }
                    this.checkList();
                }
            });
        },
        //全删
        deleteAll() {
            let arr =[];
           this.checksol.forEach((item)=>{
                arr.push(item.bsid)
            })
            this.$http({
                url: `/qz/qyckjljl/deleteBatch`,
                method: 'POST',
                header: {
                    token: this.token
                },
                data:arr,
                success: data => {
                    if (data.data.code === 0) {
                        this.currPage =1
                    }
                    this.checkList();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.check {
    position: relative;
}
.loading {
    text-align: center;
    margin-bottom: 20rpx;
    color: #cccccc;
}
.checkbox {
    box-shadow: 0 0 5upx #ccc;
    margin: 20upx;
    border-radius: 12upx;
    position: relative;
}
.msgimg {
    width: 120rpx;
    height: 120rpx;
    margin: 20rpx;
    vertical-align: middle;
}
.title {
    font-size: 32rpx;
    font-weight: 600;
    position: absolute;
    top: 42rpx;
    left: 160rpx;
}
.checktitle {
    font-size: 23rpx;
    color: #999999;
    position: absolute;
    top: 94rpx;
    left: 160rpx;
}
.time {
    font-size: 20rpx;
    color: #999999;
    position: absolute;
    top: 44rpx;
    right: 20rpx;
}
.see {
    font-size: 20rpx;
    color: #999999;
    position: absolute;
    top: 92rpx;
    right: 20rpx;
}
.delete-btn {
    width: 100rpx;
    height: 100rpx;
    font-size: 20rpx;
    color: #d81e06;
    background: #ffffff;
    position: fixed;
    right: 20rpx;
    bottom: 100rpx;
    border-radius: 50%;
    box-shadow: 0rpx 10rpx 10rpx #d0d0d0;
    .icon {
        width: 38rpx;
        height: 40rpx;
        display: block;
        margin: auto;
        margin-top: 18rpx;
    }
    .text {
        text-align: center;
        line-height: 36rpx;
    }
}
</style>
