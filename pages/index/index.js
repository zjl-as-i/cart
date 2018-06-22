//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // category: [
    //   { name: '零食', id: 'lingshi' },
    //   { name: '饼干', id: 'binggan' },
    //   { name: '饮料', id: 'yinliao' }
    // ],
    detail: [
      {
        id: 'lingshi', name: '零食', detail: [
          { pid: 'lingshi', thumb: '/image/c1.png', name: '乐事薯片', price: '5.50', num: 0 },
          { pid: 'lingshi', thumb: '/image/c1.png', name: '百奇', price: '8.00', num: 0 },
          { pid: 'lingshi', thumb: '/image/c1.png', name: '小米锅巴', price: '10.00', num: 0 },
          { pid: 'lingshi', thumb: '/image/c1.png', name: '奇多', price: '4.50', num: 0 },
          { pid: 'lingshi', thumb: '/image/c1.png', name: '辣条', price: '3.00', num: 0 },
          { pid: 'lingshi', thumb: '/image/c1.png', name: '妙脆角', price: '4.50', num: 0 }
        ]
      },
      {
        id: 'binggan', name: '饼干', detail: [
          { pid: 'binggan', thumb: '/image/c2.png', name: '康师傅3+2', price: '3.00', num: 0 },
          { pid: 'binggan', thumb: '/image/c2.png', name: '奥利奥', price: '4.50', num: 0 },
          { pid: 'binggan', thumb: '/image/c2.png', name: '华夫饼', price: '6.00', num: 0 },
          { pid: 'binggan', thumb: '/image/c2.png', name: '趣多多', price: '5.50', num: 0 },
          { pid: 'binggan', thumb: '/image/c2.png', name: '闲趣', price: '2.50', num: 0 },
          { pid: 'binggan', thumb: '/image/c2.png', name: '士力架', price: '3.00', num: 0 }
        ]
      },
      {
        id: 'yinliao', name: '饮料', detail: [
          { pid: 'yinliao', thumb: '/image/c3.png', name: '矿泉水', price: '2.00', num: 0 },
          { pid: 'yinliao', thumb: '/image/c3.png', name: '百事可乐', price: '3.50', num: 0 },
          { pid: 'yinliao', thumb: '/image/c3.png', name: '雪碧', price: '3.50', num: 0 },
          { pid: 'yinliao', thumb: '/image/c3.png', name: '七喜', price: '3.50', num: 0 },
          { pid: 'yinliao', thumb: '/image/c3.png', name: '加多宝', price: '4.50', num: 0 },
          { pid: 'yinliao', thumb: '/image/c3.png', name: '芬达', price: '3.50', num: 0 }
        ]
      }
    ],
    curIndex: 0,
    isScroll: true,
    toView: 'lingshi',
    num: 0,
    count: 0,
    scrollTop: 0,
    // 定义一个空数组，用来存放右侧滑栏中每一个商品分类的 Height
    listHeight: ''
  },
  onReady: function () {
    var that = this;
    // 定义底部结算栏的 rpx 高度
    var footRpxHeight = 95;
    // 定义右侧单个商品的 rpx 高度 和 px 高度
    var right_contentRpxHeight = 160;
    var right_contentHeight;
    // 定义左侧单个tab的 rpx 高度 和 px 高度
    var left_titleRpxHeight = 140;
    var left_titleHeight;
    wx.getSystemInfo({
      success: function (res) {
        // percent 为当前设备1rpx对应的px值
        var percent = res.windowWidth / 750;
        that.setData({
          winHeight: res.windowHeight,
          windowScrollHeight: res.windowHeight - Number(footRpxHeight * percent),
          right_contentHeight: Number(right_contentRpxHeight * percent),
          left_titleHeight: Number(left_titleRpxHeight * percent)
        })
      }
    })
    var list = that.data.detail;
    for (var i in list) {
      var height = list[i].detail.length * this.data.right_contentHeight;
      this.data.listHeight += ":" + height;
      this.setData({
        listHeight: this.data.listHeight
      })
    }
  }, 
  switchTab(e) {
    let self = this;
    // this.setData({
    //   isScroll: true
    // })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    // setTimeout(function () {
    //   self.setData({
    //     isScroll: false
    //   })
    // }, 1)

  },
  scroll(e) {
    // 把 listHeight 切割成数组
    var height = this.data.listHeight.substring(1).split(':');
    var index = 1;
    var num = 0;
    for (var i = 0; i < height.length; i++) {
      // 累计右侧滑栏滚动上去的每一个分类的 Height
      num += parseInt(height[i]);
      // 循环判断 num 是否大于右侧滑栏滚动上去的 Height ，然后 get 到 i 值赋给 index
      if (num > e.detail.scrollTop) {
        index = i + 1;
        // 如果右侧滑栏滚动高度小于单个类别高度的 1/2 时，index 为 0
        if (e.detail.scrollTop < height[0] / 2) {
          index = 0;
        }
        break;
      }
    }
    // 定义并设置左侧边栏的滚动高度
    var left_scrollTop = this.data.left_titleHeight * index
    this.setData({
      scrollTop: left_scrollTop,
      // 动态给左侧滑栏传递对应该项的 id，用于高亮效果显示
      curIndex: index
    })
  },
  //加法
  addtion: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    // 得到pid
    var pid = e.currentTarget.dataset.pid
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //默认99件最多
    if (num < 100) {
      num++
    }
    //把新的值给新的数组
    var newList = that.data.detail
    for (var i in newList) {
      if (newList[i].id == pid) {
        newList[i].detail[index].num = num
      }
    }

    //把新的数组传给前台
    that.setData({
      detail: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //减法
  subtraction: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    // 得到pid
    var pid = e.currentTarget.dataset.pid
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //把新的值给新的数组
    var newList = that.data.detail
    for (var i in newList) {
      if (newList[i].id == pid) {
        if (num >= 1) {
          num--
          newList[i].detail[index].num = num
        }
      }
    }

    //把新的数组传给前台
    that.setData({
      detail: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //计算数量
  countNum: function () {
    var that = this
    //遍历数组，把既选中的num加起来
    var newList = that.data.detail
    var allNum = 0
    for (var i = 0; i < newList.length; i++) {
      for (var j = 0; j < newList[i].detail.length; j++) {
        allNum += parseInt(newList[i].detail[j].num)
      }
    }
    parseInt
    that.setData({
      num: allNum
    })
  },
  //计算金额方法
  count: function () {
    var that = this
    //思路和上面一致
    //选中的订单，数量*价格加起来
    var newList = that.data.detail
    var newCount = 0
    for (var i = 0; i < newList.length; i++) {
      for (var j = 0; j < newList[i].detail.length; j++) {
        newCount += newList[i].detail[j].num * newList[i].detail[j].price
      }
    }
    that.setData({
      count: newCount.toFixed(2)
    })
  },
  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text: 'center',
      complete() {

      }
    })
    // wx.navigateTo({
    //   url: '../category/category',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }
})
