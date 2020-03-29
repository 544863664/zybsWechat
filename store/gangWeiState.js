import api from '../api/gangWeiApi.js';

export default {
	namespaced: true,

	state: {
		popupShow: false,
		filterList: [{
			"detailTitle": "城市",
			"title": "城市",
			"key": "1",
			"isActive": false
		}, {
			"detailTitle": "岗位",
			"childList": [{
				"isMutiple": false,
				"detailList": [{
					"title": "一年以内",
					"value": "jy_001",
					"isSelected": false
				}],
				"detailTitle": "经验要求",
				"title": "经验要求",
				"key": "10"
			}, {
				"isMutiple": false,
				"detailList": [{
					"title": "0-20人",
					"value": "gm_001",
					"isSelected": false
				}, {
					"title": "20-99人",
					"value": "gm_002",
					"isSelected": false
				}, {
					"title": "100-499人",
					"value": "gm_003",
					"isSelected": false
				}, {
					"title": "500-999人",
					"value": "gm_004",
					"isSelected": false
				}, {
					"title": "1000-10000",
					"value": "gm_005",
					"isSelected": false
				}, {
					"title": "10000以上",
					"value": "gm_006",
					"isSelected": false
				}],
				"detailTitle": "学历",
				"title": "学历",
				"key": "8"
			}, {
				"isMutiple": false,
				"detailList": [{
					"title": "3K以下",
					"value": "dy_001",
					"isSelected": false
				}, {
					"title": "3-5K",
					"value": "dy_002",
					"isSelected": false
				}, {
					"title": "5-10k",
					"value": "dy_003",
					"isSelected": false
				}],
				"detailTitle": "薪资待遇",
				"title": "薪资待遇",
				"key": "9"
			}],
			"title": "岗位",
			"key": "2",
			"isActive": false
		}, {
			"isMutiple": false,
			"detailList": [{
				"title": "text1",
				"value": "22",
				"isSelected": false
			}, {
				"title": "text2",
				"value": "23",
				"isSelected": false
			}],
			"detailTitle": "单位",
			"childList": [{
				"isMutiple": false,
				"detailList": [{
					"title": "一年以内",
					"value": "jy_001",
					"isSelected": false
				}],
				"detailTitle": "单位行业",
				"title": "单位行业",
				"key": "10"
			}, {
				"isMutiple": false,
				"detailList": [{
					"title": "0-20人",
					"value": "gm_001",
					"isSelected": false
				}, {
					"title": "20-99人",
					"value": "gm_002",
					"isSelected": false
				}, {
					"title": "100-499人",
					"value": "gm_003",
					"isSelected": false
				}, {
					"title": "500-999人",
					"value": "gm_004",
					"isSelected": false
				}, {
					"title": "1000-10000",
					"value": "gm_005",
					"isSelected": false
				}, {
					"title": "10000以上",
					"value": "gm_006",
					"isSelected": false
				}],
				"detailTitle": "单位性质",
				"title": "单位性质",
				"key": "8"
			}, {
				"isMutiple": false,
				"detailList": [{
					"title": "3K以下",
					"value": "dy_001",
					"isSelected": false
				}, {
					"title": "3-5K",
					"value": "dy_002",
					"isSelected": false
				}, {
					"title": "5-10k",
					"value": "dy_003",
					"isSelected": false
				}],
				"detailTitle": "单位规模",
				"title": "单位规模",
				"key": "9"
			}],
			"title": "单位",
			"key": "3",
			"isActive": false
		}, {
			"isMutiple": false,
			"detailList": [{
				"title": "升序",
				"value": "22",
				"isSelected": false
			}, {
				"title": "降序",
				"value": "23",
				"isSelected": false
			}],
			"detailTitle": "排序",
			"title": "排序",
			"key": "4",
			"isActive": false
		}],
		currPage: 1,
		totalPage: 1,
		pageSize: 10,
		totalCount: 0,
		gwList: []
	},

	mutations: {
		updateGwList(state, data) {
			if (data && data.data && data.data.code == 0) {
				state.currPage = data.data.page.currPage;
				state.totalPage = data.data.page.totalPage;
				state.pageSize = data.data.page.pageSize;
				state.totalCount = data.data.page.totalCount;

				if (state.currPage == 1) {
					state.gwList = [...data.data.page.list];
				} else {
					state.gwList = [...state.gwList, ...data.data.page.list];
				}
			} else {

			}
		},

		clickFilterMenu(state, idx) {
			state.filterList.forEach(function(item, index) {
				if (idx === index) {
					item.isActive = !state.filterList[idx].isActive;
				} else {
					item.isActive = false;
				}
			});

			let activeList = state.filterList.filter(function(item) {
				return item.isActive == true;
			});

			state.popupShow = activeList.length > 0;
		},

		clickFilterCondition(state, params) {
			console.log("clickCondition = ", params);
			let key1 = params.key1;
			let key2 = params.key2;
			let value = params.value;

			//点击无限选项,只选中无限,清空其他选项
			let noLimitOption = value.endsWith("_0");

			function detailListHandler(isMutiple, detailList) {
				detailList.forEach(function(item) {
					if (isMutiple) {
						//多选
						if (noLimitOption) {
							if (item.value.endsWith("_0")) {
								//无限选项设置为true
								item.isSelected = true;
							} else {
								//其他选项设置为false
								item.isSelected = false;
							}
						} else {
							if (item.value.endsWith("_0")) {
								//无限选项设置为false
								item.isSelected = false;
							} else {
								if (item.value == value) {
									//其他选项标志反转
									item.isSelected = !item.isSelected;
								}
							}
						}
					} else {
						//单选
						if (noLimitOption) {
							if (item.value.endsWith("_0")) {
								//无限选项设置为true
								item.isSelected = true;
							} else {
								//其他选项设置为false
								item.isSelected = false;
							}
						} else {
							if (item.value == value) {
								item.isSelected = !item.isSelected;
							} else {
								item.isSelected = false;
							}
						}
					}
				});
			};

			state.filterList.forEach(function(item) {
				if (item.key == key1) {
					if (item.childList) {
						item.childList.forEach(function(cItem) {
							if (cItem.key == key2) {
								detailListHandler(cItem.isMutiple, cItem.detailList);
							}
						});
					} else {
						detailListHandler(item.isMutiple, item.detailList);
					}
				}
			});
		},

		clickFilterReset(state, params) {
			console.log("clickFilterReset = ", params);
			let key1 = params.key1;

			function resetHandler(detailList) {
				detailList.forEach(function(item) {
					if (item.value.endsWith("_0")) {
						item.isSelected = true;
					} else {
						item.isSelected = false;
					}
				});
			};

			state.filterList.forEach(function(item) {
				if (item.key == key1) {
					if (item.childList) {
						item.childList.forEach(function(cItem) {
							resetHandler(cItem.detailList);
						});
					} else {
						resetHandler(item.detailList);
					}
				}
			});
		},
		initFilterList(state, filterList) {
			state.filterList = filterList || [];
		}
	},

	actions: {
		queryFilter({
			state,
			commit,
			rootState
		}) {

			let request = {
				token: rootState.loginState.token
			};

			api.getFilter(request, {
				success: data => {
					// console.log("success data = ", data);
					console.log(data)
					if (data.data.code === 0) {
						data.data.list.forEach(function(item) {
							item.isActive = false;
							if (item.childList) {
								item.childList.forEach(function(cItem) {
									cItem.detailList.forEach(function(dItem) {
										dItem.isSelected = false;
									});
								});
							} else {
								item.detailList.forEach(function(dItem) {
									dItem.isSelected = false;
								});
							}
						});

						commit("initFilterList", data.data.list);
					}
				},
				fail: data => {
					console.log("fail data = ", data);
				}
			});
		},

		queryGwList({
			state,
			commit,
			rootState
		}, page) {
			let request = {
				token: rootState.loginState.token,
				data: {
					...page
				}
			};

			// api.getGangWeiList(request, {
			//     success: data => {
			//         // console.log("success data = ", data);
			//         commit("updateGwList", data);
			//     },
			//     fail: data => {
			//         console.log("fail data = ", data);
			//     }
			// });
		},

		clickFilterConfirm({
			state,
			commit,
			rootState
		}) {
			let filter = {};

			state.filterList.forEach(function(item) {
				let key1 = item.key;
				if (item.childList) {
					item.childList.forEach(function(cItem) {
						let key2 = cItem.key;

						cItem.detailList.forEach(function(dItem) {
							console.log('dItem1 = ', dItem);

							if (dItem.isSelected) {
								if (!filter[key1]) {
									filter[key1] = {};
								}

								if (cItem.isMutiple) {
									if (!filter[key1][key2]) {
										filter[key1][key2] = [];
									}

									filter[key1][key2].push(dItem.value);
								} else {
									filter[key1][key2] = dItem.value;
								}
							}
						});
					});
				} else {
					item.detailList.forEach(function(dItem) {
						console.log("dItem2 = ", dItem);

						if (dItem.isSelected) {
							if (dItem.isMutiple) {
								if (!filter[key1]) {
									filter[key1] = [];
								}

								filter[key1].push(dItem.value);
							} else {
								filter[key1] = dItem.value;
							}
						}
					});
				}
			});

			console.log("filter = ", filter);
			let gwmc = "";
			let gwlb = "";
			let sshy = "";

			let xlyq = "";
			let gwgzxz = "";
			if (filter[1]) {
				if (filter[1][6]) {
					xlyq = filter[1][6];
				}

				if (filter[1][7]) {
					gwgzxz = filter[1][7];
				}
			}


			let jyyq = "";
			let dwgm = "";
			let gwyx = "";
			if (filter[2]) {
				if (filter[2][10]) {
					jyyq = filter[2][10];
				}

				if (filter[2][8]) {
					gwgzxz = filter[2][8];
				}

				if (filter[2][9]) {
					gwyx = filter[2][9];
				}
			}

			let gwfl = "";
			if (filter[3]) {
				if (filter[3][11]) {
					gwfl = filter[3][11];
				}
			}

			let orderField = "";
			if (filter[4]) {
				if (filter[4]) {
					orderField = filter[4];
				}
			}

			let request = {
				token: rootState.loginState.token,
				data: {
					page: state.currPage++,
					limit: state.pageSize,
					gwmc,
					gwlb,
					sshy,
					xlyq,
					gwgzxz,
					jyyq,
					dwgm,
					gwyx,
					gwfl,
					orderField
				}
			};

			api.getGangWeiList(request, {
				success: data => {
					console.log("success data = ", data);
					commit("updateGwList", data);
				},
				fail: data => {
					console.log("faildata = ", data);
				}
			});
		}
	}

}
