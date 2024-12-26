function navUnderBar(act){
  let li;
  if(act == "active" || act == "hover") li = $("#menu li." + act);
  else li = $("#menu li:nth-child(" + act + ")");
  let width = li.innerWidth();
  let ulOffset = $("#menu").offset().left;
  let offset = Math.floor((li.offset().left) - ulOffset);
  $("nav .underBar").css({width: width, left: offset});
};

// nav hover
$("#menu li a").hover(
  function() {
    let li = $(this).parent();
    if(!li.hasClass("active")){
        li.addClass("hover");
        navUnderBar("hover");
    }
  }, function() {
    $(this).parent().removeClass("hover");
    navUnderBar("active");
  }
);

// nav UnderBar
setTimeout(function(){
  navUnderBar("active");
}, 1200);

// nav mobile
$(document).on("click","#navBtnOpen",function(){
	navOpenMobile();
});
$(document).on("click",".header .dim",function(){
	navOpenMobile();
});

function navOpenMobile(){
	if(!$(".header").hasClass("on")){
		$("nav").css("display", "block").animate({right: "0"}, 300);
    $(".header .dim").css("background", "rgba(0, 0, 0, 0.4)");
    $("body").css({ touchAction: "none" });
    $("body").on("scroll touchmove mousewheel", function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
 		$(".header").addClass("on");
	}else{
		$("nav").animate({right: "-280px"}, 300, function(){
			$("nav").css("display", "none");
			$(".header .dim").css("background", "rgba(0, 0, 0, 0)");
		});
		$("body").css({ touchAction: "auto" });
    $("body").off("scroll touchmove mousewheel");
		$(".header").removeClass("on");
	}
};