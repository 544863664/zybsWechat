<template>
    <view class="computer">
        <text class="com">bs.jlsc.com</text>
        <text class="cope">复制网址</text>
        <text class="steps">第一步:在电脑浏览器中输入网址上方 </text>
        <view class="img-box"><image class="com-img" src="../../../static/icon/56598.png"></image></view>
        <text class="steps-two">第二步:点击下方按钮，扫描电脑上面的二维码</text>
        <view class="on" @click="gounit">点击扫码</view>
        <view class="instructions">
            <text>说明：仅支持</text>
            <text class="instructions-detail">PDF、WORD、JPG、PNG</text>
            <text>等格式，大小不超过4M</text>
        </view>
    </view>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            gounit(){
                uni.navigateTo({
                    url:'/woDe/meetings'
                })
            }
        }
    }
</script>

<style scoped>
    .computer{
        position: relative;
        display: flex;
        justify-content: center;
    }
    .com{
        position: absolute;
        top:196rpx;
        color:#333333;
        font-weight: bold;
        font-size: 30rpx;
    }
.cope{
    color:#FF8A20;
    font-size: 24rpx;
    position: absolute;
    top:247rpx;
}
.steps{
    color: #333333;
    font-size: 24rpx;
    position: absolute;
    top:295rpx;
}
.img-box{
    position: absolute;
    top:409rpx;
}
.com-img{
    width:360rpx;
    height:360rpx;
}
.steps-two{
    color:#333333;
    font-size: 24rpx;
    position: absolute;
    top:898rpx;
}
.on{
    width:593rpx;
    height:80rpx;
    background:#FF8A20;
    border-radius:40px;
    color:#FFFFFF;
    text-align: center;
    line-height: 80rpx;
    position: absolute;
    top:965rpx;
    font-weight: 500;
}
.instructions{
 /* width:584rpx;
  height:20rpx; */
  font-size:20rpx;
  font-weight:400;
  color:#999999;
  position: absolute;
  top:1084rpx;
}
.instructions-detail{
    color:#FF8A20;
}
</style>
