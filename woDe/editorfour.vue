<template>
    <view class="editorfour">
        <view class="four">
             <view class="school">
                 <text class="school-title">学校名称</text>
                 <image class="school-logo" src="../../../static/icon/back.png"></image>
                 <view class="uni-form-item uni-column school-inp">
                     <input class="uni-input" @input="onKeyInput" focus placeholder="请输入" placeholder-style="color:#CCCCCC" />
                 </view>
             </view>
              <view class="professional">
                 <text class="professional-title">专业名称</text>
                 <image class="professional-logo" src="../../../static/icon/back.png"></image>
                 <view class="uni-form-item uni-column professional-inp">
                     <input class="uni-input" @input="onKeyInput" placeholder="请输入" placeholder-style="color:#CCCCCC" />
                 </view>
             </view>
             <view class="education">
                 <text class="education-title">最高学位</text>
                 <image class="education-logo" src="../../../static/icon/back.png"></image>
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
                 <text class="join-title">入学年份</text>
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
                 <text class="leave-title">毕业年份</text>
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
             <view class="company-hidden">
                 <view class="hidden">是否自愿加入中研高端人才库</view>
                 <switch bind change="handleProxy" class="_switch M0f981aea orange checked choose" data-comkey="0" data-eventid="0f981aea-6"></switch>
             </view>
        </view>
          <view class="footerbox" @click="gonext">
             <view class="footer">继续完善简历，可以让更多HR看到你</view>
             <view class="save">保存</view>
          </view>
    </view>
</template>

<script>
    export default{
        data(){
            return{
                 education: ['请选择', '大专', '本科', '硕士', '博士', '博士后'],
                 educationIndex:0,
                   date: '请选择',
                       leave: '请选择'

            }
        },
        methods:{
            bindeducationChange: function(e) {
                console.log('pickerbindeducation发送选择改变，携带值为', e.target.value);
                this.educationIndex = e.detail.value;
            },
            bindDateChange: function(e) {
                this.date = e.target.value;
            },
            bindLeaveChange: function(e) {
                this.leave = e.target.value;
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
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }
    .editorfour {
        background-color: #ffffff;
        height: 100%;
    }
    .four {
        padding: 0 20rpx 500rpx 20rpx;
        background: #ffffff;
    }
    .school,.professional,.education,.join,.leave{
        height: 130rpx;
            border-top: 1rpx solid #f2f2f2;
            position: relative;
    }
    .school-title,.professional-title,.education-title,.join-title,.leave-title{
        font-size: 24rpx;
        color: #999999;
        font-weight: 400;
        position: absolute;
        top: 30rpx;
    }
    .school-logo,.professional-logo,.education-logo,.join-logo,.leave-logo{
        width: 13rpx;
        height: 22rpx;
        position: absolute;
        top: 35rpx;
        right: 0rpx;
    }
    .school-inp,.professional-inp{
        width: 100%;
        position: absolute;
        top: 72rpx;
    }
    .uni-list{
       width: 100%;
       position: absolute;
       top: 72rpx;
    }
    .uni-input {
        color: #cccccc;
    }
    .company-hidden{
        height: 130rpx;
        position: relative;
        top: 10rpx;

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
        width: 100%;
        height: 100rpx;
        background-color: #ff8421;
        text-align: center;
        line-height: 100rpx;
        color: #ffffff;
        font-size: 30rpx;
        font-weight: bold;
    }
    .save{
        width: 100%;
        height: 100rpx;
        background-color: #CCCCCC;
        text-align: center;
        line-height: 100rpx;
        color: #ffffff;
        font-size: 30rpx;
        font-weight: bold;
    }
    .footerbox{
      width: 100%;
      height: 200rpx;
      position: fixed;
      bottom: 0;
      right: 0;
    }
</style>
