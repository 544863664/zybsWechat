import {
    getBaseUrl
} from './baseUrl.js';

export default function(params) {
    params.url = getBaseUrl() + params.url;

    let header = {
        'content-type': 'application/json'
    };
    params.header = {
        ...header,
        ...params.header
    };

    return uni.request(params);
}
