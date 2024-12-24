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
          // $("#menu li.active a").css({color: "#333"});

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

