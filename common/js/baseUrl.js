let baseUrl = ""; // 基础域名

console.log("process.env.NODE_ENV = ", process.env.NODE_ENV);

if (process.env.NODE_ENV == "development") {
    // 开发环境
    baseUrl = 'https://cs.91boshuo.com';
} else if (process.env.NODE_ENV == "production") {
    // 生产环境
    baseUrl = 'https://cs.91boshuo.com';
} else {
    // 生产环境
    baseUrl = 'https://cs.91boshuo.com';
}

export function getBaseUrl() {
    return baseUrl+"/api";
}

export function getWxfileupload() {
    return baseUrl;
}
