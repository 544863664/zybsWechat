<template>
    <view>
        <!-- <loading v-if="isLoading"></loading> -->
        <view class="choose-box">
            <sl-filter :independence="true" :color="titleColor" :themeColor="themeColor"></sl-filter>

        </view>
        <view class="list-box">
            <navigator class="list" v-for="(item, i) in search.companyPostArr" :key="i" :url="'/pages/qiuZhi/gangWei/detail?gwid=' + item.gwid+ '&dwid=' + item.dwid">
                <view class="title flex flex-wrap justify-between align-center">
                    <text class="job-title">{{ item.gwmc }}</text>
                    <text class="wage">{{ dmMap['m_xzdydm'][item.gwyx] }}</text>
                </view>
                <view class="line flex">
                    <view class="limit">
                        <!-- <text>{{ cityMap&&cityMap[item.sbsf]&&cityMap[item.sbsf][item.sbcs]&&cityMap[item.sbsf][item.sbcs].replace('市辖区','') }}</text> -->
                        <text>{{ cityMap[item.sbsf][item.sbcs] }}</text>
                        <!-- <text>{{ districtMap[item.sbcs][item.sbxq] }}</text> -->
                        <text>{{ dmMap['m_jyyqdm'][item.jyyq] }}</text>
                        <text>{{ dmMap['m_xldm'][item.xlyq] }}</text>
                    </view>
                    <text class="date">{{ formatItem(item.sxsj) }}</text>
                </view>
                <view class="company-box">
                    <image class="company-icon" src="../../../static/icon/company-icon.png" mode="aspectFill"></image>
                    <text class="company-name">{{ item.dwmc }}</text>
                </view>
                <view class="press-btn">
                    <!-- <van-button type="info" size="small">{{ item.sbcs.replace('市', '') }}</van-button> -->
                    <van-button type="info" size="small" v-if="item.dwxz && item.dwxz != 'null'">{{ dmMap['m_dwxzdm'][item.dwxz] }}</van-button>
                    <van-button type="info" size="small" v-if="item.dwsshy && item.dwsshy !== 'null'">{{ dmMap['m_dwsshydm'][item.dwsshy] }}</van-button>
                    <van-button type="info" size="small">{{ formatYear(item.dwclsj) }}年注册</van-button>
                    <van-button type="info" size="small" v-if="item.dwgm && item.dwgm !== 'null'">{{ dmMap['m_dwgmdm'][item.dwgm] }}</van-button>
                </view>
            </navigator>
        </view>
    </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { getBaseUrl } from '@/common/js/baseUrl.js';
import moment from 'moment';
// import popupLayer from '@/components/sl-filter/popup-layer.vue';
// import slFilterView from '@/components/sl-filter/filter-view.vue';
import slFilter from '@/components/sl-filter/sl-filter.vue';
import Loading from '../../../components/loading.vue';

import QQMapWX from 'common/qqmapsdk/qqmap-wx-jssdk.min.js';


export default {
    components: {
        slFilter,
        Loading
    },
    data() {

        return {
            a1:'',
            province:'',
            city:'',
            popupShow: false,
            currPage: 1,
            totalPage: 1,
            pageSize: 10,
            down: 'sl-down',
            up: 'sl-up',
            tabHeight: 50,
            filterList:[{title:'城市',key:'1'},{title:'岗位',key:'2'},{title:'单位',key:'3'},{title:'排序',key:'4'}],
            themeColor: '#ff8421',
            titleColor: '#666666',
            filterResult: '',
            isLoading: true,
            // 城市，行业，月薪，其他搜索
			search:{
				SxhselectionArr: [],
				companyPostArr:[],
				pageSize: 2,
				currentPage: 1,
				totalCount: 0,
				city:{ dialog:false, dm:'', name:'全国',index: -1 },
				trade:{ dialog:false, dm:'', name:'' },
				salary: { dm: '', name: '' },
				meeting: { dm: '', name: '' },
				meetingtype: { dm : '', name: '' },
				company:{ dm:'', name:'' },
				scale:{ dm:'', name:'' },
				reducat:{ dm:'', name:'' },
				work:{ dm:'', name:'' },
				job:{ dm:'', name:'' },
				kssj: '',
				jssj: '',
				meetName: '',
				pxfs: '',
				onlineVal: 1,
				value1: [],
				input: '',
				inputs: '',
				searchInput: ''
			},


        };
    },
    computed: {
        ...mapState({
           provinceList: state => state.provinceList,
           cityMapList: state => state.cityMapList,
           provinceMap: state => state.provinceMap,
           cityMap: state => state.cityMap,
            dmMap: state => state.dmMap
        }),
        itemWidth() {
        	return 'calc(100%/4)'
        }
    },
    mounted() {
        this.queryFilter();
    },
    onShow() {
        // this.queryGwList({
        //     page: 1,
        //     limit: 10
        // });
        this.companyPostSearch()
    },
    methods: {
        ...mapMutations('gangWeiState', []),

        ...mapActions('gangWeiState', ['queryGwList', 'queryFilter']),

        test: function() {
            console.log('asdf');
            let x = new QQMapWX({
                key: 'XGDBZ-UPWCG-Y4MQJ-INGBC-TAT75-J4BL7'
            });

            x.reverseGeocoder({
                success: res => {
                    console.log('reverseGeocoder = ', res);

                },
                fail: res => {}
            });
        },
        // 公司职位-列表 key, sbcs, sshy, gwyx, dwxz, dwgm, xlyq, jyyq, gwlb, orderField
		companyPostSearch() {
			// var that = this;
			// that.tableSearch.all = false;
			this.$http({
				method: 'post',
				url: '/xs/app/search/gwpc',
				data: '',
				params: {
					key: this.search.searchInput, //模糊搜索 岗位的名称和公司的名称
					sbsf: this.search.city.dm, //城市
					sshy: this.search.trade.dm, //行业
					gwyx: this.search.salary.dm, //月薪
					dwxz: this.search.company.dm, //单位性质
					dwgm: this.search.scale.dm, //单位规模
					xlyq: this.search.reducat.dm, //学历要求
					jyyq: this.search.work.dm, //工作年限
					gwlb: this.search.job.dm, //岗位类别
					orderField: this.search.pxfs, //时间排序，desc,asc
					limit: this.search.pageSize,
					page: this.search.currentPage,
				},
				headers: {
					"content-type": "application/json",
					'token': this.token
				},
				success:response=> {
				 if (response && response.data.page && response.data.code == 0) {
						this.search.totalCount = response.data.page.totalCount;
						let list = response.data.page.list;
						this.search.companyPostArr = list;
						// list.forEach(element => {
						// 	if(this.company.dwids.indexOf(element.dwid) < 0){
						// 		this.company.dwids.push(element.dwid)
						// 	}
						// });
						// console.log(this.company.dwids)
						// this.getDwLogos();
					}
				}
			})
		},
		showMenuClick(idx) {
			this.clickFilterMenu(idx);
			// console.log("this.filterList[idx].isActive = ",this.filterList[idx].isActive);
			if (this.filterList[idx].isActive == true) {
				this.$refs.popupRef.show()
			} else {
				this.$refs.popupRef.close();
			}
		},
		clickFilterMenu( idx) {
			console.log(idx)
			this.filterList.forEach(function(item, index) {
				console.log(index)
				if (idx === index) {
					item.isActive = !this.filterList[idx].isActive;
					console.log(item.isActive )
				} else {
					item.isActive = false;
				}
			});

			let activeList = state.filterList.filter(function(item) {
				return item.isActive == true;
			});

			this.popupShow = activeList.length > 0;
		},

        formatYear(date) {
            return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('YYYY');
        },
        formatItem(date) {
            return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('MM月DD号');
        },
    }
};
</script>

<style lang="scss" scoped>
    // @import '../../../components/sl-filter/iconfont/iconfont/iconfont.css';

    .select-tab {
    	border-bottom: #F7F7F7 1px solid;
    	background-color: #FFFFFF;
    	display: flex;
    	width: 100%;
    }

    .select-tab-fixed-top {
    	border-bottom: #F7F7F7 1px solid;
    	background-color: #FFFFFF;
    	display: flex;
    	width: 100%;
    	position: fixed;
    	/* #ifdef H5 */
    	top: 44px;
    	/* #endif */
    	/* #ifndef H5 */
    	top: 0;
    	/* #endif */
    }

    .arrows {
    	margin-left: 5px;
    }

    .select-tab .select-tab-item,
    .select-tab-fixed-top .select-tab-item {
    	display: flex;
    	justify-content: center;
    	align-items: center;
    }

    .select-tab .select-tab-item text,
    .select-tab-fixed-top .select-tab-item text {
    	color: #666666;
    	font-size: 16px;
    }
.list-box {
    padding: 20rpx;
    van-button {
        margin-right: 10rpx;
    }
}

.choose-box {
    height: 80rpx;
    background: #fff;
    margin-bottom: 10rpx;
    border-bottom: 1px solid #f2f2f2;
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
    .title {
        .job-title {
            font-weight: 600;
            color: #333333;
            font-size: 30rpx;
        }
        .wage {
            color: #ff8421;
            font-size: 28rpx;
            font-weight: 600;
        }
    }
    .line {
        font-size: 22rpx;
        color: #b2b2b2;
        .limit {
            line-height: 60rpx;
            text {
                padding: 0 10rpx;
                border-right: 1px solid #cccccc;
                &:first-child {
                    padding-left: 0;
                }
                &:last-child {
                    border-right: none;
                }
            }
        }
    }
    .company-box {
        height: 34rpx;
        line-height: 34rpx;
        .company-icon {
            display: inline-block;
            vertical-align: middle;
            width: 34rpx;
            height: 100%;
        }
        .company-name {
            display: inline-block;
            vertical-align: middle;
            margin-left: 16rpx;
            font-size: 26rpx;
            color: #808080;
        }
    }
    .press-btn {
        margin-top: 20rpx;
        uni-button {
            color: #999999;
        }
    }
}
</style>
