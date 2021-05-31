$('document').ready(() => {
  $('.container-scroll').on('click', function() {
    console.log('TARGETED')
    var position = $(".Appetizers").offset().top - 225;
    $("HTML, BODY").animate({
        scrollTop: position
    }, 1000);
  });
})
