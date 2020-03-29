<template>
	<view class="content">
		<view :style="{height: tabHeight + 1 +'px'}">
			<view :class="topFixed?'select-tab-fixed-top':'select-tab'" :style="{height: tabHeight+'px'}">
				<view class="select-tab-item" :style="{width: itemWidth}" v-for="(item,idx) in filterList" :key="idx" @tap="showMenuClick(idx)">
					<text :style="{color:color}">{{item.title}}</text>
					<text class="arrows sl-font" :class="item.isActive?up:down"></text>
				</view>
			</view>
		</view>
		<popup-layer ref="popupRef" @close="close" :direction="'bottom'" :isTransNav="isTransNav" :navHeight="navHeight" :tabHeight="tabHeight">
			<sl-filter-view :ref="slFilterView" :independence="independence" :themeColor="themeColor" @confirm="filterResult"/>
		</popup-layer>
	</view>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
	import popupLayer from '@/components/sl-filter/popup-layer.vue';
	import slFilterView from '@/components/sl-filter/filter-view.vue';

	export default {
		components: {
			popupLayer,
			slFilterView
		},
		props: {
			menuList: {
				type: Array,
				default () {
					return []
				}
			},
			themeColor: {
				type: String,
				default () {
					return '#000000'
				}
			},
			color: {
				type: String,
				default () {
					return '#666666'
				}
			},
			independence: {
				type: Boolean,
				default: false
			},
			isTransNav: {
				type: Boolean,
				default: false
			},
			navHeight: {
				type: Number,
				default: 0
			},
			topFixed: {
				type: Boolean,
				default: false
			}
		},
		computed: {
            ...mapState("gangWeiState",{
                filterList: state=>state.filterList
            }),
			itemWidth() {
				return 'calc(100%/2)'
			}
		},

		data() {
			return {
				down: 'sl-down',
				up: 'sl-up',
				tabHeight: 50,
			};
		},
		methods: {
            ...mapMutations("gangWeiState",[
                "clickFilterMenu",
				"clickFilterReset"
            ]),
            ...mapActions("gangWeiState",[

            ]),
			bindChange: function(e) {
				console.log(e)
				var idxs = e.detail.value;
			
				if (this.provinceList[idxs[0]]) {
					var lprovince = this.provinceList[idxs[0]].dm;
				}
				if (this.cityMapList[lprovince][idxs[1] || 0]) {
					var lcity = this.cityMapList[lprovince][idxs[1] || 0].dm;
				}
			
				console.log('省份代码', lprovince, '城市代码', lcity)
				this.a1 = lprovince;
			
			},
			// 重置所有选项，包括默认选项，并更新result
			resetAllSelect(callback) {

			},
			// 重置选项为设置的默认值，并更新result
			resetSelectToDefault(callback) {

			},
			resetMenuList(val) {

			},
			showMenuClick(idx) {
                this.clickFilterMenu(idx);
                console.log("this.filterList[idx].isActive = ",this.filterList[idx].isActive);
                if (this.filterList[idx].isActive == true) {
                    this.$refs.popupRef.show()
                } else {
                    this.$refs.popupRef.close();
                }
			},
			
			filterResult() {
				this.$refs.popupRef.close()
			},
            close() {
                this.clickFilterMenu("");
            }
        }
	}
</script>

<style>
	@import 'iconfont/iconfont.css';

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
		font-size: 14px;
	}
	.filter-content-footer {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 45px;
		margin-top: 10px;
	}
	
	.filter-content-footer-item {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
</style>
