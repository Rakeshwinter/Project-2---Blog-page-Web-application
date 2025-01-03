
$(".item").on("click", ".flex-button", function(){
    $(this).closest(".item").toggleClass("overflow-visible");
});


$(".small-nav").on("click", function(){
    $(this).find(".change").toggleClass("full-view");
});
