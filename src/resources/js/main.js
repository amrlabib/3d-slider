var Slider = (function() {
    var defaultOptions = {
        sliderElement: "#slider",
        slideElement: ".slide",
        activeSlide: -1,
        arrows: true,
        dots: true,
        dotCustomElement: "<span class='dot'></span>",
        arrowCustomElement: "<span class='arrow'></span>",
        focusOnClick: true,
        onSlideChange: function(prevSlide, nextSlide) {}
    }

    var initSlider = function(options) {
        var dir = $("html").attr("dir");
        var swipeHandler = new Hammer($(options.sliderElement)[0]);

        var setDefaultOptions = function() {
            var slides = $(options.sliderElement + " " + options.slideElement);
            var numberOfSlides = slides.length;
            //set the first active slide and check if added value is invalid
            options.activeSlide = (options.activeSlide > numberOfSlides - 1 || options.activeSlide < 0 || options.activeSlide == undefined) ? Math.ceil((numberOfSlides - 1) / 2) : options.activeSlide;
            //set arrow value to default true if not already set to a specific value
            options.arrows = (options.arrows == undefined) ? true : options.arrows;
            //set dots value to default true if not already set to a specific value
            options.dots = (options.dots == undefined) ? true : options.dots;
            //set focus on click default value
            options.focusOnClick = (options.focusOnClick == undefined) ? true : options.focusOnClick;
            //set dots default html if not set 
            options.dotCustomElement = (options.dotCustomElement == undefined) ? defaultOptions.dotCustomElement : options.dotCustomElement;
            //set arrows default html if not set 
            options.arrowCustomElement = (options.arrowCustomElement == undefined) ? defaultOptions.arrowCustomElement : options.arrowCustomElement;
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

        $("body").on('mouseup', '.arrow', function(event) {
            var currentActiveSlide = $(".slide.active");
            var nextActiveSlide = currentActiveSlide.next();

            if ($(this).hasClass("arrow-left"))
                nextActiveSlide = currentActiveSlide.prev();

            if (nextActiveSlide.length > 0) {
                var nextActiveIndex = nextActiveSlide.index();
                $(".dots .dot").removeClass("active");
                $($(".dots").children()[nextActiveIndex]).addClass("active");

                updateSlides(currentActiveSlide, nextActiveSlide);
            }
        });

        $("body").on('click', '.dots .dot', function(event) {
            var slideIndex = $(this).index();
            var nextActiveSlide = $($(options.sliderElement).children()[slideIndex]);
            $(".dots .dot").removeClass("active");
            $(this).addClass("active");

            var currentActiveSlide = $(".slide.active");
            updateSlides(currentActiveSlide, nextActiveSlide);
        });

        $("body").on('click', options.slideElement, function(event) {
            if (options.focusOnClick) {
                event.preventDefault();
                var nextActiveSlide = $(event.target);
                var currentActiveSlide = $(".slide.active");
                updateSlides(currentActiveSlide, nextActiveSlide);
            }
        });

        var updateSlides = function(currentActiveSlide, nextActiveSlide) {
            var currentActiveSlideIndex = $(currentActiveSlide).index();
            var nextActiveSlideIndex = $(nextActiveSlide).index();

            $(options.slideElement).removeClass("prev-1 next-1 active prev-2 next-2");

            nextActiveSlide.addClass("active");

            nextActiveSlide.prev().addClass("prev-1");
            nextActiveSlide.prev().prev().addClass("prev-2");
            nextActiveSlide.addClass("active");
            nextActiveSlide.next().addClass("next-1");
            nextActiveSlide.next().next().addClass("next-2");
            
            options.onSlideChange(currentActiveSlideIndex, nextActiveSlideIndex);
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
            var dotsContainer = $("<div class='dots'></div>");
            if (options.dots) {
                for (var i = 0; i < numberOfSlides; i++) {
                    var activeClass = "";
                    if (i == options.activeSlide)
                        activeClass = "active";

                    var dotElement = $(options.dotCustomElement).addClass(activeClass);
                    dotsContainer.append(dotElement);
                }
                $(options.sliderElement).parent().append(dotsContainer);
            }
        }

        var addArrows = function() {
            var arrowsCotainer = $("<div class='arrows'></div>");
            if (options.arrows) {
                var leftArrow = $(options.arrowCustomElement).addClass('arrow-left');
                var rightArrow = $(options.arrowCustomElement).addClass('arrow-right');
                arrowsCotainer.append(leftArrow).append(rightArrow);
                $(options.sliderElement).parent().append(arrowsCotainer);
            }
        }

        setDefaultOptions();
        addDots();
        addArrows();
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
        activeSlide: 2,
        arrows: true,
        dots: true,
        dotCustomElement: "<span class='dot'></span>",
        arrowCustomElement: "<span class='arrow'></span>",
        focusOnClick: true,
        onSlideChange: function(prevSlide, nextSlide) {}
    }
    Slider.init(options);
});
