<template>
    <view class="news">
        <view class="detail"  v-for="(item,i) in newsList" :key="i"  @longpress="longpress(item.xxid)">
            <view class="msg">{{item.xxmc}}：</view>
            <view class="msgDetail">{{item.xxnr}}</view>
        </view>
      <!--  <view class="detail">
            <view class="msg">登陆消息：</view>
            <view class="msgDetail">您的账号于2019-12-26 15:34登陆</view>
        </view> -->
       <!-- <view class="mian">
            <text class="mian-msg">二维码验证消息：</text>
            <view class="mian-detail">
            <text>恭喜您于2019-10-24 16:32获得</text>
            <text class="show">【博士专场-八月-北京】</text>
            <text>入场二维码，请及时查收,有效期至</text>
            <text class="time">2019-10-25 17:00</text>
            </view>
        </view> -->
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
             xxid:"",
            newsList:[],
            currPage: '1', //当前页面
            limit: '7', //当前页面显示的数量
            xxlx:"xx_002",
            totalCount: 0, //总数量
            totalPage: 0, //总页数
            jobList:[], //所有码表
            cityList:[], //城市码表
            loadingType: 0,
            contentText: {
                contentdown: '上拉显示更多',
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了'
            }
        };
    },
    mounted(){
       this.news()
    },
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    methods:{
        news(){
            this.loadingType = 0;
            uni.showNavigationBarLoading(); //在当前页面显示导航条加载动画
			this.$http({
			    url: `/qz/qzxxtx/list/${this.xxlx}/${this.currPage}/${this.limit}`,
			    method: 'POST',
			    header: {
			        token: this.token
			    },
			    success: data => {
			        console.log(data);
			        if (data.data.code === 0) {
			            this.newsList = data.data.page.list;
                        this.currPage = data.data.page.currPage; //当前页数
                        this.totalCount = data.data.page.totalCount; //总数量
                        this.totalPage = data.data.page.totalPage; //总页数
                        if (this.newsList.length == data.data.page.totalCount) {
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
          setTimeout(()=>{
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
                url: `/qz/qzxxtx/list/${this.xxlx}/${currPage}/${this.limit}`,
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
                        this.newsList = this.newsList.concat(data.data.page.list); //将数据拼接在一起
                        console.log(this.cPage);
                        if (this.newsList.length == data.data.page.totalCount) {
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
        longpress(xxid) {
            uni.showModal({
                title: '提示',
                content: '是否删除这条信息?',
                success: function(res) {
                    if (res.confirm) {
                        this.newsDelete(xxid);
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }.bind(this)
            });
        },
        newsDelete(xxid) {
            this.$http({
                url: `/qz/qzxxtx/deleteBatch`,
                method: 'POST',
                header: {
                    token: this.token
                },
                data:[
                    xxid
                ],
                success: data => {
                    if (data.data.code === 0) {
                          this.currPage =1
                    }
                    this.news();
                }
            });
        },
    }
};
</script>

<style scoped>
.detail {
    position: relative;
    box-shadow: 0 0 5upx #ccc;
    margin: 20upx;
    border-radius: 12upx;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30rpx;
}
 .loading {
        text-align: center;
        margin-bottom: 20rpx;
        color: #cccccc;
    }
.msg{
    color:#999999;
    font-size: 30rpx;
}
.msgDetail {
    margin-top: 18rpx;
    color:#333333;
    font-size: 30rpx;
}
.mian{
    position: relative;
    box-shadow: 0 0 5upx #ccc;
    margin: 20upx;
    border-radius: 12upx;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30rpx;
}
.mian-msg{
    color:#999999;
    font-size:30rpx;
    font-weight: 400;
}
.mian-detail{
    color:#333333;
    font-size: 30rpx;
    font-weight: 400;
    margin-top:18rpx;
}
.show{
    font-weight: bold;
}
.time{
    color:#FF4C4C;
}
</style>
