// VIVUS CODE

const vivusAnimation = () => {
  setTimeout(() => {
    const type = 'delayed'
    const duration = 200

    if (window.innerWidth < 1200) {
      document.getElementById('server-three').style.visibility = 'visible'
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
  }, 1000)
}

// MAIN
vivusAnimation()