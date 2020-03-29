<template>

	<view>
		<view style="padding: 0px 0px;">
			<view class="filter-content" v-for="(item,idx) in filterList" :key="idx" v-if="item.isActive">
				
				<!-- <view v-if="item.isSort">
					<view class="filter-content-list">
						<view v-for="(detailItem,dIdx) in item.detailList" :key="dIdx" :class="detailItem.isSelected?'filter-content-list-item-active':'filter-content-list-item-default'"
						 :style="{'color': detailItem.isSelected?themeColor:'#666666'}" @tap="sortTap(item.key,null,detailItem.value)">
							<text>{{detailItem.title}}</text>
						</view>
					</view>
				</view> -->
				
				<view>
					<view v-if="item.key=='1'&&!item.childList">
						<picker-view  :value="value" @change="bindChange" style="height: 300px;">
							<picker-view-column>
								<view class="item" v-for="(item,index) in provinceList" :key="index">{{item.name}}省</view>
							</picker-view-column>
							<picker-view-column>
								<view class="item" v-for="(item,index) in cityMapList[a1]" :key="index">{{item.name}}市</view>
							</picker-view-column>
						</picker-view>
					</view>
					<view v-if="item.childList&&item.key!='1'">
						<view class="filter-content" v-for="(cItem,cIdx) in item.childList" :key="cIdx">
							<view class="filter-content-title" v-if="cItem.detailTitle && cItem.detailTitle.length">
								<text>{{cItem.detailTitle}}</text>
							</view>
							<view class="filter-content-detail">
								<text v-for="(detailItem,dIdx) in cItem.detailList" :key="dIdx" class='filter-content-detail-item-default'
								 :style="{'background-color':detailItem.isSelected?themeColor:'#FFFFFF','color':detailItem.isSelected?'#FFFFFF':'#666666'}"
								 @tap="itemTap(item.key,cItem.key,detailItem.value)">
									{{detailItem.title}}
								</text>
							</view>
						</view>
					</view>
					<view v-if="item.key=='4'">
						<view class="filter-content-title" v-if="item.detailTitle && item.detailTitle.length">
							<text>{{item.detailTitle}}</text>
						</view>
						<view class="filter-content-detail">
							<text v-for="(detailItem,dIdx) in item.detailList" :key="dIdx" class='filter-content-detail-item-default' :style="{'background-color':detailItem.isSelected?themeColor:'#FFFFFF','color':detailItem.isSelected?'#FFFFFF':'#666666'}"
							 @tap="itemTap(item.key,null,detailItem.value)">
								{{detailItem.title}}
							</text>
						</view>
					</view>

					<view class="filter-content-footer">
						<view class="filter-content-footer-item" style="color: #777777; background-color: #FFFFFF;" @tap="resetClick(item.key)">
							<text>重置</text>
						</view>
						<view class="filter-content-footer-item" :style="{'color': '#FFFFFF', 'background-color': themeColor}" @tap="sureClick(item.key)">
							<text>确定</text>
						</view>
					</view>
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
		data() {
			return {
				a1: '110100000000',
				province: '',
				city: '',
				visible: true,
				value: [],
				proCity: [],
			};
		},
		props: {
			themeColor: {
				type: String,
				default () {
					return '#D1372C'
				}
			}
		},
		computed: {
			...mapState("gangWeiState", {
				filterList: state => state.filterList,
			}),
			...mapState({
				provinceList: state => state.provinceList,
				cityMapList: state => state.cityMapList,
				provinceMap: state => state.provinceMap,
				cityMap: state => state.cityMap,
				dmMap: state => state.dmMap
			}),
		},
		methods: {
			bindChange: function(e) {
				console.log(e)
				var idxs = e.detail.value;

				if (this.provinceList[idxs[0]]) {
					var lprovince = this.provinceList[idxs[0]].dm;
				}
				if (this.cityMapList[lprovince][idxs[1] || 0]) {
					var lcity = this.cityMapList[lprovince][idxs[1] || 0].dm;
				}
				this.a1 = lprovince;
				this.proCity[0] = lprovince;
				this.proCity[1] = lcity;
				console.log('省份代码', lprovince, '城市代码', lcity)

			},
			...mapMutations("gangWeiState", [
				"clickFilterCondition",
				"clickFilterReset"
			]),
			...mapActions("gangWeiState", [
				"clickFilterConfirm"
			]),
			itemTap(key1, key2, value) {
				this.clickFilterCondition({
					key1,
					key2,
					value
				});
			},
			sortTap(key1, key2, value) {
				this.clickFilterCondition({
					key1,
					key2,
					value
				});
			},
			sureClick(key1) {
				if (key1 == '1') {
					console.log(this.proCity)
				} else {
					this.clickFilterConfirm();
					this.$emit("confirm");
				}
				
			},
			resetClick(key1) {
				this.clickFilterReset({
					key1
				});
			}
		}
	}
</script>

<style>
	.filter-content {
		background-color: #F6F7F8;
	}

	.filter-content-title {
		border-bottom: #EEEEEE 1px solid;
		padding: 10px 15px;
		font-size: 13px;
		color: #999999;
	}

	.filter-content-detail {
		padding: 5px 15px;
	}

	.filter-content-detail-item-active {
		background-color: #D1372C;
		color: #FFFFFF;
		padding: 5px 15px;
		border-radius: 20px;
		margin-right: 10px;
		margin-top: 10px;
		display: inline-block;
		font-size: 14px;
	}

	.filter-content-detail-item-default {
		background-color: #FFFFFF;
		color: #666666;
		padding: 5px 15px;
		border-radius: 20px;
		margin-right: 10px;
		margin-top: 10px;
		display: inline-block;
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

	.filter-content-list {

		padding: 5px 15px;
	}

	.filter-content-list-item-default {
		color: #666666;
		width: 100%;
		padding: 10px 0px;
	}

	.filter-content-list-item-default text {
		width: 90%;
		font-size: 14px;
		display: inline-block;
	}

	.filter-content-list-item-active {
		color: #D1372C;
		width: 100%;
		padding: 10px 0px;
	}

	.filter-content-list-item-active text {
		font-size: 14px;
		width: 90%;
		display: inline-block;
	}

	.filter-content-list-item-active:after {
		content: '✓';
	}
</style>
