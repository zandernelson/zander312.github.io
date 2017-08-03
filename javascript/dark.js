$(document).ready(function() {

	//falling star animation


	function animate() {
		var colorArr = ["#FFC09F", "#FFEE93", "#A0CED9", "#ADF7B6"]

		var $star = $('<div class="star"> <div class="small"></div> <div class="large"></div> <div class="small"></div> </div>');
		$star.children().css({
			"background-color": colorArr[Math.floor(Math.random() * colorArr.length)]
		})

		var $triangle = $('<div class="triangle"></div>');
		$triangle.css({
			"border-top-color": colorArr[Math.floor(Math.random() * colorArr.length)]
		})

		var $box = $('<div class="box"></div>');
		$box.css({
			"background-color": colorArr[Math.floor(Math.random() * colorArr.length)]
		})

		var $circle = $('<div class="circle"></div>')
		$circle.css({
			"background-color": colorArr[Math.floor(Math.random() * colorArr.length)]
		})

		var shapeArr = [$triangle, $box, $circle];
		var $body = $('body')
		var $shape = shapeArr[Math.floor(Math.random() * shapeArr.length)]

		$body.prepend($shape)

		$shape.css({
			"top": Math.random() * window.innerHeight - 30,
			"left": Math.random() * window.innerWidth
		})

		// $shape.children().css({
		// 	"background-color": colorArr[Math.floor(Math.random() * colorArr.length)]
		// })

		// $shape.css({
		// 	"background-color": colorArr[Math.floor(Math.random() * colorArr.length)]
		// })

		$shape.animate({
			top: window.innerHeight - 30
		}, 7000, function() {
			$(this).hide()

		})

	}


	setInterval(function(){
		animate()
	}, 300)
	
	



});