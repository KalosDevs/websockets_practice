const socket = io();

const circle = document.querySelector('#circle')

// creamos una función que almacene las posiciones
const drawCircle = (position) => {
  circle.style.top = position.top
  circle.style.left = position.left
}

// mover circulo
const drag = (e) => {
  // guardamos la posición en un objeto
  const position = {
    top: e.clientY + 'px',
    left: e.clientX + 'px'
  }

  // dibujamos el circulo individualmente
  drawCircle(position)

  // enviamos la posición al servidor
  socket.emit('circle-position', position)
}

// se mueve cuando el mouse este presionado
document.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', drag)
})

// se deja de mover cuando se levante el mouse
document.addEventListener('mouseup', (e) => {
  document.removeEventListener('mousemove', drag)
})

// recibimos la posición del servidor y la usamos
socket.on('move-circle', (position) => {
  drawCircle(position)
})