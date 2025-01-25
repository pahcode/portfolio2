function navUnderBar(act){
  let li;
  if(act == "active" || act == "hover") li = $("#menu li." + act);
  else li = $("#menu li:nth-child(" + act + ")");
  let width = li.innerWidth();
  let liOffset = li.offset().left;
  let ulOffset = $("#menu").offset().left;
  let left = Math.floor(liOffset - ulOffset);
  $("nav .underBar").css({width: width, left: left});
};

// nav_hover
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

// nav_mobile
$(document).on("click","#navBtnOpen",function(){
	navOpenMobile();
});
$(document).on("click",".header .dim",function(){
	navOpenMobile();
});
$(document).on("click",".header.on #menu li a",function(){
	navOpenMobile();
});

function navOpenMobile(){
	if(!$(".header").hasClass("on")){
		$("nav").css("display", "block").animate({right: "0"}, 500);
    $(".header .dim").css("background", "rgba(0, 0, 0, 0.4)");
    $(".header").addClass("on");
    notScrollOn();
	}else{
		$("nav").animate({right: "-280px"}, 500, function(){
			$("nav").css("display", "none");
			$(".header .dim").css("background", "rgba(0, 0, 0, 0)");
		});
		$(".header").removeClass("on");
		notScrollOff();
	}
};