// web swiper
var webLength = $(".web .swiper-slide").length;
var startY = 0;
var webSwiper = new Swiper(".web .swiper-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    freeMode: false,
    speed: 800,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    mousewheel: true,
    on: {
        slideChange: function(){        
            var idx = this.activeIndex;
            // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
            if(this.activeIndex != 0 && idx != webLength) $.fn.fullpage.setAllowScrolling(false);
            if(webLength == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false) 
            //슬라이드가 2개밖에 없을때
            // console.log("즉시 : " + idx);
        },  
        slideChangeTransitionEnd: function(){
            var idx = this.activeIndex;
            // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
            if(idx == 0 || idx >= webLength-1) $.fn.fullpage.setAllowScrolling(true);
            // console.log("전환후 : " + idx);     
        },     
        touchStart: function(e) {       
            startY = e.touches.startY; 
        },
        touchEnd: function(e) {   
            if(startY-10 > e.touches.currentY) {        
                webSwiper.slideNext();  
            } else if(startY+10 < e.touches.currentY) {
                webSwiper.slidePrev();      
            }
            // console.log(startY, e.touches.currentY);
        }
        /*
        touchMove: function(e) {       
            var startY = e.touches.startY;
            setTimeout(function(){
            if(startY > e.touches.currentY) swiper.slideNext();  
            else swiper.slidePrev();
            },100);        
        },
        */           
    }, 
});     

// fullpage
$("#fullpage").fullpage({         
    // responsiveHeight: 600,
    // sectionsColor: ["#1bbc9b", "#4BBFC3", "#7BAABE"],
    anchors: ["home", "about", "web", "design", "work", "contact", "foot"],
    menu: "#menu",
    scrollingSpeed: 1000,
    // scrollBar: true,
    onLeave: function(origin, destination, direction) {
        let num = String(destination);
        if(num == "7") num = "6";
        try { 
            setTimeout(function(){
                navUnderBar(num);
                leftMenuActive(num);
                leftArrLink();
                btmMenuActive(num);
            }, 100);
        }catch(err){
            console.log("navUnderBar 함수가 정의되지 않았습니다");
        }
        // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
        $("#fullpage").on("scroll touchmove mousewheel", function(event) {                    
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        webSwiper.mousewheel.disable();
    },
    afterLoad: function(anchorLink, index) {
        // navUnderBar("active");
        // 전환이 끝난후 이벤트풀기                               
        $("#fullpage").off("scroll mousewheel");      
        if(!$(".fp-completely .swiper-wrapper").webLength > 0) $("#fullpage").off("touchmove"); 
        // 모바일분기
        if(webSwiper) webSwiper.mousewheel.enable();    
        if(!$(".sec3").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); 
        // 슬라이드 섹션을 벗어나면 휠풀어주기
    }
});           
  
// work swiper
var workSwiper = new Swiper(".work .swiper-container", {
    slidesPerView: 3,
    spaceBetween: 30,
    preventClicks: true,
    preventClicksPropagation: false,
    centeredSlides: true,
    slideToClickedSlide: true,      // 클릭한거 가운데로 오게
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: false
});

// swiper keydown right, left
$(document).on("keydown", function(e) {
    if (e.key === "ArrowRight") {
        webSwiper.slideNext(); 
        workSwiper.slideNext(); 
    } else if (e.key === "ArrowLeft") {
        webSwiper.slidePrev();
        workSwiper.slidePrev();
    }
});

// resize
$(window).resize(function(){
	if( window.innerWidth >= 900 ){
        $("nav").css("display", "block");
        $(".header").removeClass("on");
		$("body").css({ touchAction: "auto" });
        $("body").off("scroll touchmove mousewheel");
        navUnderBar("active");
	}else if( window.innerWidth < 900 ){
        $("nav").css({ display: "none", right: "-55%" });
		$("body").css({ touchAction: "auto" });
	}
});

// left-menu
function leftMenuActive(act){
    let li = $("#leftMenu li:nth-child(" + act + ")");
    $("#leftMenu li").removeClass("active");
    li.addClass("active");
}

// left-menu-prev-next
function leftArrLink(){
    let num = $("#menu li.active").index() + 1;
    if(num != "1"){
        let prev = String(num - 1)
        let href = $("#menu li:nth-child(" + prev + ")").data("menuanchor");
        $("#leftFloatMenu .prev a").attr("href", "#" + href);
    }
    if(num != "6"){
        let next = String(num + 1)
        let href = $("#menu li:nth-child(" + next + ")").data("menuanchor");
        $("#leftFloatMenu .next a").attr("href", "#" + href);
    }
}

$(document).on("click","#leftFloatMenu .arr", function(){
    leftArrLink();
});

// nav initial settings
setTimeout(function(){
    let num = String($("#fullpage .section.active").index() + 1);
    let li = $("#menu li:nth-child(" + num + ")");
    if(!li.hasClass("active")) li.addClass("active");
    navUnderBar(num);
    leftMenuActive(num);
    leftArrLink();
    btmMenuActive(num);
}, 1000);

// bottom-nav
function btmMenuActive(act){
    let li = $("#btmMenu li:nth-child(" + act + ")");
    $("#btmMenu li").removeClass("active");
    li.addClass("active");
}


