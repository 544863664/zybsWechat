<template>
    <!-- 登录注册 -->
    <view v-if="!access.grantUserBaseInfo" class="login">
        <view class="logo">
            <image src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/bst/logo.png" mode="aspectFit"></image>
        </view>
        <view class="control">
            <button class="WeChat" type="primary" open-type="getUserInfo" @getuserinfo="wxGetUserInfoNoGrant"
                withCredentials="true">
                <image src="../../static/icon/WeChat.png" mode="aspectFit"></image>
                <text class="text">微信用户登录</text>
            </button>
            <button class="phone" type="primary" plain="true" open-type="getPhoneNumber" @getphonenumber="wxGetPhoneNumber">
                <image src="../../static/icon/phone.png" mode="aspectFit"></image>
                <text class="text">手机号登录/注册</text>
            </button>
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

    export default {
        components: {},
        data() {
            return {

            };
        },
        computed: {
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            ...mapState('loginState', {
                hasLogin: state => state.hasLogin,
                loginCode: state => state.loginCode,
                phone: state => state.phone,
                user: state => state.user,
                access: state => state.access
            })
        },
        methods: {
            ...mapMutations('loginState', ['updateAccess', 'updateToken', 'updateHasLogin', 'updateLoginCode',
                'updatePhone', 'updateUser'
            ]),

            ...mapActions('loginState', []),

            wxGetUserSetting: function() {
                return new Promise((resolve, reject) => {
                    uni.getSetting({
                        success: res => {
                            // console.log("wxGetUserSetting res.errMsg "+res.errMsg);
                            if (res.authSetting && res.errMsg == 'getSetting:ok') {
                                if (res.authSetting['scope.userInfo']) {
                                    this.updateAccess({
                                        grantUserBaseInfo: true
                                    });
                                } else {
                                    this.updateAccess({
                                        grantUserBaseInfo: false
                                    });
                                }
                                resolve();
                            } else {
                                // console.log("wxGetUserSetting fail 1");
                                reject('getSetting from wx fail 1');
                            }
                        },
                        fail: () => {
                            // console.log("wxGetUserSetting fail 2");
                            reject('getSetting from wx fail 2');
                        }
                    });
                });
            },

            wxGetUserInfoNoGrant: function(userResponse) {
                // console.log("wxGetUserInfoNoGrant = ",userResponse);
                if (userResponse && userResponse.mp && userResponse.mp.detail && userResponse.mp.detail.errMsg ==
                    'getUserInfo:ok') {
                    let detail = userResponse.mp.detail;
                    let iv = detail.iv;
                    let signature = detail.signature;
                    let encryptedData = detail.encryptedData;
                    let userInfo = detail.userInfo;

                    this.updateUser({
                        iv,
                        signature,
                        encryptedData,
                        userInfo
                    });

                    this.wxLogin()
                        .then(() => {
                            console.log('wxGetUserInfoNoGrant 1 ');
                            return this.bsLogin();
                        }).then(() => {
                            console.log('wxGetUserInfoNoGrant 2 ');
                            uni.navigateBack();
                        })
                        .catch(error => {
                            console.log('wxGetUserInfoNoGrant error = ', error);
                        });
                }
            },

            wxGetUserInfo: function() {
                return new Promise((resolve, reject) => {
                    uni.getUserInfo({
                        provider: 'weixin',
                        success: userResponse => {
                            console.log('wxGetUserInfo = ', userResponse);

                            if (userResponse && userResponse.errMsg == 'getUserInfo:ok') {
                                let iv = userResponse.iv;
                                let signature = userResponse.signature;
                                let encryptedData = userResponse.encryptedData;
                                let userInfo = userResponse.userInfo;

                                this.updateUser({
                                    iv,
                                    signature,
                                    encryptedData,
                                    userInfo
                                });

                                resolve();
                            } else {
                                reject('wxGetUserInfo from wx fail1');
                            }
                        },
                        fail: userResponse => {
                            console.log('wxGetUserInfo error = ', userResponse);
                            reject('wxGetUserInfo from wx fail2');
                        }
                    });
                });
            },

            wxGetPhoneNumber: function(e) {
                if (e && e.mp && e.mp.detail && e.mp.detail.errMsg == 'getPhoneNumber:ok') {
                    let detail = e.mp.detail;
                    let iv = detail.iv;
                    let encryptedData = detail.encryptedData;

                    this.updatePhone({
                        iv,
                        encryptedData
                    });

                    this.wxLogin()
                        .then(() => {
                            return this.bsLogin();
                        })
                        .catch(error => {
                            console.log('wxGetPhoneNumber error = ', error);
                        });
                }
            },

            wxLogin: function() {
                return new Promise((resolve, reject) => {
                    uni.login({
                        provider: 'weixin',
                        success: loginRes => {
                            if (loginRes && loginRes.errMsg == 'login:ok') {
                                this.updateLoginCode(loginRes.code);
                                resolve(loginRes.code);
                            } else {
                                //登录失败
                                reject('wxLogin from wx fail1');
                            }
                        },
                        fail: loginRes => {
                            console.log('wxLogin loginRes fail2 = ', loginRes);
                            reject('wxLogin from wx fail2');
                        }
                    });
                });
            },

            bsLogin: function() {
                let data = {
                    loginCode: this.loginCode
                };

                if (this.phone.iv) {
                    data.iv = this.phone.iv;
                    data.encryptedData = this.phone.encryptedData;
                    data.signature = '';
                } else {
                    data.iv = this.user.iv;
                    data.encryptedData = this.user.encryptedData;
                    data.signature = this.user.signature;
                }

                return new Promise((resolve, reject) => {
                    this.$http({
                        url: '/sec/wx/logonBst',
                        method: 'post',
                        data,
                        success: res => {
                            console.log('bsLogin success res= ', res);
                            if (res.data.code == 0) {
                                this.updateToken(res.data.token);
                                this.updateHasLogin(true);
                                resolve('bsLogin success');
                            } else {
                                this.updateToken('');
                                this.updateHasLogin(false);
                                reject('bsLogin fail');
                            }
                        },
                        fail: res => {
                            console.log('bsLogin fail = ', res);
                            reject('bsLogin fail');
                        }
                    });
                });
            },

            bsRefreshToken: function() {
                let url = '/sec/wx/refreshToken/' + this.token;

                return new Promise((resolve, reject) => {
                    this.$http({
                        url,
                        method: 'post',
                        data: {},
                        success: res => {
                            console.log('bsRefreshToken = ', res);
                            if (res.data.code == 0) {
                                this.updateToken(res.data.token);
                                this.updateHasLogin(true);
                                resolve(true);
                            } else {
                                this.updateToken('');
                                this.updateHasLogin(false);
                                resolve(false);
                            }
                        },
                        fail: res => {
                            reject('bsRefreshToken fail');
                        }
                    });
                });
            }
        },

        created() {
            console.log('login this.token = ', this.token);
            if (this.token == '') {
                //token为空
                //查看授权情况有2种情况
                //1未授权(也有可能是授权后又删除授权的)    先出示授权页面 如果拒绝显示返回首页按钮
                //2已授权
                //无论授权情况如何 登录微信拿到code，去后台换openid，查看用户是否已经存在
                //不存在-注册新用户
                //存在-更新老用户

                this.wxGetUserSetting()
                    .then(() => {
                        if (this.access.grantUserBaseInfo) {
                            //已授权 登录微信拿code
                            return this.wxLogin();
                        } else {
                            //未授权--出示授权页面
                            return new Promise((resolve, reject) => {
                                reject('not granted, go to grant page');
                            });
                        }
                    })
                    .then(() => {
                        //已授权 直接拿个人基本信息
                        return this.wxGetUserInfo();
                    })
                    .then(() => {
                        //拿个人基本信息成功 去后台换openid，查看用户是否已经存在
                        return this.bsLogin();
                    }).then(() => {
                        //登录成功返回上个页面
                        uni.navigateBack();
                    })
                    .catch(err => {
                        console.log('login created error1 = ', err);
                    });
            } else {
                //token存在 交给后台检查是否在有效期,
                //如果没有超时，后台产生新token返回给前台，前台使用新token
                //如果后台返回token超时,token重置为空,则重新发起登录
                this.bsRefreshToken()
                    .then(refresh => {
                        if (refresh) {
                            //token有效 无需做其他事情
                            console.log('bsRefreshToken token valid nothing to do');

                            return new Promise((resolve, reject) => {

                                console.log('bsRefreshToken token invalid start wxLogin');

                                reject('token is valid');

                                uni.navigateBack();
                            });
                        } else {
                            //失效 重新登录微信服务端拿到code,再换openid生成博硕token
                            //拿到code，去后台换openid，查看用户是否已经注册过

                            console.log('token invalid start wxLogin');
                            return this.wxLogin();
                        }
                    })
                    .then(() => {
                        return this.bsLogin();
                    }).then(() => {
                        uni.navigateBack();
                    })
                    .catch(e => {
                        console.log('login created error2 = ', e);
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .login {
        height: 100%;

        .logo {
            text-align: center;

            image {
                width: 200rpx;
                height: 200rpx;
                margin: 100rpx 0;
            }
        }

        .control {
            width: 80%;
            margin: 0 auto;

            .WeChat {
                margin-bottom: 30rpx;
                background: #ff4d4d;
            }

            .phone {
                color: #ff4d4d;
                border-color: #ff4d4d;
            }

            button {
                font-size: 28rpx;

                image {
                    width: 32rpx;
                    height: 32rpx;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 10rpx;
                }

                .text {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
