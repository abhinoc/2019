module.exports = User

function User (data) {
  data = data || {}
  this.element = document.createElement('video')
  document.body.appendChild(this.element)
}


User.prototype.addStream = function (stream) {
  this.element.srcObject = stream
  this.element.play()
}




