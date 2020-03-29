<template>
    <view class="editorthree">
        <view class="three">
            <view class="company">
                <text class="company-title">公司名称</text>
                <image class="company-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-form-item uni-column company-inp">
                    <input class="uni-input" @input="onKeyInput" focus placeholder="请输入" placeholder-style="color:#CCCCCC" />
                </view>
            </view>
            <view class="position">
                <text class="position-title">职位名称</text>
                <image class="position-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-form-item uni-column position-inp">
                    <input class="uni-input" @input="onKeyInput" placeholder="请输入" placeholder-style="color:#CCCCCC" />
                </view>
            </view>
            <view class="join">
                <text class="join-title">入职时间</text>
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
            <view class="leave">
                <text class="leave-title">离职时间</text>
                <image class="leave-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindLeaveChange">
                                <view class="uni-input">{{ leave }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="industry">
                <text class="industry-title">所属行业</text>
                <image class="industry-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker @change="bindIndustryChange" :value="index" :range="industry">
                                <view class="uni-input">{{ industry[industryIndex] }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="department">
                <text class="department-title">所属行业</text>
                <image class="department-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker @change="bindDepartmentChange" :value="index" :range="department">
                                <view class="uni-input">{{ department[departmentIndex] }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="content">
                <text class="content-title">工作内容</text>
                <textarea class="content-job" placeholder="请输入"></textarea>
            </view>
            <view class="skills">
                <text class="skills-title">技能标签</text>
                <image class="skills-logo" src="../../../static/icon/back.png"></image>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker @change="bindSkillsChange" :value="index" :range="skills">
                                <view class="uni-input">{{ skills[skillsIndex] }}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="company-hidden">
                <view class="hidden">屏蔽该公司</view>
                <switch bind change="handleProxy" class="_switch M0f981aea orange checked choose" data-comkey="0" data-eventid="0f981aea-6"></switch>
            </view>

        </view>
         <view class="footer" @click="gonext">保存下一步</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            industry: ['请选择', '自由职业', '董事长'],
            department: ['请选择', '研发部', '销售部'],
            skills: ['请选择', 'java', 'web'],
            date: '请选择',
            leave: '请选择',
            index: [0, 0, 0],
            industryIndex: 0,
            departmentIndex: 0,
            skillsIndex: 0
        };
    },
    methods: {
        bindSkillsChange: function(e) {
            console.log('picker1111发送选择改变，携带值为', e.target.value);
            console.log(e);
            this.skillsIndex = e.detail.value;
        },
        bindIndustryChange: function(e) {
            console.log('picker1111发送选择改变，携带值为', e.target.value);
            console.log(e);
            this.industryIndex = e.detail.value;
        },
        bindDepartmentChange: function(e) {
            console.log('picker1111发送选择改变，携带值为', e.target.value);

            this.departmentIndex = e.detail.value;
        },
        bindDateChange: function(e) {
            this.date = e.target.value;
        },
        bindLeaveChange: function(e) {
            this.leave = e.target.value;
        },
        gonext(){
          uni.navigateTo({
              url:"/woDe/editorfour"
          })
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
        }
    }
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
.editorthree {
    background-color: #ffffff;
    height: 100%;
}
.three {
    padding: 0 20rpx 500rpx 20rpx;
    background: #ffffff;
}
.company,
.position,
.join,
.leave,
.industry,
.department,
.content,
.skills {
    height: 130rpx;
    border-top: 1rpx solid #f2f2f2;
    position: relative;
}
.company-title,
.position-title,
.join-title,
.leave-title,
.industry-title,
.department-title,
.content-title,
.skills-title {
    font-size: 24rpx;
    color: #999999;
    font-weight: 400;
    position: absolute;
    top: 30rpx;
}
.skills {
    height: 130rpx;
    border-top: 1rpx solid #f2f2f2;
    position: relative;
    top: 200rpx;
}
.company-logo,
.position-logo,
.join-logo,
.leave-logo,
.industry-logo,
.department-logo,
.skills-logo {
    width: 13rpx;
    height: 22rpx;
    position: absolute;
    top: 35rpx;
    right: 0rpx;
}
.company-inp,
.position-inp,
.uni-list {
    width: 100%;
    position: absolute;
    top: 72rpx;
}
.content-job {
    width: 710rpx;
    height: 265rpx;
    background: #f2f2f2;
    color: #cccccc;
    border-radius: 10rpx;
    position: absolute;
    top: 72rpx;
}
.uni-input {
    color: #cccccc;
}
.company-hidden{
    height: 130rpx;
    position: relative;
    top: 218rpx;

}
.hidden{
    color:#999999;
    font-size: 24rpx;
}
.choose {
    position: absolute;
    top: -2rpx;
    right: 0rpx;
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
</style>
