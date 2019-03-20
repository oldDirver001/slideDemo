var createDom = function (options = { domName: '', classList: [], domName: '' }) {
  var dom = null
  if (options.domName) {
    dom = document.createElement(options.domName)
  } else {
    dom = document.createElement('div')
  }
  if (options.classList && options.classList.length > 0) {
    options.classList.forEach(function (item) {
      dom.classList.add(item)
    })
  }
  if (options.domName) {
    dom.name = options.domName
  }
  return dom
}
