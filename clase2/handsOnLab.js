class TicketManager {
  #precioBaseDeGanancia = 1.15; // variable privada
  constructor() {
    this.eventos = [];
  }
  getEventos = () => {
    return this.eventos;
  };
  agregarEvento = (
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toLocaleDateString()
  ) => {
    const evento = {
      nombre,
      lugar,
      precio: precio * this.#precioBaseDeGanancia,
      capacidad,
      fecha,
      participantes: [],
    };
    if (this.eventos.length === 0) {
      evento.id = 1;
    } else {
      evento.id = this.eventos[this.eventos.length - 1].id + 1;
    }
    this.eventos.push(evento);
  };
}

// Se creará una clase que permitirá llevar una gestión completa de usuarios que deseen acceder a dichos eventos.

// 1) Definir clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío
// 2) La clase debe contar con una variable privada “precioBaseDeGanancia”, la cual añadirá un costo adicional al precio de cada evento.
// 3) Debe contar con el método “getEventos” El cual mostrará los eventos guardados.
// 4) Debe contar con el método “agregarEvento” El cual recibirá los siguientes parámetros:
// nombre
// lugar
// precio (deberá agregarse un 0.15 del valor original)
// capacidad (50 por defecto)
// fecha (hoy por defecto)
// El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.
