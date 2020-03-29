export default {
    namespaced: true,

    state: {
        hasLogin: false,
        loginCode: "",
        token: "",
        access: {
            grantUserBaseInfo: false
        },
        phone: {
            iv: "",
            encryptedData: ""
        },
        user: {
            iv: "",
            signature: "",
            encryptedData: "",
            userInfo: {
                avatarUrl: "",
                city: "",
                country: "",
                gender: "",
                language: "",
                nickName: "",
                province: ""
            },
        }
    },

    mutations: {
        updateHasLogin(state, hasLogin) {
            state.hasLogin = hasLogin;
        },

        updateToken(state, token) {
            uni.setStorageSync('token', token);
            state.token = token;
        },

        updateAccess(state, access) {
            state.access = access;
        },

        updatePhone(state, phone) {
            state.phone = phone;
        },

        updateUser(state, user) {
            state.user = user;
        },

        updateLoginCode(state, loginCode) {
            state.loginCode = loginCode;
        }
    },

    getters: {
        getToken: state => {

            console.log("xxx updateTokenAction state.token = ", state.token);
            console.log("yyy updateTokenAction uni.getStorageSync = ", uni.getStorageSync('token'));

            let token = state.token || uni.getStorageSync('token') || "";
            return token;
        }
    },

    actions: {

    }

}
