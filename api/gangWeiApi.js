import http from '@/common/js/config.js'

export default {
    // getFilter(request, callBack){
    //     http({
    //         url: '/hr/qygwtj/findGwtjQz', //仅为示例，并非真实接口地址。
    //         method: 'POST',
    //         header: {
    //             token: request.token
    //         },
    //         success: data => {
    //             callBack.success(data);
				// console.log(JSON.stringify(data))
    //         },
    //         fail: error=>{
    //             console.log(error);
    //             callBack.fail(error);
    //         }
    //     });
    // },

    getGangWeiList(request, callBack) {
        http({
            url: `/hr/qydwgwfbxx/findGwListQz`, //仅为示例，并非真实接口地址。
            method: 'GET',
            header: {
                token: request.token
            },
            data: request.data,
            success: data => {
                // console.log(data);
                callBack.success(data);
            },
            fail: error => {
                console.log(error);
                callBack.fail(error);
            }
        });
    }
}
