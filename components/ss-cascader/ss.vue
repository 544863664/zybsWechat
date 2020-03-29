<template>
    <view class="list">
        <view class="title">{{ title }}</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-db">
                    <picker class="content" mode="multiSelector" :range="cityArray" :value="ssqValue" range-key="name"
                        @cancel="bindSiteCancel" @change="bindSite" @columnchange="bindSiteColumn">
                        <view class="uni-input middle">
                            {{ provinceMap[province] }} - {{ cityMap[province][city] }}
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
            province: '',
            city: ''
        },

        data() {
            return {
                lprovince: "",
                lcity: ""
            };
        },

        computed: {
            ...mapState({
                provinceList: state => state.provinceList,
                cityMapList: state => state.cityMapList,
                provinceMap: state => state.provinceMap,
                cityMap: state => state.cityMap
            }),

            p() {
                return this.lprovince || this.province;
            },
            c() {
                return this.lcity || this.city;
            },

            ssqValue: function() {
                let value = [0, 0];

                //当获取到省市数据后计算省市下表
                value[0] = this.getIndex(this.provinceList, this.p);

                let pCityList = this.cityMapList[this.p]; //选中的省所有市
                value[1] = this.getIndex(pCityList, this.c);

                return value;
            },

            cityArray: function() {
                let value = [
                    [],
                    []
                ];

                if (this.provinceList && this.provinceList.length > 0) {
                    //初始化省
                    value[0] = this.provinceList;

                    let pCityList = this.cityMapList[this.p]; //选中的省所有市
                    if (pCityList && pCityList.length > 0) {
                        //初始化市
                        value[1] = pCityList;
                    }
                }
               console.log(value)
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
                this.lprovince = this.province;
                this.lcity = this.city;
            },
            bindSite(e) {
                let idxs = e.detail.value;                
                console.log(e)
                if (idxs && idxs.length == 2&&idxs[0]) {
                    this.lprovince = this.provinceList[idxs[0]].dm;
                    this.lcity = this.cityMapList[this.lprovince][idxs[1]||0].dm;
                    this.$emit("confirm", {
                        province: this.lprovince,
                        city: this.lcity
                    });
                }
            },
            /* 期望工作地点 */
            bindSiteColumn(e) {
                console.log(e)
                let column = e.detail.column;
                let index = e.detail.value;

                if (column == 0) {
                    //省发生改变
                    if (this.provinceList && this.provinceList.length > 0) {
                        this.provinceList.forEach((item, idx) => {
                            if (idx == index) {
                                this.lprovince = item.dm;
                            }
                        });
                    }
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
