// 自动获取页面高度
// getWindowinfo()
function getWindowinfo() {
  let winHeight = $(window).height() - 60;
  let winWidth = $(window).width() - 250;
  $('.aside').css('height', winHeight);
  $('.main').css({
    'width': winWidth,
    'height': winHeight
  });
  $(window).resize(function() {
    winHeight = $(window).height() - 60;
    winWidth = $(window).width() - 250;
    $(".aside").css("height",winHeight);
    $('.main').css({
      'width': winWidth,
      'height': winHeight
    })
  });
}

// 左侧菜单栏
function openMenu() {
  let one = document.getElementsByClassName("one");
  for(var i=0; i<one.length; i++) {
    one[i].addEventListener('click', function(){
      if(this.children[1].classList.contains('twoActive')) {
        this.children[1].classList.remove('twoActive')
      } else {
        this.children[1].classList.add('twoActive')
      }
    })
  }
}

// 用户
function userLogout() {
  // var userMenu = document.getElementsByClassName("userMenu")[0];
  // var logout = userMenu.getElementsByTagName('ul')[0];
  let logout = document.getElementsByClassName("logout")[0];
  if(logout.classList.contains('userMenuActive')) {
    logout.classList.remove('userMenuActive')
  } else {
    logout.classList.add('userMenuActive')
  }
}

export {getWindowinfo}
