$(".popupContent").load("views/popup.html");

// web swiper
var webLength = $(".webSlide .swiper-slide").length;
var startY = 0;
var webSwiper = new Swiper(".webSlide .swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    freeMode: false,
    speed: 800,
    navigation: {
        prevEl: ".webSlide .control .prev",
        nextEl: ".webSlide .control .next",
    },
    pagination: {
        el: ".webSlide .control .page",
        clickable: true,
    },
    mousewheel: false,
    on: {
        init: function() {
            webSwiperStep(0);
        },
        slideChangeTransitionStart : function() {
            webSwiperStep(this.activeIndex);
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
        }
    }, 
});

// fullpage
$("#fullpage").fullpage({         
    anchors: ["home", "about", "web", "design", "work", "contact", "foot"],
    menu: "#menu",
    scrollingSpeed: 1000,
    onLeave: function(origin, destination, direction) {
        let num = String(destination);
        if(num == "7") num = "6";
        try { 
            setTimeout(() => {
                navUnderBar(num);
                leftMenuActive(num);
                leftArrLink();
                btmMenuActive(num);
                if(num == "2") skillDrawAll();
            }, 100);
        }catch(err){
            console.log("navUnderBar 함수가 정의되지 않았습니다");
        }
    }
});           
  
// work swiper
let workSlideIdx = 0;
var workSwiper = new Swiper(".workSlide .swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    preventClicks: true,
    preventClicksPropagation: false,
    centeredSlides: true,
    slideToClickedSlide: true,      // 클릭한거 가운데로 오게
    speed: 800,
    loop: true,
    navigation: {
        prevEl: ".slideBox .control .prev",
        nextEl: ".slideBox .control .next",
    },
    pagination: {
        el: ".slideBox .control .page",
    clickable: true,
    },
    mousewheel: false,
    on: {
        init: function() {
            workSwiperStep(0);
        },
        activeIndexChange: function() {
            workSwiperStep(this.realIndex);
        }
    }, 
});

// resize
$(window).resize(function(){
	if( window.innerWidth >= 900 ){
        $("nav").css("display", "block");
        $(".header").removeClass("on");
		$("body").css({ touchAction: "auto" });
        $("body").off("scroll touchmove mousewheel");
        $(".profile").removeClass("on");
        navUnderBar("active");
        if($(".popProfile").hasClass("on")) $(".popProfile").removeClass("on").css({ display: "none" });
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
setTimeout(() => {
    let num = String($("#fullpage .section.active").index() + 1);
    let li = $("#menu li:nth-child(" + num + ")");
    if(!li.hasClass("active")) li.addClass("active");
    navUnderBar(num);
    leftMenuActive(num);
    leftArrLink();
    btmMenuActive(num);
    clearTimeout();
}, 1000);

// bottom-nav
function btmMenuActive(act){
    let li = $("#btmMenu li:nth-child(" + act + ")");
    $("#btmMenu li").removeClass("active");
    li.addClass("active");
}

// about skill percent
function skillDraw(max, classname){
    var i = 1;
    var func1 = setInterval(function(){
        if(i <= max){
            $(".skill ul li."+ classname +" .circle .percent").css({
                "background": "conic-gradient(#ffd71f 0% "+i+"%, rgba(255,255,255,0) "+i+"% 100%)"
            });

            i++;
        } else{
            clearInterval(func1);
        }
    },20);
}
function skillDrawAll(){
    clearTimeout();
    $(".skill ul li .circle .percent").css({ "background": "none" });
    setTimeout(() => { 
        skillDraw(100, "html");
        skillDraw(95, "css");
        skillDraw(80, "js");
        skillDraw(85, "jq");
        skillDraw(50, "sql");
        skillDraw(70, "php");
        skillDraw(50, "react");
        skillDraw(90, "ps");
        skillDraw(80, "ai");
    }, 1500);
}

// web Swiper
function webSwiperStep(idx){
    const content = {
        items: [
            { 
                step: "01", 
                title: "PAH COMPANY", 
                sort: "디자인 기업 홈페이지 리뉴얼",
                date: "20. 8. 5 ~ 20. 9. 7",
                sub: "디자인 기업 홈페이지를 리뉴얼 하였습니다.<br>다양한 기기와 브라우저에서 반응형으로 UI/UX가 구현됩니다.",
                tool: ["vsc", "html", "css", "js", "jq", "ps", "ai"],
                detail: "1",
                link: "https://grmjoha2.github.io/portfolio_1/"
            },
            { 
                step: "02", 
                title: "LH 한국토지주택공사", 
                sort: "DB연동 회원가입 구현",
                date: "22. 1. 23 ~ 22. 2. 2",
                sub: "LH 사이트를 리뉴얼한 모바일용 웹 입니다<br>JAVA, JDBC를 이용하여<br>회원가입, 로그인, 회원정보수정을 구현하였습니다.",
                tool: ["eclipse", "tomcat", "java", "css", "sql", "ps", "ai"],
                detail: "2",
                link: "https://github.com/pahcode/pplh"
            },
            { 
                step: "03", 
                title: "오뚜기 오키친", 
                sort: "기업 홈페이지 리액트 제작",
                date: "20. 11. 15 ~ 20. 12. 4",
                sub: "오뚜기 오키친 홈페이지를 리액트로 제작하였습니다.<br>리액트 구조를 이해하고 OpenAPI를 사용하여 실시간 뉴스를 표시하였습니다.",
                tool: ["vsc", "react", "css", "js", "ps", "ai"],
                link: "https://grmjoha2.github.io/portfolio_4/#/"
            },
            { 
                step: "04", 
                title: "BILLYANGEL", 
                sort: "빌리엔젤 홈페이지 메인 리뉴얼",
                date: "20. 10. 15 ~ 20. 11. 9",
                sub: "빌리엔젤 홈페이지 메인을 리뉴얼 하였습니다.<br>반응형으로 움직여 역동적인 효과를 주고,<br>슬라이드를 3D처럼 표현해 입체감을 주었습니다.",
                tool: ["vsc", "html", "css", "js", "jq", "ps", "ai"],
                link: "https://grmjoha2.github.io/portfolio_2/"
            }
        ] 
    }
    let items = content.items[idx];
    let $box = $(".section.web .txtBox");
    let tools = "";
    let cnt = 0;
    $box.stop().animate(
        { opacity: "0" }, 300, function(){
            $box.find(".tit .step").text(items.step);
            $box.find(".tit h3").text(items.title);
            $box.find(".tit .sort").text(items.sort);
            if(window.innerWidth > 700){
                $box.find(".explain .date").text(items.date);
                $box.find(".explain .sub").html(items.sub);
                if(cnt == 0){
                    $.each(items.tool, function(idx, item){
                        tools += "<li class='"+ item +"'></li>";
                    });
                }
                $box.find(".tool ul").html(tools);
            }else{
                if($(".webSlide .swiper-slide").eq(idx).find(".txtBox.m").length == 0){
                    let tag = '<div class="txtBox m">';
                        tag += '    <div class="explain">';
                        tag += '        <h4>INTRODUCTION</h4>';
                        tag += '        <span class="date">' + items.date + '</span>';
                        tag += '        <span class="sub">' + items.sub + '</span>';
                        tag += '    </div>';
                        tag += '    <div class="tool">';
                        tag += '        <h4>USE-Tools</h4>';
                        tag += '        <ul>';
                        $.each(items.tool, function(idx, item){
                            tag += '        <li class="' + item + '"></li>';
                        });
                        tag += '        </ul>';
                        tag += '    </div>';
                        tag += '</div>';
                    $(".webSlide .swiper-slide").eq(idx).append(tag);
                }
            }
            if(items.detail){
                $(".popWeb .imgBox img").attr("src", "images/web/detail" + items.detail + ".jpg");
                $(".detailBtn").removeClass("off");
            }else{
                $(".detailBtn").addClass("off");
            }
            if(idx == 1) $box.find(".link").text("코드 보기");
            else $box.find(".link").text("사이트 이동");
            $box.find(".link").attr("href", items.link);    
            $(this).stop().animate({ opacity: "1" }, 400);
            cnt++;
        }
    );
};

// work Swiper
function workSwiperStep(idx){
    const content = {
        items: [
            { 
                step: "01", 
                title: "에이아이씨티", 
                desc: "자사 소개 홈페이지 입니다.<br>자동차 데이터 및 솔루션 개발 전문 ICT 기업임을 소개하고 있습니다.",
                period: "3주",
                day: "24. 5. 8 ~ 5. 27",
                func: "반응형 웹 | 풀페이지 레이아웃 | 스크롤 애니메이션 | 상담문의 전송 DB연동",
                role: "<b>담당업무 Front-end</b> (그 외 Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"],
                link: "http://www.aict.ltd/"
            },
            { 
                step: "02", 
                title: "카동 APP", 
                desc: "자동차 솔루션 APP 입니다.<br>비교견적 서비스를 제공하고, 프로모션 및 금융 할부 상품의 정보를 불러옵니다.",
                period: "1개월 2주",
                day: "24. 4. 1 ~ 5. 15",
                func: "웹뷰 | iOS safe area 대응 | B2C 비교견적 시스템 | 차량 데이터 JSONP 연동 | 상담문의 DB 전송",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 1명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"],
                link: "https://m.cardong.co.kr/new_car_estimate"
            },
            { 
                step: "03", 
                title: "NICE-카동", 
                desc: "나이스 비즈라인 회사의 법인, 임직원 전용 APP 입니다.<br>자동차 구매 정보를 맞춤형으로 제공합니다.",
                period: "3개월",
                day: "24. 1. 5 ~ 4. 4",
                func: "반응형 웹 | 차량 데이터 JSONP 연동 | B2C 비교견적 시스템 | 상담문의 DB 전송",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 3명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"],
                link: "https://nice.cardong.co.kr/?aict=id"
            },
            { 
                step: "04", 
                title: "카버스 APP", 
                desc: "자동차 구독, 신차견적 정보를 제공하고 전문 매니저 서비스를 신청하는 자동차 솔루션 앱 입니다.",
                period: "2개월",
                day: "23. 10. 25 ~ 12. 28",
                func: "웹뷰 | 차량 데이터 JSONP 연동 | 구독신청 Form | Social 로그인",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 3명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"]
            },
            { 
                step: "05", 
                title: "하모니렌트카", 
                desc: "신차견적, 오토리스, 금융리스, 오토론, 중고차 할부 정보를 제공하는 자동차 솔루션 사이트 입니다.",
                period: "10일",
                day: "23. 7. 7 ~ 7. 17",
                func: "반응형 웹 | 차량 데이터 JSONP 연동 | B2C 비교견적 시스템 | 검색 필터 | ADMIN 기능",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 1명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"],
                link: "http://hmn.aictin.com/"
            },
            { 
                step: "06", 
                title: "카뷰", 
                desc: "자동차 견적 사이트 입니다.<br>신차 렌트/리스 비교견적, 즉시출고 차량 조회, 장기렌트 이용후기, 저신용 상품 상담을 제공합니다.",
                period: "2주 3일",
                day: "23. 6. 20 ~ 7. 6",
                func: "반응형 웹 | 차량 데이터 JSONP 연동 | B2C 비교견적 시스템 | 검색 필터 | ADMIN 기능",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 1명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"],
                link: "https://www.car-view.co.kr/"
            },
            { 
                step: "07", 
                title: "CAR.E.M", 
                desc: "자동차 견적 사이트 입니다.<br>최저가 비교견적, 즉시출고 차량 조회, 렌트/리스 원스톱 솔루션을 제공합니다.",
                period: "2개월 2주",
                day: "23. 3. 20 ~ 6. 2",
                func: "반응형 웹 | 차량 데이터 JSONP 연동 | B2C 비교견적 시스템 | 검색 필터 | ADMIN 기능",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 2명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"],
                link: "https://www.carem.kr/"
            },
            { 
                step: "08", 
                title: "CARVERSE", 
                desc: "자동차 견적 사이트 입니다.<br>구독, 즉시출고 차량 조회, 금융비교 서비스 및 카버스 자체 금융 프로모션 상품 안내를 제공합니다.",
                period: "4개월",
                day: "22. 11 ~ 23. 2",
                func: "반응형 웹 | B2C 비교견적 시스템 | 상품등록·관리·주문·조회 | 상담문의 DB 전송 | SNS 공유",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 2명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"]
            },
            { 
                step: "09", 
                title: "Star Signature", 
                desc: "자동차 윈도우 필름 시공 브랜드인 스타시그니처 공식 사이트 입니다.",
                period: "2주",
                day: "23. 1. 3 ~ 1. 17",
                func: "반응형 웹 | 보증서 정보 DB 연결",
                role: "<b>담당업무 Front-end</b> (그 외 Back-end 1명, Design 1명)",
                tool: ["eclipse", "php", "css", "js", "jq", "heidi"],
                link: "http://www.starsignature.co.kr/"
            }
        ] 
    }
    let items = content.items[idx];
    let $box = $(".section.work .txtBox");
    let tools = "";
    clearTimeout();
    $(".section.work").addClass("blind");
    setTimeout(() => { 
        $(".slideBox .step").text(items.step)
        $(".slideBox h3").text(items.title)
        $box.find(".desc").html(items.desc);
        $box.find(".period").text(items.period);
        $box.find(".day").text(items.day);
        $box.find(".func").text(items.func);
        $box.find(".role").html(items.role);
        $.each(items.tool, function(idx, item){
            tools += "<li class='"+ item +"'></li>";
        });
        $box.find(".tool ul").html(tools);
        if(items.link) $box.find(".link").removeClass("off").attr("href", items.link);
        else $box.find(".link").addClass("off").attr("href", "javascript:void(0);");
        $box.find(".link").attr("href", items.link);
        $(".section.work").removeClass("blind");
    }, 300);
};

// contact form check
$(document).on("click", "#contactApply", function(){
	let mailChk = /^([A-Za-z0-9_\.-]+)@([A-Za-z0-9_-]+)(\.[A-Za-z0-9_-]+){1,2}$/;
	if($("input[name=name]").val() == ""){
		alert("이름을 입력해 주세요.");
		$("input[name=name]").focus();
		return false;
	}else if(!mailChk.test($("input[name=mail]").val())){
		alert("이메일을 확인해주세요.");
		$("input[name=mail]").focus();
		return false;
	}else if($("input[name=title]").val() == ""){
		alert("제목을 입력해 주세요.");
		$("input[name=title]").focus();
		return false;
	}else if($("textarea[name=memo]").val() == ""){
		alert("내용을 입력해 주세요.");
		$("textarea[name=memo]").focus();
		return false;
	}
});
