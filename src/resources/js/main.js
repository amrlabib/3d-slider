var Slider = (function() {

    var initSlider = function(options) {
        var dir = $("html").attr("dir");
        var swipeHandler = new Hammer($(options.sliderElement)[0]);

        var setDefaultOptions = function() {
            var slides = $(options.sliderElement + " " + options.slideElement);
            var numberOfSlides = slides.length;
            if (options.activeSlide > numberOfSlides - 1 || options.activeSlide < 0)
                options.activeSlide = Math.ceil((numberOfSlides - 1) / 2);
        }

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

        $("body").on('click', '.dots span', function(event) {
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


        var initInitialSlide = function() {
            var slides = $(options.sliderElement + " " + options.slideElement);
            var numberOfSlides = slides.length;
            for (var i = 0; i < numberOfSlides; i++) {
                var currentClass = "";
                var currentSlide = slides[i];

                if (i == options.activeSlide)
                    currentClass = "active";
                else if ((options.activeSlide - 1) >= 0 && i == (options.activeSlide - 1))
                    currentClass = "prev-1";
                else if ((options.activeSlide - 2) >= 0 && i == (options.activeSlide - 2))
                    currentClass = "prev-2";
                else if ((options.activeSlide + 1) <= numberOfSlides - 1 && i == (options.activeSlide + 1))
                    currentClass = "next-1";
                else if ((options.activeSlide + 2) <= numberOfSlides - 1 && i == (options.activeSlide + 2))
                    currentClass = "next-2";

                $(currentSlide).addClass(currentClass);
            }
        }

        var addDots = function() {
            var numberOfSlides = $(options.sliderElement + " " + options.slideElement).length;
            for (var i = 0; i < numberOfSlides; i++) {
                var activeClass = "";
                if (i == options.activeSlide)
                    activeClass = "active";

                if (!options.dotCustomElement) {
                    var dotElement = $("<span></span>").addClass(activeClass);
                    $('.dots').append(dotElement);
                } else {
                    var dotElement = $(options.dotCustomElement).addClass(activeClass);
                    $('.dots').append(dotElement);
                }
            }
        }

        setDefaultOptions();
        addDots();
        initInitialSlide();
    }
    return {
        init: function(options) {
            initSlider(options);
        }
    }
})();

$(function() {
    var options = {
        sliderElement: "#slider",
        slideElement: ".slide",
        activeSlide: 5
    }
    Slider.init(options);
});
