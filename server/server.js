// VIVUS CODE

const vivusAnimation = () => {
  const type = 'delayed'
  const duration = 200

  document.getElementById('server-one').style.visibility = 'hidden'
  document.getElementById('server-two').style.visibility = 'hidden'
  document.getElementById('server-three').style.visibility = 'hidden'

  if (screen.width < 1200) {
    document.getElementById('server-three').style.visibility = 'hidden'
    new Vivus('server-three', {
      type: type,
      duration: duration
    })
  } else {
    document.getElementById('server-one').style.visibility = 'visible'
    new Vivus('server-one', {
      type: type,
      duration: duration
    }, () => {
      document.getElementById('server-three').style.visibility = 'visible'
      new Vivus('server-three', {
        type: type,
        duration: duration
      }, () => {
        document.getElementById('server-two').style.visibility = 'visible'
        new Vivus('server-two', {
          type: type,
          duration: duration
        })
      })
    })
  }
}

// MAIN
vivusAnimation()