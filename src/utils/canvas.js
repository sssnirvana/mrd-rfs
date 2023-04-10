/**
 * 获取一个新的离屏canvas，目前只兼容H5
 */
export function getOffscreenCanvas() {
  return document.createElement('canvas')
}

/**
 * 为背景为透明的图片加上白色背景色，并生成新的图片
 * @param {HTMLImageElement} image 要加白色背景的img对象，需要在图片onload完成后传入
 * @param {HTMLCanvasElement} canvas 传入一个离屏canvas
 * @returns 加上白色背景后的base64图片
 */
export function setImageBackground(image, canvas) {
  // #ifdef H5
  // if (
  //   image?.__proto__.constructor !== HTMLImageElement ||
  //   canvas?.__proto__.constructor !== HTMLCanvasElement
  // ) return null
  // #endif

  const width = canvas.width = image.width
  const height = canvas.height = image.height

  const ctx = canvas.getContext('2d')

  // 小程序里因为生成图片是用的同一个canvas，所以为了避免多次生成互相干扰
  // 需要清除画布
  // #ifdef MP-WEIXIN
  ctx.clearRect(0, 0, width, height)
  // #endif

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(image, 0, 0)

  return canvas.toDataURL()
}
