<template>
    <view class="delete">
      <view class="delete-box">
         <view class="delete-title">
             找到工作了，如何删除我的简历?
         </view>
         <view class="delete-text">“点开“简历中心”的简历管理,你会看到表格栏里有“修改”和“预览”选项,点“修改”,会跳出你之前在智联上填写的基本信息。最上头有个“开放方式”,把开放改为保密就可以了。这样不会丢失你在智联的简历,但是只有你才能看,下次还可以用来进行求职。如果你不想要这份简历了,可以直接在“简历管理”...”</view>
      </view>
    </view>
</template>

<script>
    export default{
        data(){
            return{}

        }
    }
</script>

<style  lang="scss" scoped>
    .delete{
        height: 100%;
        background-color: #FFFFFF;
        padding: 0 20rpx;
        box-sizing: border-box;
        .delete-box{
            height: 100%;
             background-color: #FFFFFF;
             .delete-title{
                 font-weight: bold;
                 font-size: 36rpx;
                 color:#333333;
                 height: 100rpx;
                 line-height: 100rpx;
                 border-bottom: 1rpx solid #F2F2F2;
             }
             .delete-text{
                 font-size: 26rpx;
                 color:#333333;
                 line-height: 45rpx;
                 margin-top:20rpx;
                 text-indent:30rpx;
             }
        }
    }
</style>
