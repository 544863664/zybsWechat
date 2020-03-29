import http from '@/common/js/config.js'

export default {
    //省份码表list
    provinceList(callBack) {
        http({
            url: '/hr/dm/findSfList',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //省份码表map
    provinceMap(callBack) {
        http({
            url: '/hr/dm/findSfMap',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //城市码表list
    cityList(callBack) {
        http({
            url: '/hr/dm/findSsList',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //城市码表map
    cityMap(callBack) {
        http({
            url: '/hr/dm/findSsMap',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //县区码表list
    districtList(cityDm, callBack) {
        http({
            url: '/hr/dm/findSqList?pid='+cityDm,
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //县区码表map
    districtMap(cityDm, callBack) {
        http({
            url: '/hr/dm/findSqMap?pid='+cityDm,
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },

    //县区码表list
    districtListAll(callBack) {
        http({
            url: '/hr/dm/findSqListAll',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //县区码表map
    districtMapAll(callBack) {
        http({
            url: '/hr/dm/findSqMapAll',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },

    //岗位类别1 list
    gwlb1List(callBack) {
        http({
            url: '/hr/dm/findGwlbOneList',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //岗位类别1 Map
    gwlb1Map(callBack) {
        http({
            url: '/hr/dm/findGwlbOneMap',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //岗位类别2 list
    gwlb2List(callBack) {
        http({
            url: '/hr/dm/findGwlbOtList',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //岗位类别2 Map
    gwlb2Map(callBack) {
        http({
            url: '/hr/dm/findGwlbOtMap',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //岗位类别3 list
    gwlb3List(gwlb2, callBack) {
        http({
            url: '/hr/dm/findGwlbThList?pid='+gwlb2,
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //岗位类别3 list
    gwlb3ListAll(callBack) {
        http({
            url: '/hr/dm/findGwlbThListAll',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //岗位类别3 Map
    gwlb3Map(gwlb2, callBack) {
        http({
            url: '/hr/dm/findGwlbThMap?pid='+gwlb2,
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //岗位类别3 Map
    gwlb3MapAll(callBack) {
        http({
            url: '/hr/dm/findGwlbThMapAll',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },

    //码表list
    dmList(callBack) {
        http({
            url: '/hr/dm/findDmList',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    },
    //所有码表map
    dmMap(callBack) {
        http({
            url: '/hr/dm/findDmMap',
            method: 'POST',
            success: data => {
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    }
}
