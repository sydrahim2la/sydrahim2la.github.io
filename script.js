function openNav() {
    document.getElementById("mycontrolers").style.width = "34%";
}

function closeNav() {
    document.getElementById("mycontrolers").style.width = "0";
}

$(document).ready(function(){
  $('.content').slick({
    slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  dots: true,
  adaptiveHeight: true,
  });
});
