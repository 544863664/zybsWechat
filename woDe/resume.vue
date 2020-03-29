<template>
    <view>
        <view class="top-box">
            <text>到我要参会界面</text>
            <image class="top-logo" src="../../../static/icon/back.png"></image>
        </view>
        <view class="email-list" v-for="(item,i) in emsList" :key="i" @click="check" @longpress="longpress(item.jlfjid)">
            <view class="email-name">
                <view class="">
                    文件名称:
                </view>
                <view class="">
                    {{item.jlmc}}
                </view>
            </view>
            <view class="email-time">
                <view class="">
                    上传时间:
                </view>
                <view class="">
                    {{formatYear(item.scsj)}}
                </view>
            </view>
        </view>
        <!-- <image class="image-box" src="../../../static/icon/555.png"></image> -->
        <view class="text-box">赶紧上传吧！博士上传附件简历 审核通过后，会有惊喜哦！</view>
        <!-- <view class="computer" @click="phonesend">手机上传123</view> -->
        <!-- <view class="computer" @click="gosend">电脑上传</view> -->
        <view class="phone" @click="uploadHtml">手机上传</view>
        <view class="computer" @click="preview">电子简历预览</view>
        <view class="computer" @click="saveDocx">电子简历生成</view>
        <!-- <view class="computer" @click="getDocx">获取电子简历url</view> -->

        <view class="instructions">
            <text>说明：仅支持</text>
            <text class="instructions-detail">PDF、WORD、JPG、PNG</text>
            <text>等格式，大小不超过4M</text>
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

    import {
        timestamp,
        add0
    } from '@/common/util.js';
    import moment from 'moment';
    import {
        getWxfileupload
    } from '@/common/js/baseUrl.js';
    import uniList from '@/components/uni-list/uni-list.vue';
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
    import uniIcons from '@/components/uni-icons/uni-icons.vue';

    export default {
        data() {
            return {
                bucket: '',
                securityToken: '',
                accessKeySecret: '',
                accessKeyId: '',
                expiration: '',
                userId: '',
                suffix: '',
                file: "file",
                fileList: [],
                emsList: [],
                jlmc: "", //简历名称
            };
        },
        components: {
            uniList,
            uniListItem,
            uniIcons
        },
        onShow() {
            this.email()
        },
        computed: {
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            // ...mapState('loginState', {
            // 	token: state => state.token
            // }),
        },
        methods: {
            uploadHtml: function() {
                // 面试邀约
                // console.log("上传");
                // this.$http({
                //     url: '/qz/qzjlfj/save',
                //     method: 'POST',
                //     header: {
                //         token: this.token
                //     },
                //     data: {

                //     },
                //     success: data => {
                //         if (data.data.code == 0) {}
                //     }
                // });
                uni.navigateTo({
                    url: '/woDe/uploadHtml'
                });
            },
            preview: function() {
                uni.downloadFile({
                    url: 'https://bst.91boshuo.com/api/qz/qzjldz/preViewDocx',
                    // url: 'http://localhost:8306/qz/qzjldz/preViewDocx',
                    header: {
                        userId: '415503607920726016',
                        token: this.token
                    },
                    success: function(res) {
                        let filePath = res.tempFilePath;
                        uni.openDocument({
                            filePath: filePath,
                            fileType: 'docx',
                            success: (res) => {
                                console.log('openDocument success', res);
                            },
                            fail: (res) => {
                                console.log("openDocument fail ", res);
                            }
                        });
                    }
                });
            },
            saveDocx: function() {
                uni.request({
                    url: 'http://192.168.8.204/api/qz/qzjldz/save',
                    header: {
                        token: this.token
                    },
                    success: (res) => {
                        console.log('saveDocx success', res);
                    },
                    fail: (res) => {
                        console.log('saveDocx fail', res);
                    }
                })
            },
            getDocx: function function_name() {
                uni.request({
                    url: 'http://192.168.8.204/api/qz/qzjldz/info/408682372645789696',
                    header: {
                        token: this.token
                    },
                    success: (res) => {
                        console.log('saveDocx success', res);
                    },
                    fail: (res) => {
                        console.log('saveDocx fail', res);
                    }
                })
            },
            afterRead(event) {
                const {
                    file
                } = event.detail;
                // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
                wx.uploadFile({
                    url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
                    filePath: file.path,
                    name: 'file',
                    formData: {
                        user: 'test'
                    },
                    success(res) {
                        // 上传完成需要更新 fileList
                        const {
                            fileList = []
                        } = this.data;
                        fileList.push({ ...file,
                            url: res.data
                        });
                        this.setData({
                            fileList
                        });
                    }
                });
            },
            /* 上传 */
            onUpload() {
                this.$refs.lFile.upload({
                    // #ifdef APP-PLUS
                    currentWebview: this.$mp.page.$getAppWebview(),
                    // #endif
                    url: 'https://www.example.com/upload', //测试地址，记得更换
                    name: 'file',
                    // header: {'Content-Type':'类型','Authorization':'token'},
                    //...其他参数
                });
            },
            onSuccess(res) {
                console.log('上传成功回调', JSON.stringify(res));
            },
            formatYear(date) {
                return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('YYYY-MM-DD');
            },
            gosend() {
                uni.navigateTo({
                    url: '/woDe/computer'
                });
            },
            phonesend() {
                this.$http({
                    url: `/sysConfig/api/system/systemupload/createUrl/1`, //仅为示例，并非真实接口地址。
                    data: {
                        userId: 123,
                        childSystem: "qz"
                    },
                    method: 'GET',
                    success: resData => {
                        console.log(resData);

                        if (resData && resData.data && resData.data.code == 0) {
                            let info = resData.data.info;

                            this.$refs.lFile.upload({
                                // #ifdef APP-PLUS
                                currentWebview: this.$mp.page.$getAppWebview(),
                                // #endif
                                url: info.host, //测试地址，记得更换
                                header: {},
                                formData: {
                                    "key": info.dir,
                                    "policy": info.policy,
                                    "OSSAccessKeyId": info.accessid,
                                    "signature": info.signature,
                                    // "callback": info.callback,
                                    "success_action_status": "200"
                                }
                            });
                        } else {

                        }
                    },
                    fail: error => {
                        console.log(error);
                        this.loading = true;
                        uni.showToast({
                            title: error,
                            duration: 2000
                        });
                    }
                });
            },

            uploadPic(obj) {

            },
            email() {
                this.$http({
                    url: '/qz/qzjlfj/list',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        console.log(data);
                        if (data.data.code === 0) {
                            this.emsList = data.data.jlfjList;

                        }
                    }
                });
            },
            check() {
                uni.downloadFile({
                    url: 'http://192.168.8.204/api/qz/qzjldz/preViewDocx',
                    header: {
                        token: this.token
                    },
                    success: function(res) {
                        var filePath = res.tempFilePath;
                        uni.openDocument({
                            filePath: filePath,
                            fileType: 'docx',
                            success: (res) => {
                                console.log('openDocument success', res);
                            },
                            fail: (res) => {
                                console.log("openDocument fail ", asdf);
                            }
                        });
                    }
                });
            },
            //长按删除
            longpress(jlfjid) {
                uni.showModal({
                    title: '提示',
                    content: '是否删除这条信息?',
                    success: res => {
                        if (res.confirm) {
                            this.jlDelete(jlfjid);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            //删除
            jlDelete(jlfjid) {
                this.$http({
                    url: `/qz/qzjlfj/delete/${jlfjid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        console.log(data);
                        if (data.data.code === 0) {
                            this.email();
                        }
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .top-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 83rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
        font-size: 22rpx;
        color: #999999;
        box-sizing: border-box;
        padding: 0 20rpx;

        .top-logo {
            width: 12rpx;
            height: 22rpx;
        }

    }

    .email-list {
        /* width: 100%; */
        height: 85rpx;
        // line-height: 85rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFFFFF;
        border-radius: 15rpx;
        margin: 20rpx;
        box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
        padding: 20rpx;

        .email-name {
            color: #999999;
            font-size: 24rpx;
        }

        .email-time {
            color: #999999;
            font-size: 24rpx;
        }

    }

    .image-box {
        width: 397rpx;
        height: 311rpx;
        margin-top: 49rpx;
        margin-left: 163rpx;
    }

    .text-box {
        width: 594rpx;
        height: 73rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 45rpx;
        color: #999999;
        text-align: center;
        margin: 64rpx 0 0 78rpx;
    }

    .computer {
        width: 593rpx;
        height: 80rpx;
        /* background: #ff8a20; */
        border: 3rpx solid #fe9038;
        border-radius: 40rpx;
        margin: 30rpx auto;
        text-align: center;
        line-height: 80rpx;
        font-size: 32rpx;
        color: #ff8a20;
    }

    .phone {
        width: 593rpx;
        height: 80rpx;
        border: 3rpx solid #fe9038;
        border-radius: 40rpx;
        margin: 30rpx auto;
        text-align: center;
        line-height: 80rpx;
        font-size: 32rpx;
        color: #ff8a20;
    }

    .instructions {
        font-size: 20rpx;
        font-weight: 400;
        color: #999999;
        line-height: 45px;
        margin: 31rpx 0 0 78rpx;

        .instructions-detail {
            color: #ff8a20;
        }
    }

    .computer:hover {
        background-color: #ff8a20;
        color: #ffffff;
    }

    .phone:hover {
        background-color: #ff8a20;
        color: #ffffff;
    }
</style>
