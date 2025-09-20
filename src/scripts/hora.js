function mostrarHora() {
  const today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  // Asegurarse de que los valores de horas, minutos y segundos tengan dos dígitos
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Formatear la hora como HH:MM:SS
  // y actualizar el contenido del elemento con la clase 'time'
  return `${hours}:${minutes}:${seconds}`;
}

setInterval(() => {
  let horaActual = mostrarHora();
  const timeElement = document.querySelector(".time");
  if (timeElement) {
    timeElement.textContent = horaActual;
  }
}, 1000);
