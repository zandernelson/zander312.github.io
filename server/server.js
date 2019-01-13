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

const blinkingAnimation = () => {
  setTimeout(() => {
    let servers = ['server-one', 'server-three', 'server-two']
    let colors = ['red', 'yellow', 'green']
    servers.forEach((server, i) => {
      setTimeout(() => {
        let serverSvg = document.getElementById(server)
        let blinkers = serverSvg.contentDocument.getElementsByClassName('blink')
        for (let blinker of blinkers) {
          blinker.setAttribute('stroke', colors[Math.round(Math.random() * 2)])
          blink(blinker)
        }
      }, 3500 + (i * 3000))
    })
  }, 1000)
}

const blink = (svgObj) => {
  svgObj.setAttribute('stroke-width', '0')
  setTimeout(() => {
      svgObj.setAttribute('stroke-width', '2')
    }, Math.floor(Math.random() * 1000) + 800) //Math.floor(Math.random() * 1000) + 800
  setTimeout(() => {
      blink(svgObj)
    }, Math.floor(Math.random() * 2000) + 1800) //Math.floor(Math.random() * 2000) + 1800
}

// MAIN
vivusAnimation()
blinkingAnimation()