//slider vars
var slideWrapper = $(".main-slider"),
    iframes = slideWrapper.find('.embed-player'),
    lazyImages = slideWrapper.find('.slide-image'),
    lazyCounter = 0,
    videoSources = $('source');
    hashURLs = [];

// nav vars
var navigation = $('nav'),
    allProjects = $('.newproject'),
    allSlides = $('.projectItem'),
    projectIndex = [],
    navWidth = 98/allProjects.length,
    activeProjectID = 0,
    activeProjectChange,
    activeMenuItem;

// info vars
var infoWrapper = $('.infoWrapper'),
    infoContent = $('.infoContent'),
    backgroundImage = $(".background-image"),
    infoBarHeight = 20;
    infoBarVisible = false;

// changing the background image
function changeBackgroundImage(image){
  if (image) {
    var imageSource = $( image ).css('background-image');
    backgroundImage.css("background-image", imageSource );
  }
  else {
    backgroundImage.css("background-image", "none" );
    backgroundImage.css("background-color", "black" );
  }
}

// figure out if it's on mobile, if yes, set inner window height
function setHeights() {
  // 'check' variable indicates if mobile is true
  var check = false;
  // regex function to check for mobile
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  if (check) {
    // we're on mobile
    $(".projectItem").css("height", window.innerHeight);
  } else {
    // we're on desktop
    $(".projectItem").css("height", "100vh");
  }
}

function checkForURLHash() {
  //check if the user is looking for a specific page first
  if (window.location.hash) {
    // find the hash in the array
    var indOfActiveSection = hashURLs.indexOf(window.location.hash);
    // if it exists...
    if (indOfActiveSection != -1) {
      // ...go to that page
      location.replace(hashURLs[indOfActiveSection]);
      slideWrapper.slick('slickGoTo', indOfActiveSection);
    }
  }
}

function buildHashURLs() {
  // fill hashURL array with all numbers
  for (var i = 0; i < allSlides.length; i++) {
    var numberPlusOne = i + 1;
    hashURLs.push("#" + numberPlusOne);
  }
}

// replace the title has URLS
function replaceHashURLs(title, slideIndex) {
  // replace all spaces
  var hashTitle = title.replace(/\s/g, '');
  // i don't know how regex works so removing everything except for letters and numbers manually
  hashTitle = hashTitle.replace(/[^A-Za-z0-9\s!?]/g,'');
  // push it to the hash array
  hashURLs[slideIndex] = "#" + hashTitle;
  // add a link to the first description for each hashURL
  var el = $('<p class="infoBarParagraph linkList">→ <a href="#' + hashTitle + '" data-link="' + slideIndex +'" onclick="linkListDescription()">' + title + '</a>');
  $('.selfDescription').append(el);
}
// the function for the link list to work
function linkListDescription() {
  slideWrapper.slick('slickGoTo', $(event.target).data('link'));
  // focus back on the carousel so arrow keys work
  $(document).find('.slick-list').attr('tabindex', 0).focus();
}

// make the project tags so the navigation works
function makeProjectTags(){
  var index = -1;
  for (var i = 0; i < allSlides.length; i++) {
    if ( $(allSlides[i]).hasClass("newproject") ) {
      index += 1;
    }
    $(allSlides[i]).addClass("project-" + index);
  }
}

// building the navigation
function buildNavigation(){
  var index = 0;
  // create a menu item for each project
  // loop through all the projects
  for (var i = 0; i < allProjects.length; i++) {
    // push current index to project index array
    projectIndex.push(index);
    // find the project title for each project with the index counter
    var projectTitle = $(allSlides[index]).find(".caption").get(0);

    var projectTitleContent = $(projectTitle).text();
    //get the slide number, make string, add to menu item at the top
    var projectIndexString = (projectIndex[i] + 1).toString();
    // add a link to the menu for each project with the caption text
    navigation.append(
      "<div class='headerItem' style='width:" + navWidth + "vw'><p class='menuItemNumber'>" + projectIndexString + "</p><span class='menuItemTitle'>" + projectTitleContent + "</span></div>"
    );
    // replace the particular hashURL so theproject name becomes the link
    replaceHashURLs(projectTitleContent, index);
    // add the number of slides from that project to the index counter
    index += $('.project-'+ i ).length;
  }

  // make all the nav items clickable to the correct index
  navigation.on( 'click', 'div', function() {
    var navIndex = $(this).index();
    slideWrapper.slick('slickGoTo', projectIndex[navIndex]);
    // also focus back on the carousel so arrow keys work
    $(document).find('.slick-list').attr('tabindex', 0).focus();
  });

  // add extra function to the left and right buttons
  $('.nav-prev').on( 'click', function(){
    if (projectIndex[activeProjectID]) {
      slideWrapper.slick('slickGoTo', projectIndex[activeProjectID - 1]);
    }
    $(document).find('.slick-list').attr('tabindex', 0).focus();
  });
  $('.nav-next').on( 'click', function(){
    if (projectIndex[activeProjectID + 1]) {
      slideWrapper.slick('slickGoTo', projectIndex[activeProjectID + 1]);
    }
    $(document).find('.slick-list').attr('tabindex', 0).focus();
  });
}

// build the infosign funtionality
function buildInfosign() {
  $('.infoSign').on( 'click', function() {
    $('.infoWrapper').fadeTo(0, 1);
    if (infoBarVisible) {
      backgroundImage.css({transform:'translate(0,0) scale(1.05)'});
      allSlides.css("transform","translate(0,0)");
      infoWrapper.css("transform","translate(0,0)");
      // change content of infosign
      $('.infoSign').html( "ⓘ Say What!?" );
      // change visibility boolean
      infoBarVisible = false;
      // also focus back on the carousel so arrows workx
      $(document).find('.slick-list').attr('tabindex', 0).focus();
    } else {
      infoWrapper.css( { 'top': 'auto', 'bottom': - infoBarHeight + 'px' } );

      backgroundImage.css({transform:'translate(0,-' + infoBarHeight + 'px) scale(1.05)'});
      allSlides.css("transform","translate(0,-" + infoBarHeight + "px)");
      infoWrapper.css("transform","translate(0,-" + infoBarHeight + "px)");
      // change content of infosign
      $('.infoSign').html( "ⓘ Got it!" );
      // change visibility boolean
      infoBarVisible = true;
      // also focus back on the carousel so arrows work
      $(document).find('.slick-list').attr('tabindex', 0).focus();
    }
  });
}

function moveInfoSign(activeMenuItem) {
  // find active menu position
  var activeMenuItemPosition = $('.navActive').position();
  var menuSliderPosition = $('.slick-track').position();
  var rightArrowPosition = $('.nav-next').position();
  if($(window).width() > 600){
    // in case the slider repeats, move the menu back
    if (activeProjectID == 0) {
      // and for some unknown reason i need to wait a bit
      setTimeout(function(){
        navigation.slick('slickGoTo', 0);
      }, 500);
    }
    //or move it in the other direction
    if (activeProjectID == projectIndex.length - 1) {
      // and for some unknown reason i need to wait a bit
      setTimeout(function(){
        navigation.slick('slickGoTo', projectIndex.length - 1);
      }, 500);
    }
    // if it's just a normal transition, move the navigation in the necessary direction if necessary
    if (activeMenuItemPosition.left + menuSliderPosition.left < 0) {
      navigation.slick('slickPrev');
    }
    if (activeMenuItemPosition.left + menuSliderPosition.left > rightArrowPosition.left) {
      navigation.slick('slickNext');
    }
    // move the info sign
    $('.infoSign').css({left: activeMenuItemPosition.left + menuSliderPosition.left});
  } else {
  // less fancy stuff for mobile
    if (activeProjectID == 0) {
      // if it's the first slide, go to first slide
      navigation.slick('slickGoTo', 0);
    } else if (activeProjectID == projectIndex.length - 1) {
      // if it's the last slide, go to last slide
      navigation.slick('slickGoTo', projectIndex.length - 1);
    } else if (activeMenuItemPosition.left + menuSliderPosition.left < 0) {
      // if the active project is not on screen, move the navigation there
      // navigation.slick('slickPrev');
      navigation.slick('slickGoTo', activeProjectID);
    } else if (activeMenuItemPosition.left + menuSliderPosition.left > rightArrowPosition.left) {
      // if the active project is not on screen, move the navigation there
      // navigation.slick('slickNext');
      navigation.slick('slickGoTo', activeProjectID);
    }
  }
}

function changeActiveMenuItem(activeProjectID) {
  // find active menu item
  activeMenuItem = $('nav .headerItem').eq(activeProjectID);
  // add active class to menu
  $('nav div').removeClass("navActive");
  activeMenuItem.addClass("navActive");
  // move the infoSign
  moveInfoSign(activeMenuItem);
  // update the inforbar with the current project
  updateInfoBar(activeProjectID);
  // set the control variable to be the same as the current project
  activeProjectChange = activeProjectID;
}

// change active project
function changeActiveProject(){
  //get current slide
  var currentSlideIndex = slideWrapper.slick('slickCurrentSlide');
  //change the window index hash
  history.replaceState(null, null, hashURLs[currentSlideIndex]);

  for (var i = 0; i < projectIndex.length; i++) {
    // run through all chapters until the highest possible is found
    if (currentSlideIndex >= projectIndex[i] && currentSlideIndex < allSlides.length) {
      //that's the active project
      activeProjectID = i;
    };
  }
  // check if the active project has changed. If it has, update everything
  if (activeProjectID != activeProjectChange) {
    // console.log("change");
    // find the title slide of that project
    var projectTitleSlide = projectIndex[activeProjectID];
    // get the title of that project
    var projectTitle = $(allSlides[projectTitleSlide]).find(".title").get(0);
    // change page title to that project
    document.title = "Malik Saïb-Mezghiche—" + $(projectTitle).text();
    // get the color from that project


    var projectColor = $(allSlides[projectTitleSlide]).find(".color").get(0);

    // change the color of the type to that color
    $('.headerWrapper').css('color', $(projectColor).text());
    $('.slick-dots li button').css('color', $(projectColor).text());
    $('a').css('color', $(projectColor).text());
    // for moving the what's up button and making the correct class bold
    changeActiveMenuItem( activeProjectID );
  }
}

// update infoBar content
function updateInfoBar(projectID) {
  // first need to translate chapter to a slide number
  var projectTitleSlide = projectIndex[projectID];
  // check if the infobar is visible, then need to animate etc
  if (infoBarVisible == true) {
    // first remove the Text
    infoContent.animate({ opacity: 0 }, 500);
    // and wait for the same time with all the other operations
    setTimeout(function(){
      //get the description of the current poject
      var projectDescription = $(allSlides[projectTitleSlide]).find(".description").get(0);
      // put that content into the infobar
      infoContent.html($(projectDescription).html());
      // columnize the text
      infoContent.columnize();
      // for mobile: add class when infocontent becomes bigger than page to create margin at the bottom
      if (infoContent.outerHeight() >= $(window).height()) {
        // console.log("it's really big!");
        $( infoContent ).removeClass("infoContentMobileSmall");
        $( infoContent ).addClass("infoContentMobileBig");
      } else {
        // console.log("it's really small!");
        $( infoContent ).removeClass("infoContentMobileBig");
        $( infoContent ).addClass("infoContentMobileSmall");
      }
      // need to wait a little bit until this is registered
      setTimeout(function(){
        //adjust the height and position of the container to fit the text
        infoBarHeight = infoContent.outerHeight();
        infoWrapper.css("height", infoBarHeight);
        // infoWrapper.css("top", (infoBarHeight * -1) );
        //adjust the translation values
        backgroundImage.css({transform:'translate(0,-' + infoBarHeight + 'px) scale(1.05)'});
        allSlides.css("transform","translate(0,-" + infoBarHeight + "px)");
        infoWrapper.css("transform","translate(0,-" + infoBarHeight + "px)");
        // adjust the regular positioning
        infoWrapper.css("height", infoBarHeight);
        //infoWrapper.css("top", (infoBarHeight * -1) );
      }, 500);
      // wait a little bit and then fade everything back in
      setTimeout(function(){
        infoContent.animate({ opacity: 100 }, 500);
      }, 500);
    }, 1000);
  } else {
    // otherwise no problem can just be brutal
    // turn off transitions
    infoWrapper.css("transition", "none");
    //there's a chance some text peaks through, so better fade the layer out first
    $( infoWrapper ).fadeTo(0, 0);
    //get the description of the current poject
    var projectDescription = $(allSlides[projectTitleSlide]).find(".description").get(0);
    // put that content into the infobar
    infoContent.html($(projectDescription).html());
    // columnize the text
    infoContent.columnize({
      // once it's done columnising give it .5 secs to turn the transitions back on
      doneFunc: function() {
        setTimeout(function(){
          infoWrapper.css("transition", "all 0.5s ease");
        }, 500);
      }
    });
    // for mobile: add class when infocontent becomes bigger than page to create margin at the bottom
    if (infoContent.outerHeight() >= $(window).height()) {
      // console.log("it's really big!");
      $( infoContent ).removeClass("infoContentMobileSmall");
      $( infoContent ).addClass("infoContentMobileBig");
    } else {
      // console.log("it's really small!");
      $( infoContent ).removeClass("infoContentMobileBig");
      $( infoContent ).addClass("infoContentMobileSmall");
    }
    // need to wait a little bit until this is registered
    setTimeout(function(){
      infoBarHeight = infoContent.outerHeight();
      infoWrapper.css("height", infoBarHeight);
      infoWrapper.css("top", (infoBarHeight * -1) );
    }, 500);
  }
}

function lazyloadVimeoVideo(someSlide) {
  var vimeoEmbedd = someSlide.find(".lazyVimeo").get(0);
  if (vimeoEmbedd) {
    console.log("lazyloader is doing his job on: ");
    console.log(someSlide);
    $('<iframe>', {
      class: 'embed-player slide-media',
      src: 'https://player.vimeo.com/video/' + $(vimeoEmbedd).data("src") + '?api=1&background=1',
      frameborder: 0,
      webkitallowfullscreen: '',
      mozallowfullscreen: '',
      allowfullscreen: '',
    }).prependTo(someSlide);
    $(vimeoEmbedd).remove();
  }
}

// When the slide is changing
function doTheSlideChange(slick, control){
  var currentSlide, slideType, startTime, player, video, prevSlide, prevSlideIndex, prevSlideType, nextSlide, nextSlideIndex, nextSlideType;

  currentSlide = slick.find(".slick-current");
  slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = currentSlide.data("video-start");

  // for lazyloading, get previous and next slides, check if either one is a vimeo slide
  prevSlideIndex = slideWrapper.slick('slickCurrentSlide') - 1;
  prevSlide = $(slideWrapper).find('[data-slick-index="' + prevSlideIndex + '"]');
  prevSlideType = prevSlide.attr("class").split(" ")[1];
  nextSlideIndex = slideWrapper.slick('slickCurrentSlide') + 1;
  nextSlide = $(slideWrapper).find('[data-slick-index="' + nextSlideIndex + '"]');
  nextSlideType = nextSlide.attr("class").split(" ")[1];

  // check first the previous and next slide, then the current slide, if they vimeo do the lazyload
  if (prevSlideType === "vimeo") {
    lazyloadVimeoVideo(prevSlide);
  } if (nextSlideType === "vimeo") {
    lazyloadVimeoVideo(nextSlide);
  } if (slideType === "vimeo") {
    lazyloadVimeoVideo(currentSlide);

    image = currentSlide.find(".slide-image").get(0);
    changeBackgroundImage(image);
    switch (control) {
      case "play":
        if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
          currentSlide.addClass('started');
          postMessageToPlayer(player, {
            "method": "setCurrentTime",
            "value" : startTime
          });
        }
        postMessageToPlayer(player, {
          "method": "play",
          "value" : 1
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "method": "pause",
          "value": 1
        });
        break;
    }
  } else if (slideType === "youtube") {
    // in case of youtube video (but why?)
    changeBackgroundImage();
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  } else if (slideType === "image") {
    image = currentSlide.find(".slide-image").get(0);
    changeBackgroundImage(image);
  }
  else if (slideType === "intro") {
    // just for the intro slide where i use a html5 video
    image = currentSlide.find(".slide-image").get(0);
    changeBackgroundImage(image);
    video = currentSlide.children("video").get(0);
    if (video != null) {
      if (control === "play"){
        video.play();
      } else {
        video.pause();
      }
    }
  } else if (slideType === "specialBG") {
    // this is for if i want to put my own, seperate background in there
    image = currentSlide.find(".specialBackgroundImage").get(0);
    changeBackgroundImage(image);
  }
}

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// DOM Ready
$(function() {
  // build the page from the content div
  makeProjectTags();
  // make hash for each slide
  buildHashURLs();
  // build navigation for each project (also replaces the hashes of title slides)
  buildNavigation();
  // build the active infosign element
  buildInfosign();
  // set heights/ check if we're on mobile
  setHeights();


  // Initialize
  slideWrapper.on("init", function(slick){
    // lazyload first video
    videoSources.eq(0).attr('src', videoSources.eq(0).data('src'));

    // not sure what this part does anymore lol
    slick = $(slick.currentTarget);
    setTimeout(function(){
      doTheSlideChange(slick,"play");
      $(document).find('.slick-list').attr('tabindex', 0).focus();
    }, 1000);
  });

  slideWrapper.on("beforeChange", function(event, slick) {
    slick = $(slick.$slider);
    doTheSlideChange(slick,"pause");
  });

  slideWrapper.on("afterChange", function(event, slick) {
    slick = $(slick.$slider);
    doTheSlideChange(slick,"play");
    changeActiveProject();
    // make the dots focus on the slider after clicking
    $(document).find('.slick-list').attr('tabindex', 0).focus();
  });

  slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
    lazyCounter++;
    if (lazyCounter === lazyImages.length){
      lazyImages.addClass('show');
      // slideWrapper.slick("slickPlay");
    }
    // when image is lazyloaded it becomes a background image
    // image.attr('src','../img/blank.png');
    image.css('background-image','url("'+imageSource+'")'); //replace with background instead
    image.css('background-size','contain');
    image.css('background-position','center');
    image.css('background-repeat','no-repeat');
    // image.attr('src','../img/blank.png');
  });

  //start the main slider
  slideWrapper.slick({
    accessibility: true,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: 0,
    // lazyLoad:"progressive",
    lazyLoad:"ondemand",
    speed: 250,
    prevArrow: $('#prevArea'),
    nextArrow: $('#nextArea'),
    dots:true,
    pauseonfocus: false,
  });

  // start the menu Slider
  navigation.slick({
    accessibility: true,
    arrows: true,
    speed: 250,
    // centerMode: true,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: $('.nav-prev'),
    nextArrow: $('.nav-next'),
    responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 5,
      }
    },{
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
      }
    },{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      }
    },{
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      }
    },{
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    },
    ]
  });

  navigation.on("afterChange", function(event, slick) {
    moveInfoSign(activeMenuItem);
  });

  // check if there is a hash in the url, then go to that slide
  checkForURLHash();
  // set the proper active slide
  changeActiveProject();
  // somehow i seem to need to update the infobar one time when the page is laoded
  updateInfoBar(activeProjectID);
  //fades the site in after some time
  setTimeout(function(){
    $('#whiteScreen').fadeOut(1000);
  }, 1000);

  // // ###############################################################
  // // script to see which videos are playing when, just for debugging
  // // ###############################################################
  //
  // var iframe = $('iframe');
  // for (var i = 0; i < iframe.length; i++) {
  //   var player = new Vimeo.Player(iframe[i]);
  //
  //   player.getVideoTitle().then(function(title) {
  //     console.log('title:', title);
  //   });
  //
  //   player.on('play', function() {
  //     console.log('Played the video');
  //   });
  //
  //   player.on('pause', function() {
  //     console.log('Paused the video');
  //   });
  // }
});

// Resize event
$(window).on("resize.slickVideoPlayer", function(){
  updateInfoBar(activeProjectID);
  moveInfoSign(activeMenuItem);
  $(document).find('.slick-list').attr('tabindex', 0).focus();
  setHeights();
});
