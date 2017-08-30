'use-strict'
$(document).ready(() => {
  let universe = new Universe(300)
  universe.generateStars()
  universe.renderStars()
  universe.animateStars()

})

class Universe {
  constructor(size) {
    this.winX = window.innerWidth;
    this.winY = window.innerHeight;
    this.size = size;
    this.stars = [];
  }

  generateStars() {
    for (let i = 0; i < this.size; i++) {
      let $star = $("<div class='star'></div>")
      let size = rand(2, 2)
      i % 7 == 0 ? size = rand(6, 7) : size = rand(2, 3)
      $star.css({
        "top": rand(0, this.winY) + "px",
        "left": rand(0, this.winX) + "px",
        "height": size + "px",
        "width": size + "px",
        "borderRadius": size + "px"
      })
      this.stars.push($star)
    }
  }

  renderStars() {
    $('.space').prepend(this.stars)
  }

  animateStars() {
    this.stars.forEach((star) => {
      this.animateStar(star)
    })
  }

  animateStar(star) {
    let offset = star.offset()
    let duration = this.calcDuration(star)
    star.animate({
      left: "-5"
    }, duration, 'linear', () => {
      star.css({
        "left": (this.winX + 5) + "px"
      })
      this.animateStar(star)
    })
  }

  calcDuration(star) {
    let offset = star.offset()
    let seconds = star.width() / .0005
    console.log(seconds)
    let speed = this.winX / seconds
    return offset.left / speed
  }
}


function rand(min, max) {
  console.log(Math.floor((Math.random() * max) + min))
  return Math.floor((Math.random() * max) + min);
}
