<template>
    <view class="editor">
        <!-- 头像 -->
        <view class="head">
            <image class="head-img" src="../../../static/icon/9898.png"></image>
            <view class="head-title">上传头像</view>
        </view>
        <view class="my">
            <view class="my-detail">
                <text class="my-title">名字</text>
                <image class="my-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-form-item uni-column my-inp"><input class="uni-input" @input="onKeyInput" focus placeholder="请输入" placeholder-style="color:#CCCCCC" /></view>
            </view>
            <view class="sex">
                <text class="sex-title">性别</text>
                <image class="sex-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker @change="bindPickerChange" :value="index" :range="array">
                                <view class="uni-input">{{ array[sexIndex] }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="birthday">
                <text class="birthday-title">生日</text>
                <image class="birthday-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                                <view class="uni-input">{{ date }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="email">
                <text class="email-title">邮箱</text>
                <image class="email-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-form-item uni-column email-inp"><input class="uni-input" @input="onKeyInput" placeholder="请输入" placeholder-style="color:#CCCCCC" /></view>
            </view>
            <view class="city">
                <text class="city-title">所在城市</text>
                <image class="city-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker @change="bindcityChange"  :value="index" mode="region">
                                <view class="uni-input">{{ citytext }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="phone">
                <text class="phone-title">手机号</text>
                <image class="phone-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-form-item uni-column phone-inp"><input class="uni-input" @input="onKeyInput" placeholder="请输入" placeholder-style="color:#CCCCCC" /></view>
            </view>
            <view class="identity">
                <text class="identity-title">身份</text>
                <image class="identity-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker @change="bindidentityChange" :value="index" :range="identity">
                                <view class="uni-input">{{ identity[identityIndex] }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="education">
                <text class="education-title">最高学位</text>
                <image class="education-logo" src="../../../static/icon/back.png"></image>
                <text class="education-mian">含在读</text>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker @change="bindeducationChange" :value="index" :range="education">
                                <view class="uni-input">{{ education[educationIndex] }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="join">
                <text class="join-title">参加工作时间</text>
                <image class="join-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                                <view class="uni-input">{{ date }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="empty"></view>
        <view class="footer" @click="gonext">保存下一步</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            focus: true,
            array: ['请选择', '男', '女'],
            sexIndex: 0,
            index: [0,0,0],
            date: '请选择',
            citytext: '请选择地区',
            identity: ['请选择', '学生', '非学生'],
            identityIndex: 0,
            education: ['请选择', '大专', '本科', '硕士', '博士', '博士后'],
            educationIndex: 0
        };
    },
    methods: {
        onKeyInput: function(event) {
            this.inputValue = event.target.value;
        },
        bindPickerChange: function(e) {
            console.log('picker1111发送选择改变，携带值为', e.target.value);
            console.log(e);
            this.sexIndex = e.detail.value;
        },
        bindcityChange: function(e) {
            console.log('pickercity发送选择改变，携带值为', e.target.value);
            this.citytext = e.detail.value;
        },
        bindidentityChange: function(e) {
            console.log('pickerbindidentity发送选择改变，携带值为', e.target.value);
            this.identityIndex = e.detail.value;
        },
        bindeducationChange: function(e) {
            console.log('pickerbindeducation发送选择改变，携带值为', e.target.value);
            this.educationIndex = e.detail.value;
        },
        bindDateChange: function(e) {
            this.date = e.target.value;
        },
        getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        },
        gonext(){
            uni.navigateTo({
                url:'/woDe/editornext'
            })
        }
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}
.editor {
    background-color: #ffffff;
    height: 100%;
}
.head {
    text-align: center;
    padding: 30rpx 0;
}
.head-img {
    width: 154rpx;
    height: 154rpx;
}
.head-title {
    font-size: 30rpx;
    color: #999999;
    text-align: center;
    margin-top: 30rpx;
}
.my {
    padding: 0 20rpx 20rpx 20rpx;
    background: #ffffff;
}
.my-detail,
.sex,
.birthday,
.email,
.city,
.phone,
.identity,
.education,
.join {
    height: 130rpx;
    border-top: 1rpx solid #f2f2f2;
    position: relative;
}
.my-title,
.sex-title,
.birthday-title,
.email-title,
.city-title,
.phone-title,
.identity-title,
.education-title,
.join-title {
    font-size: 24rpx;
    color: #999999;
    font-weight: 400;
    position: absolute;
    top: 30rpx;
}
.my-logo,
.sex-logo,
.birthday-logo,
.email-logo,
.city-logo,
.phone-logo,
.identity-logo,
.education-logo,
.join-logo {
    width: 13rpx;
    height: 22rpx;
    position: absolute;
    top: 35rpx;
    right: 0rpx;
}
.education-mian {
    font-size: 24rpx;
    color: #999999;
    font-weight: 400;
    position: absolute;
    top: 30rpx;
    right: 23rpx;
}
.my-inp,
.uni-list,
.email-inp,
.phone-inp {
    width: 100%;
    position: absolute;
    top: 72rpx;
}
.uni-input {
    color: #cccccc;
}
.footer {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100rpx;
    background-color: #ff8421;
    text-align: center;
    line-height: 100rpx;
    color: #ffffff;
    font-size: 30rpx;
    font-weight: bold;
}
.empty {
    width: 100%;
    height: 100rpx;
    position: relative;
}
</style>
