/* global Fluid */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

Fluid.events = {

  searchAllTag: function() {
    document.querySelectorAll('.books-tags button.book-tag-all').forEach(function(tag) {
      tag.addEventListener('click', function(event) {
        var allHidden = true; //标记是否所有卡片都被隐藏
        var tagName = this.getAttribute('data-name'); // 获取被点击的标签的名称
        var searchVal = document.querySelector('#search-input'); // 获取搜索框元素
        searchVal.value = ''; // 将搜索框的值设置为 '#' + 标签的名称
        var searchTagsName = '';
        $('.index-card').each(function() {
          $(this).show();
          allHidden = false; 
        })
        // 如果所有卡片都被隐藏，显示“没有相应结果”，否则隐藏
        if (allHidden) {
          $('#no-results').show();
        } else {
          $('#no-results').hide();
        }
      });
    });
  },

  searchByTag: function() {
    document.querySelectorAll('.books-tags button.book-tag').forEach(function(tag) {
      tag.addEventListener('click', function(event) {
        var allHidden = true; //标记是否所有卡片都被隐藏
        var tagName = this.getAttribute('data-name'); // 获取被点击的标签的名称
        var searchVal = document.querySelector('#search-input'); // 获取搜索框元素
        searchVal.value = '#' + tagName; // 将搜索框的值设置为 '#' + 标签的名称
        var searchTagsName = ('#'+ tagName).toLowerCase();
        $('.index-card').each(function() {
          var match = false;
          $(this).find('.post-meta a').each(function() {
            var tagName = $(this).text().toLowerCase(); //获取标签名称
            if (tagName === searchTagsName) {
              match = true;
              return false; // 中断 each 循环
            }
          });
          
          // 如果匹配成功，显示该卡片，否则隐藏
          if (match) {
            $(this).show();
            allHidden = false; //至少有一个卡片被显示
          } else {
            $(this).hide();
          }
        });
        // 如果所有卡片都被隐藏，显示“没有相应结果”，否则隐藏
        if (allHidden) {
          $('#no-results').show();
        } else {
          $('#no-results').hide();
        }
      });
    });
  },

  searchBooks: function() {
    $('#search-input').on('input', function() {
      var searchVal = $(this).val().toLowerCase(); //获取搜索框中的字符
      var allHidden = true; //标记是否所有卡片都被隐藏

      $('.index-card').each(function() {
        var match = false;
        if (searchVal.startsWith('#')) {
          // 如果搜索内容以 '#' 开头，从标签中搜索
          $(this).find('.post-meta a').each(function() {
            var tagName = $(this).text().toLowerCase(); //获取标签名称
            if (tagName === searchVal) {
              match = true;
              return false; // 中断 each 循环
            }
          });
        } else {
          // 如果搜索内容不以 '#' 开头，从 index-header 中搜索
          var headerText = $(this).find('.index-header a').text().toLowerCase(); //获取卡片的 header 链接的文字
          match = headerText.includes(searchVal);
        }
  
        // 如果匹配成功，显示该卡片，否则隐藏
        if (match) {
          $(this).show();
          allHidden = false; //至少有一个卡片被显示
        } else {
          $(this).hide();
        }
      });

      // 如果所有卡片都被隐藏，显示“没有相应结果”，否则隐藏
      if (allHidden) {
        $('#no-results').show();
      } else {
        $('#no-results').hide();
      }
    });
  },


  changeLanguage: function(){
    var currentUrl = window.location.href;
    if (currentUrl.includes("raiyness.github.io/en")) {
      var modifiedUrl = currentUrl.replace("raiyness.github.io/en", "raiyness.github.io");
    } else {
      var modifiedUrl = currentUrl.replace("raiyness.github.io", "raiyness.github.io/en");
    }
    $(document).ready(function() {
      jQuery('#change-btn').on('click', function(e) {
        window.location.href = modifiedUrl;
      });
    });
  },

  registerNavbarEvent: function() {
    var navbar = jQuery('#navbar');
    if (navbar.length === 0) {
      return;
    }
    var submenu = jQuery('#navbar .dropdown-menu');
    if (navbar.offset().top > 0) {
      navbar.removeClass('navbar-dark');
      submenu.removeClass('navbar-dark');
    }
    Fluid.utils.listenScroll(function() {
      navbar[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('top-nav-collapse');
      submenu[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('dropdown-collapse');
      if (navbar.offset().top > 0) {
        navbar.removeClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      } else {
        navbar.addClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      }
    });
    jQuery('#navbar-toggler-btn').on('click', function() {
      jQuery('.animated-icon').toggleClass('open');
      jQuery('#navbar').toggleClass('navbar-col-show');
    });
  },

  registerParallaxEvent: function() {
    var ph = jQuery('#banner[parallax="true"]');
    if (ph.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var parallax = function() {
      var pxv = jQuery(window).scrollTop() / 5;
      var offset = parseInt(board.css('margin-top'), 10);
      var max = 96 + offset;
      if (pxv > max) {
        pxv = max;
      }
      ph.css({
        transform: 'translate3d(0,' + pxv + 'px,0)'
      });
      var sideCol = jQuery('.side-col');
      if (sideCol) {
        sideCol.css({
          'padding-top': pxv + 'px'
        });
      }
    };
    Fluid.utils.listenScroll(parallax);
  },

  registerScrollDownArrowEvent: function() {
    var scrollbar = jQuery('.scroll-down-bar');
    if (scrollbar.length === 0) {
      return;
    }
    scrollbar.on('click', function() {
      Fluid.utils.scrollToElement('#board', -jQuery('#navbar').height());
    });
  },

  registerScrollTopArrowEvent: function() {
    var topArrow = jQuery('#scroll-top-button');
    if (topArrow.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = false;
    // Position
    var setTopArrowPos = function() {
      var boardRight = board[0].getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '80px' : '-60px',
        'right' : right - 64 + 'px'
      });
    };
    setTopArrowPos();
    jQuery(window).resize(setTopArrowPos);
    // Display
    var headerHeight = board.offset().top;
    Fluid.utils.listenScroll(function() {
      var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
      scrollDisplay = scrollHeight >= headerHeight;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '80px' : '-60px'
      });
    });
    // Click
    topArrow.on('click', function() {
      jQuery('body,html').animate({
        scrollTop: 0,
        easing   : 'swing'
      });
    });
  },
  
  registerScrollBottomArrowEvent: function() {
    var bottomArrow = jQuery('#scroll-bottom-button');
    if (bottomArrow.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = true;
    // Position
    var setBottomArrowPos = function() {
      var boardRight = board[0].getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      bottomArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
        'right' : right - 64 + 'px'
      });
    };
    setBottomArrowPos();
    jQuery(window).resize(setBottomArrowPos);
    // Display
    var boardTop, boardBottom;
    Fluid.utils.listenScroll(function() {
      // Get current top and bottom position of the board
      boardTop = board.offset().top;
      boardBottom = board.offset().top + board.outerHeight();
      var scrollPosition = window.pageYOffset + window.innerHeight;
      scrollDisplay = scrollPosition >= (boardTop + 50) && scrollPosition < boardBottom;
      bottomArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px'
      });
    });
    // Click
    bottomArrow.on('click', function() {
      jQuery('body,html').animate({
        scrollTop: jQuery(document).height(),
        easing   : 'swing'
      });
    });
  },


  registerImageLoadedEvent: function() {
    if (!('NProgress' in window)) { return; }

    var bg = document.getElementById('banner');
    if (bg) {
      var src = bg.style.backgroundImage;
      var url = src.match(/\((.*?)\)/)[1].replace(/(['"])/g, '');
      var img = new Image();
      img.onload = function() {
        window.NProgress && window.NProgress.inc(0.2);
      };
      img.src = url;
      if (img.complete) { img.onload(); }
    }

    var notLazyImages = jQuery('main img:not([lazyload])');
    var total = notLazyImages.length;
    for (const img of notLazyImages) {
      const old = img.onload;
      img.onload = function() {
        old && old();
        window.NProgress && window.NProgress.inc(0.5 / total);
      };
      if (img.complete) { img.onload(); }
    }
  },

  registerRefreshCallback: function(callback) {
    if (!Array.isArray(Fluid.events._refreshCallbacks)) {
      Fluid.events._refreshCallbacks = [];
    }
    Fluid.events._refreshCallbacks.push(callback);
  },

  refresh: function() {
    if (Array.isArray(Fluid.events._refreshCallbacks)) {
      for (var callback of Fluid.events._refreshCallbacks) {
        if (callback instanceof Function) {
          callback();
        }
      }
    }
  },

  billboard: function() {
    if (!('console' in window)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(`
------------------------------------------------
|                                              |
|     ________  __            _        __      |
|    |_   __  |[  |          (_)      |  ]     |
|      | |_ \\_| | | __   _   __   .--.| |      |
|      |  _|    | |[  | | | [  |/ /'\`\\' |      |
|     _| |_     | | | \\_/ |, | || \\__/  |      |
|    |_____|   [___]'.__.'_/[___]'.__.;__]     |
|                                              |
|           Powered by Hexo x Fluid            |
|         GitHub: https://git.io/JqpVD         |
|                                              |
------------------------------------------------
    `);
  }
};
