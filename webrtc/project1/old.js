navigator.webkitGetUserMedia({ video: true, audio: false}, function (stream) {
var Peer = require('simple-peer')
var peer = new Peer({
	initiator: location.hash === '#init',
	trickle: false,
	stream: stream
})


peer.on('signal', function (data) {
	document.getElementById('yourId').value = JSON.stringify(data)

})


document.getElementById('connect').addEventListener('click', function () {
	var otherId = JSON.parse(document.getElementById('otherId').value)
	peer.signal(otherId)

 })

document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value
  document.getElementById('connect').addEventListener('click', function () {
        peer.send(yourMessage)
<!DOCTYPE html>

 })

peer.on('data', function (data) {
	document.getElementById('messages').textContent += data + '\n'
})

  peer.on('stream', function(stream) {
	var video = document.createElement('video')
	document.body.appendChild(video)

	video.src = window.URL.createObjectURL(stream)
<!DOCTYPE html>
	video.play()
})

}, function (err) {

   console.error(err)
})
