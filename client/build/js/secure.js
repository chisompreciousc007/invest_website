	$(document).ready(function() {
      var owl = $(".secure_carousel");
      owl.owlCarousel({
        itemsCustom : [
          [0, 1],
          [360, 2],
          [600, 3],
          [767, 4],
          [1000, 5],
          [1200, 6],
          [1400, 6],
          [1600, 8]
        ],
        navigation : false,
		loop:true,
    	margin:10,
    	autoplay:true,
    	autoplayTimeout:500,
    	autoplayHoverPause:true
      });
    });