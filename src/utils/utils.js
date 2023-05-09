/**
 * 页面尺寸初始化
 * @param {Boolean} rotate 是否可转置
 * @param {Boolean} isAddWaterMark 是否添加水印
 * @param {Number} designWidth 设计图尺寸
 */
export const resize = ({ rotate = true, isAddWaterMark = true, designWidth = 750 } = {}) => {
  const changeView = () => {
    let width = document.body.clientWidth || document.documentElement.clientWidth
    let height = document.body.clientHeight || document.documentElement.clientHeight

    if (rotate) {
      if (width > height) {
        [width] = [height, width]
      }

      if (width < 320) {
        let screen = window.screen
        width = screen[screen.width > screen.height ? 'height' : 'width']
        if (width < 320) width = 320
      }
    }

    if (width > 750) width = 750
    let fontSize = 100 * width / designWidth
    if (width === 428) fontSize = Math.ceil(fontSize)
    document.getElementsByTagName('html')[0].style.setProperty('font-size', fontSize + 'px')
    // document.getElementsByTagName('html')[0].style.setProperty('font-size', (100 * width) / designWidth + 'px');
    document.getElementsByTagName('body')[0].style.setProperty('visibility', 'visible')

    if (!width) {
      setTimeout(changeView, 20)
    }
  }

  changeView()
}
