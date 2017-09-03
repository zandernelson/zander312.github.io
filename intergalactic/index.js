'use-strict'
// The amount of circles we want to make:
var count = 350;

// Create a symbol, which we will use to place instances of later:
var path = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: 'white',
	strokeColor: 'black'
});

var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
	// The center position is a random point in the view:
	var center = Point.random() * view.size;
	var placedSymbol = symbol.place(center);
	var sizes = [0.10, 0.20, 0.25, 0.30, 0.40, 0.70]
	placedSymbol.scale(sample(sizes));
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
	// Run through the active layer's children list and change
	// the position of the placed symbols:
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		
		// Move the item 1/20th of its width to the right. This way
		// larger circles move faster than smaller circles:
		item.position.x -= item.bounds.width / 20;

		// If the item has left the view on the right, move it back
		// to the left:
		if (item.bounds.right < 0) {
			item.position.x = view.size.width;
		}
	}
}

function rand(min, max) {
  console.log(Math.floor((Math.random() * max) + min))
  return Math.floor((Math.random() * max) + min);
}

function sample(arr) {
	return arr[rand(0, arr.length)]
}




// $(document).ready(() => {
//   let universe = new Universe(300)
//   universe.generateStars()
//   universe.renderStars()
//   universe.animateStars()

// })

// class Universe {
//   constructor(size) {
//     this.winX = window.innerWidth;
//     this.winY = window.innerHeight;
//     this.size = size;
//     this.stars = [];
//   }

//   generateStars() {
//     for (let i = 0; i < this.size; i++) {
//       let $star = $("<div class='star'></div>")
//       let size;
//       i % 7 == 0 ? size = rand(5, 10) : size = rand(1, 5)
//       $star.css({
//         "top": rand(0, this.winY) + "px",
//         "left": rand(0, this.winX) + "px",
//         "height": size + "px",
//         "width": size + "px",
//         "borderRadius": size + "px"
//       })
//       this.stars.push($star)
//     }
//   }

//   renderStars() {
//     $('.space').prepend(this.stars)
//   }

//   animateStars() {
//     this.stars.forEach((star) => {
//       this.animateStar(star)
//     })
//   }

//   animateStar(star) {
//     let offset = star.offset()
//     let duration = this.calcDuration(star)
//     star.css({
//       animation: ""
//     })
      
      
      
//       // star.css({
//       //   "left": (this.winX + 5) + "px"
//       // })
//       // this.animateStar(star)
//   }

//   calcDuration(star) {
//     let offset = star.offset()
//     let seconds = star.width() / .0002
//     console.log(seconds)
//     let speed = this.winX / seconds
//     return offset.left / speed
//   }
// }


// function rand(min, max) {
//   console.log(Math.floor((Math.random() * max) + min))
//   return Math.floor((Math.random() * max) + min);
// }
