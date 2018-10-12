var interVal = null
var leftTimer = null
var rightTimer = null
var page = 0

$('.main').mouseenter(function () {
  if (interVal) {
    clearInterval(interVal)
  }
})
$('.main').mouseleave(function () {
  begin()
})

let handlePrevious = () => {
  let btnList = $('.myBtn')
  if (leftTimer) {
    clearTimeout(leftTimer)
  }
  leftTimer = setTimeout(() => {
    pageIndex('-')
    pageControl()
    btnList.last().prependTo($('.container').css('left', '-800px'))
    $('.container').animate(
      {'left': '0px'},
      500)
  }, 200)
}

let handleNext = () => {
  let btnList = $('.myBtn')
  if (rightTimer) {
    clearTimeout(rightTimer)
  }
  rightTimer = setTimeout(() => {
    pageIndex('+')
    pageControl()
    $('.container').animate({'left': '-800px'},
      500, function () {
        btnList.first().appendTo($('.container').css("left", "0px"));
      })
  }, 200)
}
let begin = () => {
  interVal = setInterval(function () {
    handleNext()
  }, 3000)
}

begin()

let pageIndex = (sign) => {
  if (sign === '-') {
    page--
  } else if (sign === '+') {
    page++
  }
  if (page > 9) {
    page = 0
  }
  if (page < 0) {
    page = 9
  }
}

let pageControl = () => {
  $('.page-item').removeClass('active')
  document.getElementsByClassName('page-item')[page].classList.add('active')
}