// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'/pages/image/logo.jpg',
    name:'Who are you'
  },
  onLoad(){
      if(wx.getUserProfile){
          this.setData({canIUseGetUserProfile:true})
      }
  },
    getMyInfo:function(e){
        wx.getUserProfile({
          desc:'展示用户信息',
          success:(res) =>{
            console.log(res)
            this.setData({
              src:res.userInfo.avatarUrl,
              name:res.userInfo.nickName
            })
          }
        })
      },
})
