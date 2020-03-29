<template>
    <view class="resume-page">
        <view class="com-wrap top">
            <view class="top-left">
                <view class="title">
                    <text class="name">{{myInfo.xm||'完善简历'}}</text>
                    <text class="sex">
                        {{myInfo.xbm=="xb_001" ? "先生":""}}
                        {{myInfo.xbm=="xb_002" ? "女士":""}}
                    </text>
                    <image class="edit" src="../../../static/icon/edit.png" mode="aspectFill" @click="navigateToChild('personalInfo')"></image>
                </view>
                <view class="nature">
                    <van-button type="info" size="small" v-if="myInfo.nl&&myInfo.nl!='null'">{{myInfo.nl || " "}}岁</van-button>
                    <van-button type="info" size="small" v-if="myInfo.gznx&&myInfo.gznx!='null'">工作{{myInfo.gznx || ""}}年</van-button>
                   <van-button type="info" size="small" v-if="myInfo.dqszs&&myInfo.dqszs!='null'">
                        {{provinceMap[myInfo.dqszs] || ""}}
                    </van-button>
                    <van-button type="info" size="small" v-if="myInfo.dqszcs&&myInfo.dqszcs!='null'">
                        {{cityMap[myInfo.dqszs][myInfo.dqszcs] || ""}}
                    </van-button>
                </view>
            </view>
            <view class="top-right">
                <image class="head" src="../../../static/icon/nan.png" mode="aspectFill"></image>
            </view>
        </view>
        <view class="com-wrap experience">
            <view class="experience-title">
                <text class="text">
                    工作经验
                    <text class="star"></text>
                </text>
                <image class="add" src="../../../static/icon/add.png" alt="aspectFill" @click="navigateToChild('addExperience')"></image>
            </view>
            <navigator :url='"/woDe/addExperience?gzjlid=" + item.gzjlid' class="project-list" v-for="(item, i) in gzjlList"
                :key="i" @longpress="experienceDel(item.gzjlid)">
                <view class="company-wrap">
                    <view class="company">
                        <view class="company-name">{{item.dwmc}}</view>
                        <view class="deadline">
                            <text class="datetime">{{formatDate(item.rzsj)}} / {{formatDate(item.lzsj)}}</text>
                            <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                        </view>
                    </view>
                    <view class="station">
                        <text>职位名称：{{item.zwmc}}</text>
                        <text class="wage">税前月薪:{{item.yx||1}}K * {{item.ys}}月</text>
                    </view>
                </view>
            </navigator>
        </view>
        <view class="com-wrap experience">
            <view class="experience-title">
                <text class="text">
                    项目经验
                    <text class="star"></text>
                </text>
                <image class="add" src="../../../static/icon/add.png" alt="aspectFill" @click="navigateToChild('addProject')"></image>
            </view>
            <navigator :url="'/woDe/addProject?xmjyid=' + item.xmjyid" class="project-list" v-for="(item, i) in xmjyList"
                :key="i" @longpress="projectDel(item.xmjyid)">
                <view class="company-wrap">
                    <view class="company">
                        <view class="company-name">项目名称:{{ item.xmmc }}</view>
                        <view class="deadline">
                            <text class="datetime">{{formatDate(item.kssj)}} / {{formatDate(item.jssj)}}</text>
                            <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                        </view>
                    </view>
                    <view class="station">
                        <text>公司名称：{{ item.gsmc }}</text>
                    </view>
                    <view class="station">
                        <text>担任角色：{{ item.zw }}</text>
                    </view>
                </view>
            </navigator>
        </view>
        <view class="com-wrap experience">
            <view class="experience-title">
                <text class="text">
                    教育经历
                    <text class="star"></text>
                </text>
                <image class="add" src="../../../static/icon/add.png" alt="aspectFill" @click="navigateToChild('addEducation')"></image>
            </view>
            <navigator :url="'/woDe/addEducation?jyjlid=' + item.jyjlid" class="project-list" v-for="(item, i) in jyjllList"
                :key="i" @longpress="educationDel(item.jyjlid)">
                <view class="company-wrap">
                    <view class="company">
                        <view class="company-name">{{ item.xxmc }}</view>
                        <view class="deadline">
                            <text class="datetime">{{formatDate(item.rxsj)}} / {{formatDate(item.bysj)}}</text>
                            <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                        </view>
                    </view>
                    <view class="limit">
                        <text>{{ sftzMap[item.sftz] }}</text>
                        <text>{{ m_xldm[item.xl] }}</text>
                        <text>{{ item.zy }}</text>
                    </view>
                </view>
            </navigator>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changeTrain">
                <uni-collapse-item title="培训经历" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/train?pxjlid=' + item.pxjlid" class="project-list cont-list" v-for="(item, i) in pxjlList"
                            :key="i" @longpress="trainDel(item.pxjlid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{ item.pxmc }}</view>
                                    <view class="deadline">
                                        <text class="datetime">{{formatDate(item.kssj)}} / {{formatDate(item.jssj)}}</text>
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                                <view class="limit">
                                    <text>培训单位：{{ item.pxdw }}</text>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('train')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changeLanguage">
                <uni-collapse-item title="语言能力" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/language?yyid=' + item.yyid" class="project-list cont-list" v-for="(item, i) in yynlList"
                            :key="i" @longpress="languageDel(item.yyid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{ item.yymc }}</view>
                                    <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                </view>
                                <view class="limit">
                                    <text>{{ item.djzs }}</text>
                                    <text>听说：{{ yynlMap[item.dxnl] }}</text>
                                    <text>读写：{{ yynlMap[item.tsnl] }}</text>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('language')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changeProfessional">
                <uni-collapse-item title="专业技能" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/professional?jnid=' + item.jnid" class="project-list cont-list" v-for="(item, i) in jnList"
                            :key="i" @longpress="professionalDel(item.jnid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{ item.jnmc }}</view>
                                    <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                </view>
                                <view class="limit">
                                    <text>使用时长：{{ item.sysc }}月</text>
                                    <text>熟练程度：{{ yynlMap[item.slcd] }}</text>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('professional')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse name="ffff" @change="changeCertificate">
                <uni-collapse-item title="获得证书" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/certificate?zsid=' + item.zsid" class="project-list cont-list" v-for="(item, i) in zsList"
                            :key="i" @longpress="certificateDel(item.zsid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{ item.zsmc }}</view>
                                    <view class="deadline">
                                        <text class="datetime">{{formatDate(item.hdrq)}}</text>
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('certificate')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changeScientific">
                <uni-collapse-item title="科研经历" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/scientific?kyjlid=' + item.kyjlid" class="project-list cont-list" v-for="(item, i) in kyjlList"
                            :key="i" @longpress="scientificDel(item.kyjlid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{ item.kyxmmc }}</view>
                                    <view class="deadline">
                                        <text class="datetime">{{formatDate(item.ksrq)}} / {{formatDate(item.jsrq)}}</text>
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('scientific')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changePatent">
                <uni-collapse-item title="专利信息" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/patent?zlid=' + zl.zlid" class="project-list" v-for="(zl, i) in zlList"
                            :key="i" @longpress="longzl(zl.zlid)">
                            <view class="company-wrap">
                                <view class="company flex">
                                    <view class="company-name">{{ zl.zlmc }}</view>
                                    <view class="deadline">
                                        <text class="datetime">{{ formatDate(zl.pzrq) }}</text>
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('patent')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changePaper">
                <uni-collapse-item title="论文信息" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/paperInfo?lwid=' + lw.lwid" class="project-list" v-for="(lw, i) in lwList"
                            :key="i" @longpress="longlw(lw.lwid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{ lw.lwmc }}</view>
                                    <view class="deadline">
                                        <text class="datetime">{{ formatDate(lw.fbrq) }}</text>
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('paperInfo')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changeMainCourse">
                <uni-collapse-item title="研究方向主修课程" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/mainCourse?fxid=' + item.fxid" class="project-list cont-list" v-for="(item, i) in yjList"
                            :key="i" @longpress="longyj(item.fxid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{item.yjfx}}</view>
                                    <view class="deadline">
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                                <view class="limit">
                                    <text>{{item.bskt}}</text>
                                    <text>{{item.zxkc}}</text>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('mainCourse')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changeHonor">
                <uni-collapse-item title="荣誉奖励" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/honor?ryjlid='+item.ryjlid" class="project-list cont-list" v-for="(item, i) in jlList"
                            :key="i" @longpress="longjl(item.ryjlid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{item.jlmc}}</view>
                                    <view class="deadline">
                                        <text class="datetime">{{formatDate(item.jlrq)}}</text>
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('honor')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <view class="com-wrap fold">
            <uni-collapse accordion="true" @change="changePublicActive">
                <uni-collapse-item title="参与社会活动" class="title">
                    <view class="content">
                        <navigator :url="'/woDe/publicActive?hdid='+item.hdid" class="project-list cont-list" v-for="(item, i) in hdList"
                            :key="i" @longpress="longhd(item.hdid)">
                            <view class="company-wrap">
                                <view class="company">
                                    <view class="company-name">{{item.hdmc}}</view>
                                    <view class="deadline">
                                        <text class="datetime">{{formatDate(item.hdsj)}}</text>
                                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                        <view class="icon" @click="navigateToChild('publicActive')">
                            <image class="add middle" src="../../../static/icon/add1.png" alt="aspectFill"></image>
                            <text class="add-text middle">添加</text>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex';
    import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
    import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
    import dateUtil from '@/common/dateUtil.js';

    export default {
        data() {
            return {
                myInfo: {}, // 个人信息
                gzjlList: [], // 工作经历列表
                xmjyList: [], // 项目经验列表
                jyjllList: [], // 教育经历列表
                pxjlList: [], // 培训经历列表
                yynlList: [], // 语言能力列表
                jnList: [], // 技能列表
                zsList: [], // 证书列表
                kyjlList: [], // 科研经历列表
                zlList: [], // 专利列表
                lwList: [], // 论文列表
                yjList: [], // 研究方向列表
                jlList: [], // 荣誉奖励列表
                hdList: [] // 社会活动经历列表
            };
        },
        components: {
            uniCollapse,
            uniCollapseItem
        },
        computed: {
            ...mapState({
                m_xbdm: state => state.dmMap.m_xbdm,
                m_xldm: state => state.dmMap.m_xldm,
                provinceMap: state => state.provinceMap,
                cityMap: state => state.cityMap,
                districtMap: state => state.districtMap,
                sftzMap: state => state.sftzMap,
                yynlMap: state => state.yynlMap
            }),
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            // location() {
            //     if (this.provinceMap && this.cityMap && this.districtMap && this.myInfo.dqszs && this.myInfo.dqszcs!='null') {
            //         return this.provinceMap[this.myInfo.dqszs] + "-" + this.cityMap[this.myInfo.dqszs][this.myInfo.dqszcs];
            //     }

            //     return "";
            // }
        },
        onShow() {
            this.getMyInfo(); // 个人信息
            this.getGzjlList(); // 工作经历
            this.getXmjyList(); // 项目经验
            this.getJyjlList(); // 教育经历
        },
        methods: {
            formatDate(date) {
                return dateUtil.formatDate1(date);
            },
            formatDateFull() {
                return dateUtil.formatDate1(date);
            },

            navigateToChild(name) {
                console.log("navigateToChild ", name);
                uni.navigateTo({
                    url: '/woDe/' + name
                });
            },

            /* 个人基本信息 */
            getMyInfo() {
                this.$http({
                    url: `/qz/qzgrjbxx/myInfo`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.myInfo = data.data.qzGrjbxxBase;
                            // this.myInfo.dqszs =  data.data.qzGrjbxxBase.dqszs;
                            //   this.myInfo.dqszcs =  data.data.qzGrjbxxBase.dqszcs;
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
            /* 工作经历 */
            getGzjlList() {
                this.$http({
                    url: `/qz/qzgzjl/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.gzjlList = data.data.gzjlList;
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
            /* 长按删除工作经历 */
            experienceDel(gzjlid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deleteGzjlItem(gzjlid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 工作经历删除信息 */
            deleteGzjlItem(gzjlid) {
                this.$http({
                    url: `/qz/qzgzjl/delete/${gzjlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getGzjlList();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },
            /* 项目经验 */
            getXmjyList() {
                this.$http({
                    url: `/qz/qzxmjy/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.xmjyList = data.data.xmjyList;
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
            /* 长按删除项目经验 */
            projectDel(xmjyid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deleteXmjyItem(xmjyid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 项目经验删除信息 */
            deleteXmjyItem(xmjyid) {
                this.$http({
                    url: `/qz/qzxmjy/delete/${xmjyid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getXmjyList()();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },
            /* 教育经历 */
            getJyjlList() {
                this.$http({
                    url: `/qz/qzjyjl/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.jyjllList = data.data.list;
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
            /* 长按删除教育经历 */
            educationDel(jyjlid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deleteJyjlItem(jyjlid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 教育经历删除信息 */
            deleteJyjlItem(jyjlid) {
                this.$http({
                    url: `/qz/qzjyjl/delete/${jyjlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getJyjlList()();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },

            /* 培训经历展开 */
            changeTrain(e) {
                if (e.length > 0) {
                    this.getTrainList();
                }
            },
            /* 培训经历 */
            getTrainList() {
                this.$http({
                    url: `/qz/qzpxjl/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.pxjlList = data.data.pxjlList;
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
            /* 长按删除培训经历 */
            trainDel(pxjlid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deleteTrainItem(pxjlid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 培训经历删除信息 */
            deleteTrainItem(pxjlid) {
                this.$http({
                    url: `/qz/qzpxjl/delete/${pxjlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getTrainList();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },
            /* 语言能力展开 */
            changeLanguage(e) {
                if (e.length > 0) {
                    this.getLanguageList();
                }
            },
            /* 语言能力列表 */
            getLanguageList() {
                this.$http({
                    url: `/qz/qzyynl/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.yynlList = data.data.yynlList;
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
            /* 长按删除语言能力 */
            languageDel(yyid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deleteYyItem(yyid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 语言能力删除信息 */
            deleteYyItem(yyid) {
                this.$http({
                    url: `/qz/qzyynl/delete/${yyid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getLanguageList();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },
            /* 职业技能展开 */
            changeProfessional(e) {
                if (e.length > 0) {
                    this.getProfessionalList();
                }
            },
            /* 职业技能列表 */
            getProfessionalList() {
                this.$http({
                    url: `/qz/qzzyjn/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.jnList = data.data.list;
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
            /* 长按删除职业技能 */
            professionalDel(jnid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deleteJnItem(jnid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 职业技能删除信息 */
            deleteJnItem(jnid) {
                this.$http({
                    url: `/qz/qzzyjn/delete/${jnid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getProfessionalList();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },
            /* 科研经历展开 */
            changeScientific(e) {
                if (e.length > 0) {
                    this.getScientificList();
                }
            },
            /* 科研经历信息列表 */
            getScientificList() {
                this.$http({
                    url: `/qz/qzkyjl/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.kyjlList = data.data.kyjlList;
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
            /* 长按删除科研经历信息 */
            scientificDel(kyjlid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deletekyjlItem(kyjlid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 科研经历删除信息 */
            deletekyjlItem(kyjlid) {
                this.$http({
                    url: `/qz/qzkyjl/delete/${kyjlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getScientificList();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },
            /* 获得证书展开 */
            changeCertificate(e) {
                console.log("changeCertificate ", e);

                if (e.length > 0) {
                    this.getCertificateList();
                }
            },
            /* 证书信息列表 */
            getCertificateList() {
                this.$http({
                    url: `/qz/qzzsxx/list`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.zsList = data.data.list;
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
            /* 长按删除证书信息 */
            certificateDel(zsid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.deleteZsItem(zsid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            /* 证书信息删除信息 */
            deleteZsItem(zsid) {
                this.$http({
                    url: `/qz/qzkyjl/delete/${zsid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getCertificateList();
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '删除失败!'
                        });
                    }
                });
            },

            /* 论文信息展开 */
            changePaper(e) {
                if (e.length > 0) {
                    this.getlwList();
                }
            },
            //获取论文信息列表
            getlwList() {
                this.$http({
                    url: '/qz/qzlwxx/list',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.lwList = data.data.qzLwxxlist;
                        }
                    }
                });
            },
            //长按删除论文信息
            longlw(lwid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: function(res) {
                        if (res.confirm) {
                            this.lwDelete(lwid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }.bind(this)
                });
            },
            //论文删除
            lwDelete(lwid) {
                this.$http({
                    url: `/qz/qzlwxx/delete/${lwid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {}
                        this.getlwList();
                    }
                });
            },


            /* 专利信息展开 */
            changePatent(e) {
                if (e.length > 0) {
                    this.getzlList();
                }
            },
            //获取专利信息列表
            getzlList() {
                // var that = this
                this.$http({
                    url: '/qz/qzzlxx/list',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.zlList = data.data.list;
                        }
                    }
                });
            },
            //长按删除专利信息
            longzl(zlid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: function(res) {
                        if (res.confirm) {
                            this.zlDelete(zlid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }.bind(this)
                });
            },
            //专利删除
            zlDelete(zlid) {
                // var that = this
                this.$http({
                    url: `/qz/qzzlxx/delete/${zlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {}
                        this.getzlList();
                    }
                });
            },

            /* 研究方向展开 */
            changeMainCourse(e) {
                if (e.length > 0) {
                    this.getyjList();
                }
            },
            //获取研究方向列表
            getyjList() {
                // var that = this
                this.$http({
                    url: '/qz/qzyjfxzxkc/list',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.yjList = data.data.list;
                        }
                    }
                });
            },
            //长按删除研究方向
            longyj(fxid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: function(res) {
                        if (res.confirm) {
                            this.yjDelete(fxid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }.bind(this)
                });
            },
            //研究方向删除
            yjDelete(fxid) {
                // var that = this
                this.$http({
                    url: `/qz/qzyjfxzxkc/delete/${fxid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.getyjList();
                        }
                    }
                });
            },

            /* 奖励信息展开 */
            changeHonor(e) {
                if (e.length > 0) {
                    this.getjlList();
                }
            },
            //获取奖励信息列表
            getjlList() {
                // var that = this
                this.$http({
                    url: '/qz/qzryjl/list',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.jlList = data.data.ryjlList;
                        }
                    }
                });
            },
            //长按删除荣誉奖励
            longjl(ryjlid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: function(res) {
                        if (res.confirm) {
                            this.jlDelete(ryjlid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }.bind(this)
                });
            },
            //荣誉奖励删除
            jlDelete(ryjlid) {
                // var that = this
                this.$http({
                    url: `/qz/qzryjl/delete/${ryjlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {}
                        this.getjlList();
                    }
                });
            },

            /* 社会活动展开 */
            changePublicActive(e) {
                if (e.length > 0) {
                    this.gethdList();
                }
            },
            //获取社会活动列表
            gethdList() {
                this.$http({
                    url: '/qz/qzshhd/list',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.hdList = data.data.shhdList;
                        }
                    }
                });
            },
            //长按删除社会活动
            longhd(hdid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: function(res) {
                        if (res.confirm) {
                            this.hdDelete(hdid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }.bind(this)
                });
            },
            //社会活动删除
            hdDelete(hdid) {
                this.$http({
                    url: `/qz/qzshhd/delete/${hdid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.gethdList();
                        }

                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    page {
        background: #fafafa;
    }

    .resume-page {
        padding: 20rpx;
    }

    .com-wrap {
        width: 100%;
        box-shadow: 0 0 10rpx #e9e9e9;
        border-radius: 12rpx;
        background: #fff;
        margin-bottom: 20rpx;
    }

    .fold {
        .title {
            font-size: 30rpx;
            color: #333333;
            font-weight: 600;

            /deep/ .uni-collapse-cell__title-text {
                font-size: 30rpx;
            }

            .content {
                font-weight: normal;
                border-top: 1px solid #ffffff;

                .cont-list {
                    border-bottom: 1px solid #ffffff;
                }

                .icon {
                    text-align: center;
                    line-height: 70rpx;

                    .add {
                        width: 30rpx;
                        height: 30rpx;
                        margin-right: 10rpx;
                    }

                    .add-text {
                        color: #ff8421;
                        font-size: 26rpx;
                        font-weight: 600;
                    }
                }

                .back-icon {
                    width: 13rpx;
                    height: 24rpx;
                    display: inline-block;
                    vertical-align: middle;
                }

                .language {
                    padding: 20rpx;
                    font-size: 26rpx;
                    color: #666666;
                    line-height: 50rpx;

                    .lang-name {
                        font-size: 28rpx;
                        color: #333333;
                        font-weight: 600;
                        margin-bottom: 10rpx;
                    }

                    .btn {
                        color: #1d97ff;
                        margin-right: 20rpx;
                    }

                    /deep/ button {
                        color: #1d97ff;
                        margin-right: 20rpx;
                        line-height: 50rpx;
                        font-size: 26rpx;
                        padding: 0 20rpx;
                        background: #ffffff;
                    }

                    /deep/ button:after {
                        border: none;
                    }

                    .strip {
                        margin-right: 40rpx;
                    }
                }
            }

            .project-list {
                border-top: none;
                border-bottom: 1rpx solid #ffffff;
            }
        }
    }

    .top {
        padding: 16rpx 10rpx 10rpx 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .top-left {
            width: 60%;

            .title {
                display: flex;
                margin-bottom: 16rpx;

                .name {
                    color: #333333;
                    font-size: 30rpx;
                    font-weight: 600;

                    line-height: 36rpx;
                    display: inline-block;
                    vertical-align: middle;
                }

                .sex {
                    font-size: 30rpx;
                    color: #999999;
                    margin: 0 20rpx 0 10rpx;
                }

                .edit {
                    width: 32rpx;
                    height: 32rpx;
                    display: inline-block;
                    vertical-align: middle;
                }
            }

            .nature {
                van-button {
                    margin-right: 10rpx;
                }
            }
        }

        .top-right {
            .head {
                width: 140rpx;
                height: 140rpx;
            }
        }
    }

    .experience-title {
        line-height: 80rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20rpx;

        .text {
            font-size: 30rpx;
            color: #333333;
            font-weight: 600;

            .star {
                color: #ff8d32;
                margin-left: 8rpx;
            }
        }

        .add {
            width: 36rpx;
            height: 36rpx;
        }

        &.bot-none {
            border-bottom: none;
        }
    }

    .project-list {
        border-top: 1rpx solid #f2f2f2;

        .company-wrap {
            padding: 20rpx;

            .company {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .company-name {
                    font-size: 28rpx;
                    color: #333333;
                    font-weight: 600;
                }

                .deadline {
                    .datetime {
                        color: #999999;
                        font-size: 24rpx;
                        margin-right: 20rpx;
                        display: inline-block;
                        vertical-align: middle;
                    }

                    .back-icon {
                        width: 13rpx;
                        height: 24rpx;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }

            .station {
                line-height: 40rpx;
                color: #999999;
                font-size: 24rpx;
                margin-top: 10rpx;

                .wage {
                    margin-left: 10rpx;
                }
            }

            .duty {
                margin-top: 10rpx;
                font-size: 24rpx;
                color: #333333;

                .list {
                    line-height: 40rpx;
                }

                textarea {
                    padding: 0rpx;
                }
            }

            .limit {
                font-size: 24rpx;
                color: #b2b2b2;
                line-height: 50rpx;
            }

            .limit text {
                padding: 0 10rpx;
                border-right: 1px solid #cccccc;
            }

            .limit text:first-child {
                padding-left: 0;
            }

            .limit text:last-child {
                border-right: none;
            }
        }
    }
</style>
