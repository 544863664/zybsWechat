<template>
    <view class="list">
        <view class="title">{{ title }}</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-db">
                    <picker class="content" mode="multiSelector" :range="gwlbArray" :value="gwlbValue" range-key="name"
                        @cancel="bindSiteCancel" @change="bindSite" @columnchange="bindSiteColumn">
                        <view class="uni-input middle">
                            {{ gwlb1Map[gwlb1] }}-{{ gwlb2Map[gwlb1][gwlb2] }}-{{ gwlb3Map[gwlb2][gwlb3] }}
                        </view>
                        <image class="back-icon middle" src="/static/icon/back.png" mode="aspectFill"></image>
                    </picker>
                </view>
            </view>
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
        props: {
            title: '',
            gwlb1: '',
            gwlb2: '',
            gwlb3: ''
        },
        data() {
            return {
                lgwlb1: "",
                lgwlb2: "",
                lgwlb3: "",
            };
        },
        computed: {
            ...mapState({
                gwlb1List: state => state.gwlb1List,
                gwlb2MapList: state => state.gwlb2MapList,
                gwlb3MapList: state => state.gwlb3MapList,
                gwlb1Map: state => state.gwlb1Map,
                gwlb2Map: state => state.gwlb2Map,
                gwlb3Map: state => state.gwlb3Map
            }),

            l1() {
                return this.lgwlb1 || this.gwlb1;
            },

            l2() {
                return this.lgwlb2 || this.gwlb2;
            },

            l3() {
                return this.lgwlb3 || this.gwlb3;
            },

            gwlbValue: function() {
                let value = [0, 0, 0];

                value[0] = this.getIndex(this.gwlb1List, this.l1);

                let gwlb2List = this.gwlb2MapList[this.l1];
                value[1] = this.getIndex(gwlb2List, this.l2);

                let gwlb3List = this.gwlb3MapList[this.l2];
                value[2] = this.getIndex(gwlb3List, this.l3);

                return value;
            },

            gwlbArray: function() {
                let value = [
                    [],
                    [],
                    []
                ];

                if (this.gwlb1List && this.gwlb1List.length > 0) {
                    value[0] = this.gwlb1List;

                    let gwlb2List = this.gwlb2MapList[this.l1]; //选中的省所有市
                    if (gwlb2List && gwlb2List.length > 0) {
                        value[1] = gwlb2List;

                        let gwlb3List = this.gwlb3MapList[this.l2]; //选中的市所有县
                        if (gwlb3List && gwlb3List.length > 0) {
                            value[2] = gwlb3List;
                        }
                    }
                }

                return value;
            }
        },

        methods: {
            getIndex(list, dm) {
                let index = null;
                if (dm && list && list.length > 0) {
                    list.forEach((item, idx) => {
                        if (dm == item.dm) {
                            index = idx;
                        }
                    });
                }
                return index;
            },

            bindSiteCancel() {
                this.lgwlb1 = this.gwlb1;
                this.lgwlb2 = this.gwlb2;
                this.lgwlb3 = this.gwlb3;
            },

            bindSite(e) {
                let idxs = e.detail.value;

                if (idxs && idxs.length) {
                    this.lgwlb1 = this.gwlb1List[idxs[0]].dm;
                    this.lgwlb2 = this.gwlb2MapList[this.lgwlb1][idxs[1]].dm;
                    this.lgwlb3 = this.gwlb3MapList[this.lgwlb2][idxs[2]].dm;

                    this.$emit("confirm", {
                        gwlb1: this.lgwlb1,
                        gwlb2: this.lgwlb2,
                        gwlb3: this.lgwlb3
                    });
                }
            },
            /* 期望工作地点 */
            bindSiteColumn(e) {
                let column = e.detail.column;
                let index = e.target.value;

                if (column == 0) {
                    //gwlb1发生改变
                    this.lgwlb1 = this.gwlb1List[index].dm;
                    let gwlb2List = this.gwlb2MapList[this.lgwlb1]; //选中的gwlb1所有gwlb2

                    this.lgwlb2 = gwlb2List[0].dm; //默认第一个gwlb2
                } else if (column == 1) {
                    //gwlb2发生改变
                    let gwlb2List = this.gwlb2MapList[this.lgwlb1]; //选中的gwlb1所有gwlb2

                    this.lgwlb2 = gwlb2List[index].dm; //gwlb2
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .list {
        .title {
            font-size: 24rpx;
            color: #999999;
            line-height: 50rpx;
        }

        .content {
            height: 60rpx;
            line-height: 60rpx;
            font-size: 30rpx;
            color: #333333;

            .back-icon {
                width: 13rpx;
                height: 24rpx;
            }

            /deep/ .uni-input {
                width: 98%;
            }

            .describe {
                color: #888888;
            }
        }
    }
</style>
