<template>
    <view class="search">
		<view class="list-box" v-if="searchDetail.totalCount>0">
		    <navigator url="/pages/qiuZhi/gangWei/detail" v-for="(item, index) in searchDetail.list" :key="index" class="list">
		        <view class="title flex flex-wrap justify-between align-center">
		            <text class="job-title">软件开发工程师</text>
		            <text class="wage">12-20k • 13薪</text>
		        </view>
		        <view class="limit">
		            <text>武昌区</text>
		            <text>武珞路</text>
		            <text>经验不限</text>
		            <text>学历不限</text>
		        </view>
		        <view class="company-box">
		            <image class="company-icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/company-icon.png" mode=""></image>
		            <text class="company-name">武汉中科通达科学技术有限责任公司</text>
		        </view>
		        <view class="press-btn flex flex-wrap justify-between align-center">
		            <view>
		                <van-button type="info" size="small">武汉</van-button>
		                <van-button type="info" size="small">国企</van-button>
		                <van-button type="info" size="small">互联网金融</van-button>
		                <van-button type="info" size="small">1996年注册</van-button>
		                <van-button type="info" size="small">100-1000人</van-button>
		            </view>
		            <text class="date">8月29号</text>
		        </view>
		    </navigator>
			<view class='loadmore' v-if="searchDetail.isShowLoadmore && searchDetail.totalCount>10">
				<view class='loadmore_tips' @click="addSearch">点击加载更多</view>
			</view>
		</view>
        <view class="notfind">
			<image  v-if="searchDetail.totalCount==0" class="titleImage" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/send-icon.png"></image>
			<view  v-if="searchDetail.totalCount==0"  class="word">没有搜索到哦</view>
			<image class="recommended" src="../../../static/icon/1654.png"></image>
        </view>
      <!-- 推荐岗位 -->
       <view class="list-box">
           <navigator url="/pages/qiuZhi/gangWei/detail" v-for="(item, index) in 5" :key="index" class="list">
               <view class="title flex flex-wrap justify-between align-center">
                   <text class="job-title">软件开发工程师</text>
                   <text class="wage">12-20k • 13薪</text>
               </view>
               <view class="limit">
                   <text>武昌区</text>
                   <text>武珞路</text>
                   <text>经验不限</text>
                   <text>学历不限</text>
               </view>
               <view class="company-box">
                   <image class="company-icon" src="../../../static/icon/company-icon.png" mode=""></image>
                   <text class="company-name">武汉中科通达科学技术有限责任公司</text>
               </view>
               <view class="press-btn flex flex-wrap justify-between align-center">
                   <view>
                       <van-button type="info" size="small">武汉</van-button>
                       <van-button type="info" size="small">国企</van-button>
                       <van-button type="info" size="small">互联网金融</van-button>
                       <van-button type="info" size="small">1996年注册</van-button>
                       <van-button type="info" size="small">100-1000人</van-button>
                   </view>
                   <text class="date">8月29号</text>
               </view>
           </navigator>
	   </view>
	   <view class="resume-btn" id="goTop" @click="goTop" v-if="floorstatus">
	       <image class="icon" src="../../../static/icon/triangle.png" mode="aspectFit"></image>
	       <view class="text">回到顶部</view>
	   </view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				searchDetail: {
					searchValue: '',
					list: [],
					currentPage: 1,
					pageSize: 10,
					totalCount: 0,
					totalPage: 0,
					isShowLoadmore: true,
				},
				floorstatus: false,
			}
		},
		computed: {},
		onLoad(option) {
			this.searchDetail.searchValue = option.value;
			this.changeSearch();
		},
		onShow() {},
		onPageScroll(e) {
			let scrollTop = e.scrollTop;
			if (scrollTop > 500 && this.searchDetail.totalCount > 10) {
				this.floorstatus = true;
			} else {
				this.floorstatus = false
			}
		},
		methods: {
			changeSearch() {
				console.log(this.searchDetail.searchValue)
				// this.$http({
				//     url: '/',
				//     method: 'GET',
				// 	data: '',
				// 	success: res => {
				// 		console.log(res)
				// 		if (res && res.data && res.data.code == 0) {
				// 			let data = res.data.page.list;
				// 		}
				// 	}
				// });
			},
			addSearch() {
				console.log('加载更多')
				let that = this;
				if (that.searchDetail.currentPage < that.searchDetail.totalPage) {
					that.searchDetail.currentPage += 1;
					this.changeSearch();
				} else {
					that.searchDetail.isShowLoadmore = false;
				}
			},
			goTop() {
				if (wx.pageScrollTo) {
					wx.pageScrollTo({
						scrollTop: 0
					})
				} else {
					wx.showModal({
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					})
				}
			},
		}
	}
	
</script>

<style lang="scss" scoped>
   /* .search {
        padding-bottom: 100rpx;
    }
 */
    .notfind {
        margin: 0 auto;
        text-align: center;
    }

    .titleImage {
        width: 400rpx;
        height: 360rpx;
        margin-top: 50rpx;
    }

    .word {
        font-size: 35rpx;
        color: #a7a7a7;
        margin-top: 24rpx;
      
    }

    .recommended {
        width: 50%;
        height: 30rpx;
        margin-top: 96rpx;
    }
    .press-btn van-button {
        margin-right: 10upx;
    }
    .list-box {
        padding: 30upx 30upx 100upx;
    }
    .list {
        width: 100%;
        box-shadow: 0 0 10upx #e9e9e9;
        border-radius: 12upx;
        padding: 20upx;
        background: #ffffff;
        margin-bottom: 20upx;
    }
    .title .job-title {
        font-weight: 600;
        color: #333333;
        font-size: 30upx;
		width: 460rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    }
    .title .wage {
        color: #ff8421;
        font-size: 28upx;
        font-weight: 600;
    }
    .limit {
        font-size: 20upx;
        color: #b2b2b2;
        line-height: 60upx;
    }
    .limit text {
        padding: 0 10upx;
        border-right: 1px solid #cccccc;
    }
    .limit text:first-child {
        padding-left: 0;
    }
    .limit text:last-child {
        border-right: none;
    }
    .company-box {
        height: 34upx;
        line-height: 34upx;
    }
    .company-box .company-icon {
        display: inline-block;
        vertical-align: middle;
        width: 34upx;
        height: 100%;
    }
    .company-box .company-name {
        display: inline-block;
        vertical-align: middle;
        margin-left: 16upx;
        font-size: 26upx;
        color: #808080;
		width: 600rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    }
    .press-btn {
        margin-top: 20upx;
    }
	.press-btn view {
		width: 540rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

    .press-btn uni-button {
        color: #999999;
    }
    .date {
		width: 90rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
        font-size: 20upx;
        color: #b2b2b2;
    }
	.resume-btn {
	    width: 110rpx;
	    height: 110rpx;
	    font-size: 20rpx;
	    color: #ff7b00;
	    background: #ffffff;
	    position: fixed;
	    right: 20rpx;
	    bottom: 50rpx;
	    border-radius: 50%;
	    box-shadow: 0rpx 10rpx 20rpx #d0d0d0;
	    .icon {
	        width: 40rpx;
	        height: 40rpx;
	        display: block;
	        margin: auto;
	        margin-top: 18rpx;
	    }
	    .text {
	        text-align: center;
	        line-height: 40rpx;
	    }
		#goTop {
			position: fixed;
			right: 20rpx;
			bottom: 310rpx;
		}
	}
	.loadmore_tips{
		font-size: 25rpx;
		color: #a6a6a6;
		display: table;
		width: auto;
		white-space: nowrap;
		border-spacing: 0.5rem 0;
		margin-left: 28rpx;
		margin-right: 28rpx;
		margin-bottom: 20rpx;
	}
	
	.loadmore_tips::before, .loadmore_tips::after{
		display: table-cell;
		content: "";
		width: 50%;
		background: linear-gradient(#D8D8D8, #D8D8D8) repeat-x center;
		background-size: 0.1rem 0.1rem;
	}
</style>
