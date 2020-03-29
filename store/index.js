import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import loginState from './loginState.js'
import gangWeiState from './gangWeiState.js'

import api from '../api/baseDmApi.js';

const store = new Vuex.Store({
    state: {
        provinceList: [],
        provinceMap: {},
        cityMapList: {},
        cityMap: {},
        districtMapList:{},
        districtMap:{},

        gwlb1List: [],
        gwlb1Map: {},
        gwlb2MapList: {},
        gwlb2Map: {},
        gwlb3MapList:{},
        gwlb3Map:{},

        dmList: {},
        dmMap: {},
        sftzList: [{ id: '0', name: '统招' }, { id: '1', name: '非统招' }],
        sftzMap: { '0': '统招', '1': '非统招' },
        yynlList: [{ id: '1', name: '一般' }, { id: '2', name: '良好' }, { id: '3', name: '熟练' }, { id: '4', name: '精通' }],
        yynlMap: { '1': '一般', '2': '良好', '3': '熟练', '4': '精通' },
        sfjxArray: [{ id: '0', name: '未结项' }, { id: '1', name: '已结项' }], // 是否结项
        sfjxMap: {'0':'未结项' , '1':'已结项' }, // 是否结项
        wcztArray: [{ id: '0', name: '未完成' }, { id: '1', name: '已完成' }],
        wcztMap: { '0' : '未完成', '1' : '已完成' },
        degress: '' // 完善度
    },
    mutations: {
        updateProvinceList(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.provinceList = data.data.sfList;
            } else {

            }
        },
        updateProvinceMap(state, data) {
            if (data && data.data && data.data.code == 0) {
                // uni.setStorageSync('provinceMap', data.data.sfMap);
                state.provinceMap = data.data.sfMap;
            } else {

            }
        },
        updateCityMapList(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.cityMapList = data.data.ssList;
            } else {

            }
        },
        updateCityMap(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.cityMap = data.data.ssMap;
            } else {

            }
        },
        updateDistrictMapList(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.districtMapList = data.data.sqList;
            } else {

            }
        },
        updateDistrictMap(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.districtMap = data.data.sqMap;
            } else {

            }
        },
        updateDmList(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.dmList = data.data.dmMapList;
            } else {

            }
        },
        updateDmMap(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.dmMap = data.data.dmMap;
            } else {

            }
        },

        updateGwlb1List(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.gwlb1List = data.data.gwlbList;
            } else {

            }
        },
        updateGwlb1Map(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.gwlb1Map = data.data.gwlbMap;
            } else {

            }
        },
        updateGwlb2List(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.gwlb2MapList = data.data.gwlbotList;
            } else {

            }
        },
        updateGwlb2Map(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.gwlb2Map = data.data.gwlbotMap;
            } else {

            }
        },
        updateGwlb3List(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.gwlb3MapList = data.data.gwlbthList;
            } else {

            }
        },
        updateGwlb3Map(state, data) {
            if (data && data.data && data.data.code == 0) {
                state.gwlb3Map = data.data.gwlbthMap;
            } else {

            }
        },

        improveDegress(state, degress) {
            state.degress = degress;
        }
    },
    getters: {

    },
    actions: {
        getBaseDm({
            commit
        }) {

            api.provinceList({
                success: data => {
                    commit("updateProvinceList", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.provinceMap({
                success: data => {
                    commit("updateProvinceMap", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.cityList({
                success: data => {
                    commit("updateCityMapList", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.cityMap({
                success: data => {
                    commit("updateCityMap", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.districtListAll({
                success: data => {
                    commit("updateDistrictMapList", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.districtMapAll({
                success: data => {
                    commit("updateDistrictMap", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.gwlb1List({
                success: data => {
                    commit("updateGwlb1List", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.gwlb1Map({
                success: data => {
                    commit("updateGwlb1Map", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.gwlb2List({
                success: data => {
                    commit("updateGwlb2List", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.gwlb2Map({
                success: data => {
                    commit("updateGwlb2Map", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.gwlb3ListAll({
                success: data => {
                    commit("updateGwlb3List", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.gwlb3MapAll({
                success: data => {
                    commit("updateGwlb3Map", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.dmList({
                success: data => {
                    commit("updateDmList", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });

            api.dmMap({
                success: data => {
                    commit("updateDmMap", data);
                },
                fail: data => {
                    console.log(" = ", data.data);
                }
            });
        }
    },
    modules: {
        loginState,
        gangWeiState
    }
})


export default store
