// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      region: ['安徽省', '芜湖市', '镜湖区'],
      now: {
        temp: 0,
        text: '未知',
        icon: '999',
        humidity: 0,
        pressure: 0,
        vis: 0,
        windDir: '无',
        windSpeed: 0,
        windScale: 0
      }
    },
  
    regionChange: function(e) {
      this.setData({
        region: e.detail.value
      });
      this.getWeather();
    },
  
    getWeather: function() {
      var that = this;
      var cityName = that.data.region[1];
  
      wx.request({
        url: 'https://n73aapexx2.re.qweatherapi.com/geo/v2/city/lookup',
        data: {
          location: cityName,
          key: '2690660e8737408b87e16365555614ad',
          number: 1
        },
        success: function(searchRes) {
          if (searchRes.data && searchRes.data.location && searchRes.data.location.length > 0) {
            var cityId = searchRes.data.location[0].id;
            
            wx.request({
              url: 'https://n73aapexx2.re.qweatherapi.com/v7/weather/now',
              data: {
                location: cityId,
                key: '2690660e8737408b87e16365555614ad'
              },
              success: function(weatherRes) {
                wx.hideLoading();
                if (weatherRes.data && weatherRes.data.now) {
                  that.setData({
                    now: weatherRes.data.now
                  });
                }
              },
              fail: function(err) {
                wx.hideLoading();
                console.error('天气请求失败:', err);
                wx.showToast({
                  title: '获取天气失败',
                  icon: 'none'
                });
              }
            });
          } else {
            wx.hideLoading();
            console.error('城市搜索失败:', searchRes.data);
            wx.showToast({
              title: '未找到该城市',
              icon: 'none'
            });
          }
        },
        fail: function(err) {
          wx.hideLoading();
          console.error('城市搜索请求失败:', err);
          wx.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
        }
      });
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getWeather();
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
  
    }
  })