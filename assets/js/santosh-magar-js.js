// --------site logo change in every 2 sec---
let site_logo=document.getElementById('site-logo');
let logos=['logo-stmp-001.png','logo-stmp-002.png','logo-stmp-003.png','logo-stmp-004.png'];
var x = -1;
setInterval(function () {
  x = (x === logos.length - 1) ? 0 : x + 1;
  site_logo.src='assets/images/'.concat(logos[x])
},2000);

// -------------------------------------

var btn_map_popup = document.getElementById("map_popup");
if (btn_map_popup) {
  btn_map_popup.onclick = function () {
    var val = 'mapModal';
    var modal = document.getElementById(val);
    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    let close="close_".concat(val);
    var span = document.getElementsByClassName(close)[0];
    span.onclick = function() {
      modal.style.display = "none";
    }
  }
}

// ---------------------------------------------------
$(".header-nav").each(function(){
  var toggleUD = $(this).find('.ham-list');
  toggleUD.addClass("ham-hide");
  $(this).find('.ham').click(function(){
    toggleUD.toggleClass("ham-hide");
  })
});

$(".ham-list li").click(function(){
  $(".ham-list").addClass("ham-hide");
});

// ----------------------------------------------------

