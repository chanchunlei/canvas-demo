var res = null;
var colors = ['red','yellow','blue','green'];//颜色
var total = 0;//声明数据总量
var arr = [78,54,68,85];//数据来源
var radius = 100;//定义半径
var point = {x:0, y:150};//定义圆心
var star = 0;//声明起点弧度
var stops = 0;
var starts = 0;
var ends = 0; 
const ctx = wx.createCanvasContext('mycanvas');//创建上下文
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screen_width: 375,
    screen_height: 603
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    res = wx.getSystemInfoSync({//获取设备信息
      success: (res) =>{
        let screen_width = res.screenWidth;
        let screen_height = res.screenHeight;
        that.setData({ screen_width, screen_height })
      }
    })
    that.doit();
    that.numrun();
    ctx.draw(); 
  },
  doit: function(){
    
    point.x = res.screenWidth / 2;//圆心X坐标
    for(var i=0; i<arr.length; i++){ //计算总量
       total += arr[i];
    }
    for(var j=0; j<arr.length; j++){
      ctx.beginPath();//开启路径
      stops += arr[j] / total * 2 * Math.PI;//结束弧度
      //console.log(stops)
      //console.log(2 * Math.PI)
      ctx.arc(point.x, point.y, radius, star, stops, false);//绘制弧度，参数：圆心X坐标、圆心Y坐标、半径、开始位置、结束位置、是否是顺时针
      ctx.lineTo(point.x, point.y);//方法增加一个新点，然后创建一条从上次指定点到目标点的线。
      ctx.stroke();//连接的线条
      ctx.setFillStyle(colors[j]);//对应填充的颜色
      ctx.fill();//对当前路径中的内容进行填充。默认的填充色为黑色。
      ctx.closePath();//关闭当前路径
      star += arr[j] / total * 2 * Math.PI;//下一个区域的开始弧度点，当前需要弧度占总数的多少
    }
    // ctx.draw();//将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
  },
  numrun: function() {
    point.x = res.screenWidth / 2;//圆心X坐标
    ctx.translate(point.x, point.y);//设置圆心
    for (var i = 0; i < arr.length; i++) { //计算总量
      total += arr[i];
    }
    for(var i=0;i<arr.length;i++){
      ctx.beginPath();//开启路径
      starts = arr[i] / total * Math.PI /0.5;
      var m = arr[i] / total * 100 ;
      ctx.rotate(ends + starts);//旋转数值  
      ctx.font = "15px scans-serif";
      ctx.fillStyle = "aqua";//设置字体颜色
      console.log(m)
      ctx.fillText(m.toFixed(2) + "%", 40, 10);//填充数字
      ends = arr[i] / total * Math.PI / 0.5;
      ctx.closePath();//关闭当前路径  
      
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(res)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})