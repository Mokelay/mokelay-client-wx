
  module.exports = function (...args) {
wx.scanCode({
  onlyFromCamera: true,
  success: (res) => {
    console.log(res)
  }
})
  }
