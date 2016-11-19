var Slider = (function() {

    var initSlider = function() {
        var dir = $("html").attr("dir");
        var swipeHandler = new Hammer(document.getElementById("slider"));
        swipeHandler.on('swipeleft', function(e) {
            if (dir == "rtl")
                $(".arrow-left").trigger("mouseup");
            else
                $(".arrow-right").trigger("mouseup");
        });

        swipeHandler.on('swiperight', function(e) {
            if (dir == "rtl")
                $(".arrow-right").trigger("mouseup");
            else
                $(".arrow-left").trigger("mouseup");
        });

        $(".arrow-right , .arrow-left").mouseup(function(event) {
            var nextActiveSlide = $(".slide.active").next();

            if ($(this).hasClass("arrow-left"))
                nextActiveSlide = $(".slide.active").prev();

            if (nextActiveSlide.length > 0) {
                var nextActiveIndex = nextActiveSlide.index();
                $(".dots span").removeClass("active");
                $($(".dots").children()[nextActiveIndex]).addClass("active");

                updateSlides(nextActiveSlide);
            }
        });

        $(".dots span").click(function(event) {
            var slideIndex = $(this).index();
            var nextActiveSlide = $($(".slider").children()[slideIndex]);
            $(".dots span").removeClass("active");
            $(this).addClass("active");

            updateSlides(nextActiveSlide);
        });

        var updateSlides = function(nextActiveSlide) {
            var nextActiveSlideIndex = $(nextActiveSlide).index();

            $(".slide").removeClass("prev-1");
            $(".slide").removeClass("next-1");
            $(".slide").removeClass("active");
            $(".slide").removeClass("prev-2");
            $(".slide").removeClass("next-2");

            nextActiveSlide.addClass("active");

            nextActiveSlide.prev().addClass("prev-1");
            nextActiveSlide.prev().prev().addClass("prev-2");
            nextActiveSlide.addClass("active");
            nextActiveSlide.next().addClass("next-1");
            nextActiveSlide.next().next().addClass("next-2");
        }

        var updateToNextSlide = function(nextActiveSlide) {

        }
    }
    return {
        init: function() {
            initSlider();
        }
    }
})();

$(function() {
    Slider.init();
});
