jQuery.fn.createdLeSlider = function (options) {
  var interVal = null
  var leftTimer = null
  var rightTimer = null
  var page = 0

  var parent = $(this)
  var body = $(this).children('.le-slider__body')
  var items = body.children('.item')
  var dotsLen = items.length - 1

  parent.css({'width': options.parentWidth, height: '400px', 'overflow': 'hidden', 'margin': '0 auto', 'position': 'relative'})
  body.css({display: 'inline-block', width: options.bodyWidth, position: 'absolute', float: 'left'})
  items.css({'float': 'left'})
  // 添加dots
  if (options.dots) {
    var ul = createDom({
      domName: 'ul',
      classList: ['page']
    })
    Array.from(items).forEach(function (item, index) {
      var classList = ['page-item']
      if (index === 0) {
        classList = ['page-item', 'active']
      }
      ul.appendChild(
        createDom({
          domName: 'li',
          classList: classList,
          name: index
        })
      )
    })
    parent.append(ul)
  }

  parent.mouseenter(function () {
    if (interVal) {
      clearInterval(interVal)
    }
  })
  parent.mouseleave(function () {
    begin()
  })

  window.handlePrevious_new = function () {
    if (leftTimer) {
      clearTimeout(leftTimer)
    }
    leftTimer = setTimeout(() => {
      pageIndex('-')
      pageControl()
      $('.item').last().prependTo($('.le-slider__body').css('left', options.itemWidth))
      $('.le-slider__body').animate(
        {'left': '0px'},
        500)
    }, 200)
  }

  window.handleNext_new = function () {
    if (rightTimer) {
      clearTimeout(rightTimer)
    }
    rightTimer = setTimeout(() => {
      pageIndex('+')
      pageControl()
      $('.le-slider__body').animate({'left': '-800px'},
        500, function () {
          $('.item').first().appendTo($('.le-slider__body').css("left", "0px"));
        })
    }, 200)
  }

  window.begin = function () {
    interVal = setInterval(function () {
      window.handleNext_new()
    }, 3000)
  }
  window.begin()

  window.pageIndex = function (sign) {
    if (sign === '-') {
      page--
    } else if (sign === '+') {
      page++
    }
    if (page > dotsLen) {
      page = 0
    }
    if (page < 0) {
      page = dotsLen
    }
  }

  window.pageControl = function () {
    $('.page-item').removeClass('active')
    document.getElementsByClassName('page-item')[page].classList.add('active')
  }
}
