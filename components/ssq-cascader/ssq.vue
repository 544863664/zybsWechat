<template>
    <view class="list">
        <view class="title">{{ title }}</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-db">
                    <picker class="content" mode="multiSelector" :range="cityArray" :value="ssqValue" range-key="name"
                        @cancel="bindSiteCancel" @change="bindSite" @columnchange="bindSiteColumn">
                        <view class="uni-input middle">
                            {{ provinceMap[province] }}-{{ cityMap[province][city] }}
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
            city: '',
            district: ''
        },
        data() {
            return {
                lprovince: "",
                lcity: "",
                ldistrict: "",
            };
        },
        computed: {
            ...mapState({
                provinceList: state => state.provinceList,
                cityMapList: state => state.cityMapList,
                districtMapList: state => state.districtMapList,
                provinceMap: state => state.provinceMap,
                cityMap: state => state.cityMap,
                districtMap: state => state.districtMap
            }),

            p() {
                return this.lprovince || this.province;
            },

            c() {
                return this.lcity || this.city;
            },

            d() {

                console.log("this.districtMap = ", this.districtMap);
                console.log("this.city = ", this.city);
                console.log("this.district = ", this.district);

                return this.ldistrict || this.district;
            },

            ssqValue: function() {
                let value = [0, 0, 0];

                value[0] = this.getIndex(this.provinceList, this.p);

                let pCityList = this.cityMapList[this.p]; //选中的省所有市
                value[1] = this.getIndex(pCityList, this.c);

                // let cDistrictList = this.districtMapList[this.c]; //选中的市所有县
                // value[2] = this.getIndex(cDistrictList, this.d);
               console.log(value)
                return value;

            },

            cityArray: function() {
                let value = [
                    [],
                    // [],
                    []
                ];

                if (this.provinceList && this.provinceList.length > 0) {
                    value[0] = this.provinceList;

                    let pCityList = this.cityMapList[this.p]; //选中的省所有市
                    if (pCityList && pCityList.length > 0) {
                        value[1] = pCityList;
                        // let cDistrictList = this.districtMapList[this.c]; //选中的市所有县
                        // if (cDistrictList && cDistrictList.length > 0) {
                            // value[2] = cDistrictList;
                        // }
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
                // this.ldistrict = this.district;
            },

            bindSite(e) {
                let idxs = e.detail.value;
                if (idxs && idxs.length == 3) {
                    this.lprovince = this.provinceList[idxs[0]].dm;
                    this.lcity = this.cityMapList[this.lprovince][idxs[1]].dm;
                    // this.ldistrict = this.districtMapList[this.lcity][idxs[2]].dm;
                    this.$emit("confirm", {
                        province: this.lprovince,
                        city: this.lcity,
                        // district: this.ldistrict
                    });
                }
            },
            /* 期望工作地点 */
            bindSiteColumn(e) {
                let column = e.detail.column;
                let index = e.target.value;

                if (column == 0) {
                    //省发生改变
                    this.lprovince = this.provinceList[index].dm;
                    let pCityList = this.cityMapList[this.lprovince]; //选中的省所有市

                    this.lcity = pCityList[0].dm; //默认第一个市
                } else if (column == 1) {
                    //市发生改变
                    let pCityList = this.cityMapList[this.lprovince]; //选中的省所有市

                    this.lcity = pCityList[index].dm; //市
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
