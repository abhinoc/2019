navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

if (navigator.mediaDevices.getUserMedia) {

navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {

    const signalhub = require('signalhub')
    var swarm = require('webrtc-swarm')

    const hub = signalhub('my-game', [
        'https://10.228.152.99:8080'
    ])
    
    var sw = swarm(hub,{
        stream: stream
    })


    const User = require('./user.js')
    const you = new User()
    you.addStream(stream)
    

    
    const users = {}
    sw.on('connect', function (peer, id) {
      if (!users[id]) {
        //console.log('total peers:', id)
        users[id] = new User()
        peer.on('data', function (data) {
            data = JSON.parse(data.toString())
          })
        console.log(peer)
        users[id].addStream(peer.stream)
      }
        //console.log('total peers:', sw.peers.length)
        //console.log(users)
    })

   //setInterval(function () {
   //const youString = JSON.stringify(you)

   // sw.peers.forEach(function (peer) {
    //  console.log(youString)
    //  peer.send(youString)
    //})
   //}, 100)

    sw.on('disconnect', function (peer, id) {
      console.log('disconnected from a peer:', id)
      console.log('total peers:', sw.peers.length)
    })
    
})

}


