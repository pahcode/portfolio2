$(window).on("load", function(){
  // 컴포넌트 로드
  $(".intro").load("views/intro.html");

  setTimeout(function(){
    $("header").load("views/header.html");
    $(".intro").remove();
  }, 5000);

  setTimeout(function(){
    $("main").load("views/home.html");
    $("footer").load("views/footer.html");
  }, 5500);


  // 인트로 안나오게(개발용)
  // $("header").load("views/header.html");
  // $("main").load("views/home.html");
  // $("footer").load("views/footer.html");

});






