// popup not scrolling
function notScrollOn(){
    $("body").css({ touchAction: "none" });
    $("body").on("scroll touchmove mousewheel", function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
};
function notScrollOff(){
    $("body").css({ touchAction: "auto" });
    $("body").off("scroll touchmove mousewheel");
}

// about profile popup
$(document).on("click",".profileBtn .open", function(){
    $(".popProfile").addClass("on").stop().fadeIn(500);
    notScrollOn();
});
$(document).on("click",".popProfile .close", function(){
    $(".popProfile").removeClass("on").stop().fadeOut(500);
    notScrollOff();
});
$(document).on("click",".popProfile .dim", function(){
    $(".popProfile").removeClass("on").stop().fadeOut(500);
    notScrollOff();
});

// web detail popup
$(document).on("click",".detailBtn:not(.off)", function(){
    let box = $(".popWeb .popView .imgBox");
    $(".popWeb").addClass("on").stop().fadeIn(500);
    if(box.scrollTop() != 0) box.scrollTop(0);
    notScrollOn();
});
$(document).on("click",".popWeb .close", function(){
    $(".popWeb").removeClass("on").stop().fadeOut(500);
    notScrollOff();
});
$(document).on("click",".popWeb .dim", function(){
    $(".popWeb").removeClass("on").stop().fadeOut(500);
    notScrollOff();
});

// design popup
$(document).on("click",".designList li", function(){
    let num = $(this).index() + 1;
    $(".popDesign").addClass("on").stop().fadeIn(500);
    $(".popDesign .imgBox").html("<img src='images/design/design" + num + ".jpg' num='" + num + "'>");
    notScrollOn();
});
$(document).on("click",".popDesign .arr", function(){
    let num = $(this).parent().find(".imgBox img").attr("num");
    if($(this).hasClass("prev")){
        if(num == "1") num = "16";
        else num = String(parseInt(num) - 1);
    }else{
        if(num == "16") num = "1";
        else num = String(parseInt(num) + 1);
    }
    let src = "images/design/design" + num + ".jpg";

    $(".popDesign .popView").stop().animate(
        { opacity: "0.3" }, 200, function(){
            $(".popDesign .imgBox img").attr("src", src);
            $(".popDesign .imgBox img").attr("num", num);
            $(this).stop().animate({ opacity: "1" }, 300);
        }
    );
});
$(document).on("click",".popDesign .close", function(){
    $(".popDesign").removeClass("on").stop().fadeOut(500);
    notScrollOff();
});
$(document).on("click",".popDesign .dim", function(){
    $(".popDesign").removeClass("on").stop().fadeOut(500);
    notScrollOff();
});
$(document).on("keydown", function(e) {
    if(e.key === "ArrowRight") {
        if(!$(".popDesign").hasClass("on")) return false;
        else $(".popDesign .next").click();
    }else if (e.key === "ArrowLeft") {
        if(!$(".popDesign").hasClass("on")) return false;
        else $(".popDesign .prev").click();
    }
});