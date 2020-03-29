<template>
    <view class="home-page">
        <view class="banner">
            <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
                :indicator-color="indicatorColor" :indicator-active-color="activeColor" :acceleration="acceleration"
                :circular="circular">
				<swiper-item v-for="(item, index) in bannerArr" :key="index">
				    <image class="swiper-img" :src="item.url" mode=""></image>
				</swiper-item>
            </swiper>
            <view class="mp-search-box">
				<input class="ser-input" v-model="searchVal" type="text" placeholder="输入关键字搜索" @change="searchPage" />
			</view>
        </view>

        <view class="tabbar">
            <view class="inv-h-w">
                <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="tabClick(0)">明星企业</view>
                <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="tabClick(1)">最新入驻</view>
                <view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" @click="tabClick(2)">线下专场</view>
            </view>
            <view class="list-wrap" v-show="Inv == 0">
                <navigator class="list" :url="'/pages/qiuZhi/shouYe/company?bsid=' + item.dwid" v-for="(item, i) in starCompany.list"
                    :key="i">
                    <view class="detail-top">
                        <view class="middle enterIco">
                            <image class="img-wrap" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/common/enterDetail.png" mode="aspectFit"></image>
                        </view>
                        <view class="info-wrap middle">
                            <view class="info-name">{{ item.dwmc }}</view>
                            <view class="info-welfare">
                                <van-button type="info" size="small" v-if="item.dwszsf">{{ cityMap[item.dwszsf][item.dwszcs] }}</van-button>
                                <van-button type="info" size="small" v-if="item.dwxz">{{ dmMap['m_dwxzdm'][item.dwxz] }}</van-button>
                                <van-button type="info" size="small" v-if="item.dwsshy">{{ dmMap['m_dwsshydm'][item.dwsshy] }}</van-button>
                                <van-button type="info" size="small" v-if="item.dwclsj">{{ formatYear(item.dwclsj) }}年注册</van-button>
                            </view>
                        </view>
                    </view>
                    <view class="company-wrap">
                        <image class="address-icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/fire.png" mode="aspectFit"></image>
                        <view class="adress-name">热招: {{ item.gwmc }}</view>
                        <text class="lg text-gray cuIcon-right fr"></text>
                    </view>
                </navigator>
				<view class='loadmore' v-if="starCompany.isShowLoadmore && starCompany.totalCount>10">
					<view class='loadmore_tips'>加载中</view>
				</view>
				<view class="loadmore loadmore_line" v-if="!starCompany.isShowLoadmore">
					<view class='loadmore_tips'>我是有底线的</view>
				</view>
            </view>
            <view class="list-wrap" v-show="Inv == 1">
                <navigator class="list" :url="'/pages/qiuZhi/shouYe/company?bsid=' + item.dwid" v-for="(item, i) in latestCompany.list"
                    :key="i">
                    <view class="detail-top">
                        <view class="middle enterIco">
                            <image class="img-wrap" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/common/enterDetail.png" mode="aspectFit"></image>
                        </view>
                        <view class="info-wrap middle">
                            <view class="info-name">{{ item.dwmc }}</view>
                            <view class="info-welfare">
                                <van-button type="info" size="small" v-if="item.dwszsf">{{ cityMap[item.dwszsf][item.dwszcs] }}</van-button>
                                <van-button type="info" size="small" v-if="item.dwxz">{{ dmMap['m_dwxzdm'][item.dwxz] }}</van-button>
                                <van-button type="info" size="small" v-if="item.dwsshy">{{ dmMap['m_dwsshydm'][item.dwsshy] }}</van-button>
                                <van-button type="info" size="small" v-if="item.dwclsj">{{ formatYear(item.dwclsj) }}年注册</van-button>
                            </view>
                        </view>
                    </view>
                    <view class="company-wrap">
                        <image class="address-icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/fire.png" mode="aspectFit"></image>
                        <view class="adress-name">热招: {{ item.gwmc }}</view>
                        <text class="lg text-gray cuIcon-right fr"></text>
                    </view>
                </navigator>
				<view class='loadmore' v-if="latestCompany.isShowLoadmore && latestCompany.totalCount>10">
					<view class='loadmore_tips'>加载中</view>
				</view>
				<view class="loadmore loadmore_line" v-if="!latestCompany.isShowLoadmore">
					<view class='loadmore_tips'>我是有底线的</view>
				</view>
            </view>
            <view class="list-wrap" v-show="Inv == 2">
                <view class="offline" v-for="(item, i) in online.list" :key="i">
                    <view class="middle enterIco">
                        <image class="school-img" :src="getImage(item.url)" mode="aspectFit"></image>
                    </view>
                    <view class="school middle">
                        <view class="school-name">{{ item.hymc }}</view>
                        <view class="sign-time">
                            <image class="sign-icon middle" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/sign-icon.png" mode="aspectFit"></image>
                            <text class="sign-text middle">签到时间: {{ item.hykssj }}</text>
                        </view>
                        <view class="sign-time">
                            <image class="adress-icon middle" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/adress.png" mode="aspectFit"></image>
                            <text class="sign-text middle">签到地点: {{ item.hydd }}</text>
                        </view>
                    </view>
                    <view class="line-btn">线下专场</view>
                    <navigator class="join-btn" :url="'/pages/qiuZhi/shouYe/offline?bsid=' + item.hxid">我要参加</navigator>
                </view>
				<view class='loadmore' v-if="online.isShowLoadmore && online.totalCount>10">
					<view class='loadmore_tips'>加载中</view>
				</view>
				<view class="loadmore loadmore_line" v-if="!online.isShowLoadmore">
					<view class='loadmore_tips'>我是有底线的</view>
				</view>
            </view>

            <!-- <view class="list-wrap">
                <ssq ref="ssq" :province="province" :city="city" :district="district" :confirm="ssqConfirm" />
            </view> -->

        </view>
        <view class="resume-btn" id="intention" @click="gounit">
            <image class="icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/intention.png" mode="aspectFit"></image>
            <view class="text">意向单位</view>
        </view>
        <view class="resume-btn" @click="goresume">
            <image class="icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/resume.png" mode="aspectFit"></image>
            <view class="text">完善简历</view>
        </view>
		<view class="resume-btn" id="goTop" @click="goTop" v-if="floorstatus">
		    <image class="icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/triangle.png" mode="aspectFit"></image>
		    <view class="text">回到顶部</view>
		</view>
    </view>
</template>

<script>
    import {
        mapState,
        mapGetters
    } from 'vuex';

    import {
        getBaseUrl
    } from '@/common/js/baseUrl.js';

    import {ssq} from '@/components/ssq-cascader/ssq.vue';

    import moment from 'moment';

    export default {
        data() {
            return {
                url: '/hr/bshxxx',
                indicatorDots: true,
                indicatorColor: '#ffffff',
                activeColor: '#ff8421',
                autoplay: true,
                interval: 2000,
                duration: 500,
                acceleration: true,
                circular: true,

                // city: "130300000000",
                // district: "130303000000",
                // province: "130000000000",
                province:null,
                city:null,
                district:null,
				
				searchVal: '',
                Inv: 0,
                starCompany: {
                    page: 1,
                    totalPage: 1,
                    limit: 10,
					totalCount: 0,
                    list: [], //明星列表
					isShowLoadmore: true,
                },
                latestCompany: {
                    page: 1,
                    totalPage: 1,
                    limit: 10,
					totalCount: 0,
                    list: [], //最新列表
					isShowLoadmore: true,
                },
                online: {
                    page: 1,
                    totalPage: 1,
                    limit: 10,
					totalCount: 0,
                    list: [], //线下专场
					isShowLoadmore: true,
                },
				
				bannerArr: [],
				floorstatus: false,
            };
        },
        components: {
            ssq
        },
        computed: {
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            ...mapState({
                provinceList: state => state.provinceList,
                cityList: state => state.cityList,
                dmList: state => state.dmList,
                provinceMap: state => state.provinceMap,
                cityMap: state => state.cityMap,
                dmMap: state => state.dmMap
            })
        },
        onShow() {
            this.companyList({
                orderField: 'vip',
                page: this.starCompany.page,
                limit: 10
            });
			this.getBannerArr();
        },
        onLoad() {
            uni.showShareMenu({
                withShareTicket: true,
                // title:"博士投小程序"
            });
        },
		onReachBottom() {
			let that = this;
			if (that.Inv == 0 && that.starCompany.page < that.starCompany.totalPage) {
				that.starCompany.page += 1;
				that.companyList({
				    orderField: 'vip',
				    page: that.starCompany.page,
				    limit: 10
				});
			} else if (that.Inv == 0) {
				that.starCompany.isShowLoadmore = false;
			}
			if (that.Inv == 1 && that.latestCompany.page < that.latestCompany.totalPage) {
				that.latestCompany.page += 1;
				that.companyList({
				    orderField: 'shsj',
				    page: that.latestCompany.page,
				    limit: 10
				});
			} else if (that.Inv == 1)  {
				that.latestCompany.isShowLoadmore = false;
			}
			if (that.Inv == 2 && that.online.page < that.online.totalPage) {
				that.online.page += 1;
				that.onlineList({
				    page: that.online.page,
				    limit: 10
				});
			} else if (that.Inv == 2) {
				that.online.isShowLoadmore = false;
			}
			
			
			
		},
        onPageScroll(e) {
			let scrollTop = e.scrollTop;
			if (scrollTop > 500) {
				this.floorstatus = true;
			} else {
				this.floorstatus = false
			}
        },
		methods: {
            goresume() {
                uni.navigateTo({
                    url: '/woDe/onlineEdit'
                });
            },
            gounit() {
                uni.navigateTo({
                    url: '/woDe/attend?index=2'
                });
            },
            changeTab(Inv) {
                that.navIdx = Inv;
            },
            searchPage() {
				if (this.searchVal) {
					uni.navigateTo({
						url: '/pages/qiuZhi/shouYe/search?value=' + this.searchVal,
					});
				}
            },
            detail() {
                // 职位详情
                uni.navigateTo({
                    url: '/pages/qiuZhi/shouYe/company'
                });
            },
            join() {
                // 我要参加
                uni.navigateTo({
                    url: '/pages/qiuZhi/shouYe/offline'
                });
            },

            formatYear(date){
                return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('YYYY-MM-DD');
            },

            ssqConfirm(param){
                // console.log("ssqConfirm param = ", param);
                this.province = param.province;
                this.city = param.city;
                this.district = param.district;
            },

            tabClick(idx) {
                this.Inv = idx;

                if (idx == 0) {
					this.starCompany.page = 1;
					this.companyList({
					    orderField: 'vip',
					    page: this.starCompany.page,
					    limit: 10
					});
                } else if (idx == 1) {
					this.latestCompany.page = 1;
                    this.companyList({
                        orderField: 'shsj',
                        page: this.latestCompany.page,
                        limit: 10
                    });
                } else {
					this.online.page = 1;
					this.onlineList({
					    page: this.online.page,
					    limit: 10
					});
                }
            },
            //首页列表明星企业,最新入驻
            companyList(filter) {
                this.$http({
                    url: '/hr/bskhgl/findDwListQz',
                    method: 'GET',
                    data: {
                        ...filter
                    },
                    success: res => {
						if (res && res.data && res.data.code == 0) {
							let data = res.data.page.list;
							if (filter.orderField == "vip") {
								this.starCompany.totalCount = res.data.page.totalCount;
								this.starCompany.totalPage = res.data.page.totalPage;
								this.starCompany.list.push(...data);
							} else {
								this.latestCompany.totalCount = res.data.page.totalCount;
								this.latestCompany.totalPage = res.data.page.totalPage;
								this.latestCompany.list.push(...data);
							}
                        }
                    }
                });
            },
            //首页列表线下专场
            onlineList(filter) {
                this.$http({
                    url: '/hr/bshxxx/findHxList',
                    method: 'GET',
                    data: {
                        ...filter
                    },
                    success: res => {
                        // console.log("onlineList = ", data);
                        if (res && res.data && res.data.code == 0) {
							let data = res.data.page.list;
							this.online.totalCount = res.data.page.totalCount;
                            this.online.totalPage = res.data.page.totalPage;
							this.online.list.push(...data);
                        }
                    }
                });
            },
            getImage(bsid) {
                return getBaseUrl() + this.url + '/downloadFile?url=' + bsid;
            },
			getBannerArr() {
				this.$http({
				    url: '/system/system/syspcbanner/ApiList?zswz=b_06',
				    method: 'GET',
				    success: res => {
						if (res && res.data && res.data.code == 0) {
							let data = res.data.list;
							this.bannerArr = [];
							data.forEach(item => {
								if (item.url) {
									this.bannerArr.push(item)
								}
							})
						}
				    }
				});
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
	
	$width: 90rpx;
	
    .home-page {
        position: relative;
    }

    #intention {
        position: fixed;
        right: 20rpx;
        bottom: 180rpx;
    }
	#goTop {
		position: fixed;
		right: 20rpx;
		bottom: 310rpx;
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
    }

    .banner {
        width: 100%;
        height: 360rpx;
        .swiper {
            height: 100%;
            swiper-item {
                .swiper-img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .mp-search-box {
            width: 100%;
            padding: 0 50rpx;
            position: absolute;
            left: 0;
            top: 20rpx;
            z-index: 99;

            .ser-input {
                height: 60rpx;
                line-height: 60rpx;
                text-align: center;
                font-size: 24rpx;
                color: #606266;
                border-radius: 25rpx;
                background: rgba(255, 255, 255, 0.8);
            }
        }
    }

    .tabbar {
        .inv-h-w {
            height: 100rpx;
            display: flex;
            border-bottom: 1rpx solid #f2f2f2;
            font-size: 24rpx;
            font-weight: 600;
            color: #b2b2b2;
            height: 100rpx;
            line-height: 100rpx;
        }

        .inv-h {
            flex: 1;
            text-align: center;
            margin: 0 70rpx;
        }

        .inv-h-se {
            color: #ff8421;
            border-bottom: 3rpx solid #ff8421;
        }

        .list-wrap {
            background: #fafafa;
            padding: 20rpx 20rpx 0 20rpx;
        }

        .list {
            width: 100%;
            box-shadow: 0 0 10rpx #e9e9e9;
            border-radius: 12rpx;
            background: #ffffff;
            margin-bottom: 20rpx;
        }

        .detail-top {
            border-bottom: 1px solid #f2f2f2;
            padding: 20rpx;
			
			.enterIco {
				width: $width;
				height: $width;
				border-radius: 50%;
				overflow: hidden;
				
				.img-wrap {
				    width: 100%;
				    height: 100%;
				}
				
			}

            .info-wrap {
                margin-left: 20rpx;
            }

            .info-name {
                font-size: 30rpx;
                color: #333333;
                font-weight: 600;
                line-height: 50rpx;
				width: 560rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
            }
			.info-welfare {
				width: 560rpx;
				overflow: hidden;
			}

            van-button {
                margin-right: 10rpx;
            }
        }

        .company-wrap {
            line-height: 74rpx;
            padding: 0 20rpx;

            .address-icon {
                width: 28rpx;
                height: 33rpx;
                top: 5rpx;
            }

            .adress-name {
                color: #808080;
                font-size: 24rpx;
                margin-left: 10rpx;
                display: inline-block;
                vertical-align: middle;
                width: 85%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .offline {
            width: 100%;
            box-shadow: 0 0 10rpx #e9e9e9;
            border-radius: 12rpx;
            background: #ffffff;
            margin-bottom: 20rpx;
            padding: 20rpx;
            position: relative;
			
			.enterIco {
				width: $width;
				height: $width;
				border-radius: 50%;
				overflow: hidden;
				
				.school-img {
				    width: 100%;
				    height: 100%;
				}
				
			}
			
            

            .school {
                width: calc(100% - 260rpx);
                padding-left: 20rpx;

                .school-name {
                    font-size: 30rpx;
                    color: #333333;
                    font-weight: 600;
                    line-height: 50rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .sign-icon {
                    width: 26rpx;
                    height: 26rpx;
                }

                .adress-icon {
                    width: 26rpx;
                    height: 30rpx;
                }

                .sign-text {
                    padding-left: 10rpx;
                    font-size: 24rpx;
                    color: #999999;
                    line-height: 50rpx;
                    width: 90%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .line-btn {
                position: absolute;
                right: 0;
                top: 30rpx;
                width: 120rpx;
                height: 40rpx;
                text-align: center;
                line-height: 40rpx;
                color: #ffffff;
                font-size: 20rpx;
                background-image: linear-gradient(to right, #61acff, #1a4bff);
                border-radius: 20rpx 0 0 20rpx;
                box-shadow: -2rpx 6rpx 16rpx #c5d9ff;
            }

            .join-btn {
                position: absolute;
                right: 20rpx;
                bottom: 24rpx;
                width: 150rpx;
                height: 50rpx;
                text-align: center;
                line-height: 50rpx;
                color: #ffffff;
                font-size: 24rpx;
                font-weight: 600;
                background-image: linear-gradient(to right, #ff8f59, #ff4a85);
                border-radius: 30rpx;
                box-shadow: -2rpx 6rpx 16rpx #ffc8ca;
            }
        }
    }

    .unit-img {
        position: fixed;
        right: 10rpx;
        bottom: 150rpx;
        width: 110rpx;
        height: 110rpx;
    }

    .resume-img {
        position: fixed;
        right: 10rpx;
        bottom: 250rpx;
        width: 110rpx;
        height: 110rpx;
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
