$(function(){
	var carouselList = $("#carousel ul");
	var dotList = $(".carousel-nav");
	var dots = $(".carousel-nav i");
	var dotsNumber = dots.length;
	var sliding = setInterval(changeSlide, 3000); 
	
	function changeSlide() {
		carouselList.animate({'marginLeft':-600}, 500, moveFirstSlide);
	}
	
	function changeSlideReverse() {
		moveLastSlide();
		carouselList.animate({'marginLeft':0}, 500);
	}
	
	function moveFirstSlide() {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
		dotMoveRight();
	}

	function moveLastSlide() {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		firstItem.before(lastItem);
		carouselList.css({marginLeft:-600});			
		dotMoveLeft();
	}
	
	function dotMoveRight() {
		var activeDot = dotList.find(".dot-active");	
		var nextDot = dotList.find(".dot-active").next();
		var lastDot = dotList.find("i:last");		
		if (activeDot.is(lastDot)) {
			nextDot = dotList.find("i:first");
		}
		activeDot.toggleClass("dot-active dot");
		nextDot.toggleClass("dot dot-active");
	}	
	
	function dotMoveLeft() {
		var activeDot = dotList.find(".dot-active");	
		var previousDot = dotList.find(".dot-active").prev();
		var firstDot = dotList.find("i:first");		
		if (activeDot.is(firstDot)) {
			previousDot = dotList.find("i:last");
		}
		activeDot.toggleClass("dot-active dot");
		previousDot.toggleClass("dot dot-active");
	}

	$(".arrow-right").click( function(){
		clearInterval(sliding);
		changeSlide();	
	});
	
	$(".arrow-left").click( function(){
		clearInterval(sliding);
		changeSlideReverse();
	});
	
	dots.click( function() {
		clearInterval(sliding);
		var activeDot = dots.index($(".dot-active"));
		var clickedDot = dots.index(this);
		if (clickedDot > activeDot) {
			for(i = activeDot; i < clickedDot; i++) {
				changeSlide();
			}
		} else if (clickedDot < activeDot) {
			var loops = dotsNumber - activeDot + clickedDot;
			for(j = 0; j < loops; j++) {
				changeSlide();
			}
		}
	});
	
});