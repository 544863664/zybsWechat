<script>
    // import Vue from 'vue';
    import {
        mapState,
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex';

    export default {
        onLaunch: function() {
            console.log('App Launch');
            // #ifdef APP-PLUS
            // 锁定屏幕方向
            plus.screen.lockOrientation('portrait-primary'); //锁定
            // 检测升级
            uni.request({
                url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
                data: {
                    appid: plus.runtime.appid,
                    version: plus.runtime.version,
                    imei: plus.device.imei
                },
                success: res => {
                    console.log('success', res);
                    if (res.statusCode == 200 && res.data.isUpdate) {
                        let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
                        // 提醒用户更新
                        uni.showModal({
                            title: '更新提示',
                            content: res.data.note ? res.data.note : '是否选择更新',
                            success: showResult => {
                                if (showResult.confirm) {
                                    plus.runtime.openURL(openUrl);
                                }
                            }
                        });
                    }
                }
            });

            var domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                fontFamily: 'uniicons',
                src: "url('./static/uni.ttf')"
            });
            // #endif
            /* uni.getSystemInfo({
                success: function(e) {
                    Vue.prototype.statusBar = e.statusBarHeight;
                    // #ifndef MP
                    if (e.platform == 'android') {
                        Vue.prototype.customBar = e.statusBarHeight + 50;
                    } else {
                        Vue.prototype.customBar = e.statusBarHeight + 45;
                    }
                    // #endif

                    // #ifdef MP-WEIXIN
                    let custom = wx.getMenuButtonBoundingClientRect();
                    Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight;
                    // #endif

                    // #ifdef MP-ALIPAY
                    Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight;
                    // #endif
                }
            }); */
        },
        methods: {
            ...mapActions([
                "getBaseDm"
            ]),
        },
        onShow: function() {
            console.log('App Show');
            this.getBaseDm();
        },
        onHide: function() {
            console.log('App Hide');
        },
        globalData: {
            test: ''
        }
    };
</script>

<style>
    @import './colorui/main.css';
    @import './colorui/icon.css';
    @import './common/style/info.css';
    @import './common/style/reset.css';

    .nav-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0px 40upx 0px;
        justify-content: space-between;
    }

    .nav-li {
        padding: 30upx;
        border-radius: 12upx;
        width: 45%;
        margin: 0 2.5% 40upx;
        background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
        background-size: cover;
        background-position: center;
        position: relative;
        z-index: 1;
    }

    .nav-li::after {
        content: '';
        position: absolute;
        z-index: -1;
        background-color: inherit;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: -10%;
        border-radius: 10upx;
        opacity: 0.2;
        transform: scale(0.9, 0.9);
    }

    .nav-li.cur {
        color: #fff;
        background: rgb(94, 185, 94);
        box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
    }

    .nav-title {
        font-size: 32upx;
        font-weight: 300;
    }

    .nav-title::first-letter {
        font-size: 40upx;
        margin-right: 4upx;
    }

    .nav-name {
        font-size: 28upx;
        text-transform: Capitalize;
        margin-top: 20upx;
        position: relative;
    }

    .nav-name::before {
        content: '';
        position: absolute;
        display: block;
        width: 40upx;
        height: 6upx;
        background: #fff;
        bottom: 0;
        right: 0;
        opacity: 0.5;
    }

    .nav-name::after {
        content: '';
        position: absolute;
        display: block;
        width: 100upx;
        height: 1px;
        background: #fff;
        bottom: 0;
        right: 40upx;
        opacity: 0.3;
    }

    .nav-name::first-letter {
        font-weight: bold;
        font-size: 36upx;
        margin-right: 1px;
    }

    .nav-li text {
        position: absolute;
        right: 30upx;
        top: 30upx;
        font-size: 52upx;
        width: 60upx;
        height: 60upx;
        text-align: center;
        line-height: 60upx;
    }

    .text-light {
        font-weight: 300;
    }

    @keyframes show {
        0% {
            transform: translateY(-50px);
        }

        60% {
            transform: translateY(40upx);
        }

        100% {
            transform: translateY(0px);
        }
    }

    @-webkit-keyframes show {
        0% {
            transform: translateY(-50px);
        }

        60% {
            transform: translateY(40upx);
        }

        100% {
            transform: translateY(0px);
        }
    }
</style>
