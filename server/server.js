// VIVUS CODE

const serverIds = ['server-one', 'server-three', 'server-two']

const showServer = (id) => {
  const server = document.getElementById(id)
  if (server) {
    server.style.visibility = 'visible'
  }
}

const showAllServers = () => {
  serverIds.forEach(showServer)
}

const finishServerArt = () => {
  serverIds.forEach((id) => {
    showServer(id)

    const server = document.getElementById(id)
    if (!server || !server.contentDocument) {
      return
    }

    server.contentDocument.querySelectorAll('*').forEach((element) => {
      element.style.strokeDasharray = ''
      element.style.strokeDashoffset = ''
    })
  })
}

const vivusAnimation = () => {
  setTimeout(() => {
    if (typeof Vivus !== 'function') {
      showAllServers()
      return
    }

    const type = 'delayed'
    const duration = 200

    if (window.innerWidth < 1200) {
      showServer('server-three')
      new Vivus('server-three', {
        type: type,
        duration: duration
      })
    } else {
      showServer('server-one')
      new Vivus('server-one', {
        type: type,
        duration: duration
      }, () => {
        showServer('server-three')
        new Vivus('server-three', {
          type: type,
          duration: duration
        }, () => {
          showServer('server-two')
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
    let colors = ['red', 'yellow', 'green']
    serverIds.forEach((server, i) => {
      setTimeout(() => {
        let serverSvg = document.getElementById(server)
        if (!serverSvg || !serverSvg.contentDocument) {
          return
        }

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
setTimeout(finishServerArt, 14000)
