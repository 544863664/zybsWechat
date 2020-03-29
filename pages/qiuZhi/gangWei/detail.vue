<template>
    <view class="detail-page">
        <view class="detail-title">
            <view class="detail-top">
                <view class="title flex">
                    <view class="job">
                        <text class="middle">{{ infoData.gwmc }}</text>
                        <text class="attention middle" @click="collectjob">关注</text>
                    </view>
                    <text class="wage" v-if="infoData.gwyx && infoData.gwyx != 'null'">{{ dmMap['m_xzdydm'][infoData.gwyx] }}</text>
                </view>
                <view class="limit-wrap flex">
                    <view class="limit">
                        <text>{{ cityMap[infoData.sbsf][infoData.sbcs] }}</text>
                        <!-- <text>{{ infoData.sbxq }}</text> -->
                        <text v-if="infoData.jyyq && infoData.jyyq != 'null'">{{ dmMap['m_jyyqdm'][infoData.jyyq] }}</text>
                        <text v-if="infoData.xlyq && infoData.xlyq != 'null'">{{ dmMap['m_xldm'][infoData.xlyq] }}</text>
                    </view>
                    <text class="date" v-if="infoData.sxsj && infoData.sxsj != 'null'">{{ formatItem(infoData.sxsj) }}</text>
                </view>
            </view>
            <view class="company-wrap flex">
                <view>
                    <image class="address-icon middle" src="../../../static/icon/adress.png" mode="aspectFit"></image>
                    <!-- <text class="adress-name middle">{{provinceMap[infoData.sbsf]}}{{cityMap[infoData.sbsf][infoData.sbcs]}}</text> -->
                    <text class="adress-name middle" v-if="infoData.sbxxdz && infoData.sbxxdz != 'null'">{{infoData.sbxxdz}}</text>
                </view>
                <text class="map lg text-gray cuIcon-right fr" @click="map"></text>
            </view>
        </view>
        <view class="job-describe">
            <view class="describe-title">
                <image class="dot-icon" src="../../../static/icon/dot-icon.png" mode="aspectFit"></image>
                <text class="describe-text">职位描述</text>
                <!-- <label class="radio"><radio value="r2" style="transform:scale(0.7)" :checked="checked" @click="switchBtn"/>未选中</label> -->
            </view>
            <view class="duty-wrap">
                <view class="duty-title">岗位职责:</view>
                <view class="duty-text">{{ infoData.gwms }}</view>
            </view>
        </view>
        <!--    <view class="job-describe">
            <view class="describe-title">
                <image class="dot-icon" src="../../../static/icon/dot-icon.png" mode="aspectFit"></image>
                <text class="describe-text">职位亮点</text>
            </view>
            <view class="describe-limit">
                <text v-for="(item, i) in lightspot" :key="i">{{ item.name }}</text>
                <text v-for="(item, i) in infoData.fllist" :key="i">{{ dmMap['m_gwfldm'][item.dm] }}</text>
            </view>
        </view> -->
        <view class="job-describe">
            <view class="describe-title">
                <image class="dot-icon" src="../../../static/icon/dot-icon.png" mode="aspectFit"></image>
                <text class="describe-text">公司信息</text>
            </view>
            <navigator :url="'/pages/qiuZhi/shouYe/company?bsid=' + infoData.dwid" class="detail-title company-info">
                <view class="detail-top">
                    <view class="middle">
                        <!-- <image class="img-wrap" src="../../../static/icon/company-big-icon.png" mode="aspectFit"></image> -->
                        <image class="img-wrap" v-if="!imageUrl" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/common/enterDetail.png"
                            mode="aspectFit"></image>
                        <image class="img-wrap" v-if="imageUrl" :src="imageUrl" mode="aspectFit"></image>
                    </view>
                    <view class="info-wrap middle">
                        <view class="info-name">{{ company.dwmc }}</view>
                        <view>
                            <!--  <van-button type="info" size="small" v-if="infoData.dwxz && infoData.dwxz != 'null'">{{ dmMap['m_dwxzdm'][infoData.dwxz] }}</van-button>
                            <van-button type="info" size="small" v-if="infoData.dwsshy && infoData.dwsshy !== 'null'">{{ dmMap['m_dwsshydm'][infoData.dwsshy] }}</van-button>
                            <van-button type="info" size="small">{{ formatYear(infoData.dwclsj) }}年注册</van-button>
                            <van-button type="info" size="small" v-if="infoData.dwgm && infoData.dwgm !== 'null'">{{ dmMap['m_dwgmdm'][infoData.dwgm] }}</van-button> -->
                            <van-button type="info" size="small" v-if="company.dwxz && company.dwxz != 'null'">{{company.dwxz}}</van-button>
                            <van-button type="info" size="small" v-if="company.sshy && company.sshy !== 'null'">{{ dmMap['m_dwsshydm'][company.sshy] }}</van-button>
                            <van-button type="info" size="small" v-if="company.dwclsj && company.dwclsj !== 'null'">{{ formatYear(company.dwclsj) }}年注册</van-button>
                            <van-button type="info" size="small" v-if="company.dwgm && company.dwgm !== 'null'">{{ dmMap['m_dwgmdm'][company.dwgm] }}</van-button>
                        </view>
                    </view>
                </view>
                <view class="company-wrap flex">
                    <view>
                        <image class="address-icon middle" src="../../../static/icon/fire.png" mode="aspectFit"></image>
                        <text class="adress-name middle">
                            在招职位
                            <text class="post-num">{{ company.gwCount }}</text>
                            个
                        </text>
                    </view>
                    <text class="lg text-gray cuIcon-right"></text>
                </view>
            </navigator>
        </view>
        <view class="recommend">
            <text class="line-l middle"></text>
            相似岗位推荐
            <text class="line-r middle"></text>
        </view>
        <navigator :url="'/pages/qiuZhi/gangWei/detail?gwid=' + item.gwid" class="list" v-for="(item, i) in postList"
            :key="i">
            <view class="title flex">
                <text class="job-title">{{ item.gwmc }}</text>
                <text class="wage">{{ dmMap['m_xzdydm'][item.gwyx] }}</text>
            </view>
            <view class="line flex">
                <view class="limit">
                    <text>{{provinceMap[item.sbsf]}}{{cityMap[item.sbsf][item.sbcs]}}</text>
                    <!-- <text>武珞路</text> -->
                    <text v-if="item.jyyq && item.jyyq!= 'null'">{{ dmMap['m_jyyqdm'][item.jyyq] }}</text>
                    <text v-if="item.xlyq && item.xlyq!= 'null'">{{ dmMap['m_xldm'][item.xlyq] }}</text>
                </view>
                <!-- <text class="date">{{ formatItem(item.gwfbsj) }}</text> -->
            </view>
            <view class="company-box">
                <image class="company-icon" src="../../../static/icon/company-icon.png" mode="aspectFill"></image>
                <text class="company-name">{{ item.dwmc }}</text>
            </view>
            <!-- <view class="press-btn">
                <van-button type="info" size="small" v-if="item.dwxz && item.dwxz != 'null'">{{ dmMap['m_dwxzdm'][item.dwxz] }}</van-button>
                <van-button type="info" size="small" v-if="item.dwsshy && item.dwsshy !== 'null'">{{ dmMap['m_dwsshydm'][item.dwsshy] }}</van-button>
                <van-button type="info" size="small">{{ formatYear(item.dwclsj) }}年注册</van-button>
                <van-button type="info" size="small" v-if="item.dwgm && item.dwgm !== 'null'">{{ dmMap['m_dwgmdm'][item.dwgm] }}</van-button>
            </view> -->
        </navigator>

<button @click="openx">打开弹窗</button>


        <view class="send" @click="open" :class="{ active: isActive }">
            申请职位
        </view>

        <uni-popup ref="popup" type="bottom">
            <picker @change="bindPickerChange" :value="jlIndex" range-key="wjmc" :range="jlList">
                <view class="uni-input">{{jlList[jlIndex].wjmc}}</view>
            </picker>
        </uni-popup>
<uni-popup ref="popupx" type="bottom">底部弹出 Popup</uni-popup>
    </view>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex';
    import moment from 'moment';
    import uniPopup from "@/components/uni-popup/uni-popup.vue"
    export default {
        data() {
            return {
                gwtdPopup:false,
                jlIndex: 0,
                jlList: [
                    {id:"1",wjmc:"adsf"}
                ],
                checked: true,
                isActive: true,
                imageUrl: "", //公司logo
                infoData: {}, // 数据库表.
                gwlb: '', // 岗位类别
                sbcs: "", //上班城市
                dwid: '', // 单位id
                gwid: '', // 岗位id
                isSend: true, // 可以点击
                progress: '', // 完善度
                postList: [], // 岗位推荐列表
                collect: false, //是否收藏
                company: {
                    dwmc: "", //单位名称
                    dwxz: "", //单位性质
                    sshy: "", //所属行业
                    dwclsj: "", //单位成立时间
                    dwgm: "", //单位规模
                    gwCount: "", //招聘岗位
                }
            };
        },
        components: {
            uniPopup
        },
        computed: {
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            ...mapState({
                provinceMap: state => state.provinceMap,
                cityMap: state => state.cityMap,
                dmMap: state => state.dmMap,
                degress: state => state.degress
            })
        },
        onLoad(options) {
            this.gwid = options.gwid;
            this.dwid = options.dwid;
        },
        onShow() {
            this.detailData();
            this.gsdetail();
            this.number();
            this.userinfoImg();
            this.Resumelist(); //简历列表
        },
        methods: {
            bindPickerChange: function(e) {
                console.log('picker发送选择改变，携带值为', e.target.value)
                this.index = e.target.value
            },
            open() {
                if(this.gwtdPopup){
                    this.$refs.popup.close()
                }else{
                    this.$refs.popup.open()
                }
            },
            openx() {
                this.$refs.popupx.open()
            },
            /* 地图跳转 */
            map() {
                uni.navigateTo({
                    url: '/pages/qiuZhi/gangWei/map'
                });
            },
            /* redio切换 */
            switchBtn() {
                this.checked = !this.checked;
            },
            /* 投递简历按钮 */
            hasSend() {
                console.log('this.isSend=', this.isSend);
                if (this.isSend) {
                    this.sendResume();
                } else {
                    this.isActive = false;
                }
            },
            /* 求职者根据岗位id查详细信息 */
            detailData() {
                this.$http({
                    url: `/qz/qzgrjbxx/getGwInfo?gwid=` + this.gwid,
                    success: data => {
                        if (data.data.code === 0) {
                            this.infoData = data.data.qyDwgwfbxx;
                            this.gwlb = data.data.qyDwgwfbxx.gwlb; //岗位类别
                            this.sbcs = data.data.qyDwgwfbxx.sbcs; //上班城市
                            this.recomendList(this.gwlb, this.sbcs);
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            /* 相似岗位推荐列表 */
            recomendList(gwlb, sbcs) {
                this.$http({
                    url: '/qz/qyhxrxx/tjList?gwlb=' + gwlb + '&sbcs=' + sbcs,
                    success: data => {
                        if (data.data.code === 0) {
                            this.postList = data.data.gwList;
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            // 单位信息
            gsdetail() {
                this.$http({
                    url: `/qz/qzgrjbxx/getDwInfo?dwid=` + this.dwid,
                    success: data => {
                        if (data.data.code === 0) {
                            this.company.dwmc = data.data.dwInfo.dwmc;
                            this.company.dwxz = data.data.dwInfo.dwxz;
                            this.company.sshy = data.data.dwInfo.sshy;
                            this.company.dwclsj = data.data.dwInfo.dwclsj;
                            this.company.dwgm = data.data.dwInfo.dwgm;
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            //招聘岗位数量
            number() {
                this.$http({
                    url: `/hr/bskhgl/getGwYyCount?dwid=` + this.dwid,
                    success: data => {
                        if (data.data.code === 0) {
                            this.company.gwCount = data.data.gwCount
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            //公司logo
            userinfoImg() {
                this.$http({
                    url: `/hr/qydwhrxx/getDwLogo?dwid=` + this.dwid,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            // this.company.gwCount = data.data.gwCount
                            this.imageUrl = data.data.fileUrl;
                        }
                    },
                    fail: err => {}
                });
            },
            // 获取简历列表
            Resumelist() {
                let jl = {
                    "msg": "success",
                    "code": 0,
                    "fileList": [{
                        "bsid": "441296521569509376",
                        "qzbsid": "438410071672754176",
                        "wjid": "441296521506324480",
                        "wjlx": 10,
                        "wjmc": "0001-331x141.jpg",
                        "wjbm": "",
                        "wjgs": "",
                        "wjdx": null,
                        "sfsd": null,
                        "scsj": "2020-03-28 15:15:55",
                        "scfsm": "phone",
                        "showPhone": null,
                        "createUser": null,
                        "createTime": null,
                        "updateUser": null,
                        "updateTime": null,
                        "isDeleted": "0"
                    }],
                };

                // this.jlList = jl.fileList;

                console.log("this.jlList = ", this.jlList);
                if (!this.token) {
                    return
                }

                this.$http({
                    url: '/qz/qzFile/list?fileType=10',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.jlList = data.data.fileList || [];
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            /* 投递简历 */
            sendResume() {
                this.$http({
                    url: '/qz/qyhxrxx/td',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    data: {
                        dwid: this.dwid,
                        gwid: this.gwid
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            var wsd = this.$store.state.degress;
                            if (wsd >= 80) {
                                uni.navigateTo({
                                    url: '/pages/qiuZhi/gangWei/sendResume'
                                });
                            } else {
                                this.isActive = false;
                                return false;
                            }
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            //职位收藏
            collectjob() {
                if (this.token) {
                    this.$http({
                        url: `/qz/qzgwsc/sc/${this.dwid}/${this.gwid}`,
                        method: 'POST',
                        header: {
                            token: this.token
                        },
                        data: {
                            qdid: 2
                        },
                        success: data => {
                            console.log("collect", data);
                            if (data.data.code === 0) {
                                uni.showToast({
                                    icon: 'none',
                                    title: "关注成功"
                                });
                                this.collect = !this.collect;
                            } else {
                                uni.showToast({
                                    icon: 'none',
                                    title: data.data.msg
                                });
                            }
                        }
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '您还未登录请先登录'
                    });
                }

            },
            formatYear(date) {
                return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('YYYY');
            },
            formatItem(date) {
                return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('MM月DD号');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .page {
        height: 100vh;
    }

    .detail-page {
        padding: 20rpx 20rpx 100rpx 20rpx;

        .send {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100rpx;
            line-height: 100rpx;
            background-color: #999;
            text-align: center;
            color: #ffffff;
            font-size: 30rpx;
            font-weight: bold;
            // pointer-events: none;
            z-index: 10;
        }

        .active {
            background-color: #ff8421;
        }

        uni-button[type='primary'] {
            background: #ff8421;
        }

        van-button {
            margin-right: 10rpx;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .detail-title {
        width: 100%;
        box-shadow: 0 0 10rpx #e9e9e9;
        border-radius: 12rpx;
        background: #ffffff;
        margin-bottom: 20rpx;
    }

    .detail-top {
        border-bottom: 1px solid #f2f2f2;
        padding: 20rpx;

        .info-wrap {
            margin-left: 20rpx;

            .info-name {
                font-size: 30rpx;
                color: #666666;
                font-weight: 600;
                line-height: 50rpx;
            }
        }

        .img-wrap {
            width: 100rpx;
            height: 100rpx;
        }

        .title {
            font-weight: 600;
            color: #333333;
            font-size: 30rpx;

            .wage {
                color: #ff8421;
                font-size: 28rpx;
            }
        }

        .attention {
            width: 90rpx;
            height: 38rpx;
            text-align: center;
            line-height: 38rpx;
            border-radius: 25rpx;
            background-image: linear-gradient(to right, #ffd400, #ffa600);
            font-size: 24rpx;
            color: #ffffff;
            margin-left: 16rpx;
            box-shadow: 0 0 10rpx #ffeaaf;
        }

        .limit-wrap {
            font-size: 24rpx;
            color: #b2b2b2;
            margin-top: 12rpx;

            .limit {
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

            .date {
                font-size: 24rpx;
                color: #b2b2b2;
            }
        }
    }

    .company-wrap {
        line-height: 74rpx;
        padding: 0 20rpx;

        .address-icon {
            width: 28rpx;
            height: 33rpx;
        }

        .adress-name {
            color: #808080;
            font-size: 24rpx;
            margin-left: 10rpx;

            .post-num {
                color: #ff8421;
                font-weight: 600;
                padding: 0 5rpx;
            }
        }

        .map {
            /* padding: 0 30rpx; */
        }
    }

    .job-describe {
        padding-top: 20rpx;
        color: #666666;
        font-size: 24rpx;

        .company-info {
            margin-top: 24rpx;
        }

        .describe-title {
            font-size: 30rpx;
            font-weight: 600;
            color: #333333;

            .dot-icon {
                width: 20rpx;
                height: 20rpx;
                margin-right: 14rpx;
            }
        }

        .describe-limit {
            line-height: 50rpx;
            padding: 10rpx 30rpx;

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

        .duty-wrap {
            padding: 10rpx 30rpx;
            line-height: 44rpx;

            .duty-title {
                font-size: 26rpx;
                font-weight: 600;
                line-height: 50rpx;
                margin-top: 10rpx;
            }
        }
    }

    .recommend {
        text-align: center;
        line-height: 50rpx;
        color: #cccccc;
        font-size: 24rpx;
        margin: 40rpx 0 14rpx;

        .line-l {
            width: 110rpx;
            height: 3rpx;
            background: #cccccc;
            margin-right: 24rpx;
        }

        .line-r {
            width: 110rpx;
            height: 3rpx;
            background: #cccccc;
            margin-left: 24rpx;
        }
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
            font-size: 24rpx;
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
