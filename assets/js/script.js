const invitados = [
  { id: Date.now() + 1, nombre: "Barrer piso", confirmado: false },
  { id: Date.now() + 2, nombre: "Pasear al perro", confirmado: false },
  { id: Date.now() + 3, nombre: "Cocinar almuerzo", confirmado: false },
  { id: Date.now() + 4, nombre: "Ir al gym", confirmado: false },
];
let idActual = 1;

const agregarElemento = function (posicion) {
  const nuevoNombre = document.querySelector("#valor").value;

  const objetoInvitado = {
    id: Date.now(),
    nombre: nuevoNombre,
    confirmado: false,
  };

  if (posicion === "Inicio") invitados.unshift(objetoInvitado);
  else if (posicion === "Final") invitados.push(objetoInvitado);

  idActual++;
  renderizarDatos();
};

const eliminarElemento = function (posicion) {
  if (posicion === "Inicio") invitados.shift();
  else if (posicion === "Final") invitados.pop();
  renderizarDatos();
};

const eliminarElementoPorNombre = function (nombre) {
  const posicion = invitados.findIndex((elemento) => {
    if (elemento.nombre === nombre) return true;
    return false;
  });

  invitados.splice(posicion, 1);

  renderizarDatos();
};

const actualizarConfirmacion = function (id) {
  const posicion = invitados.findIndex((obj) => {
    if (id == obj.id) {
      return true;
    }
    return false;
  });

  invitados[posicion].confirmado = !invitados[posicion].confirmado;
  renderizarDatos();
};


const renderizarDatos = function () {
    const lista = document.querySelector("#invitados");
    const totalRealizadas = document.querySelector("#checked");
    const total = document.querySelector("#total");
    let totalRealizas = 0;

  let html = "";

  
  for (const invitado of invitados) {
    let chequeado = invitado.confirmado ? "checked" : "";
    if (invitado.confirmado) {
        totalRealizas++;
    }
    let ticket = "";
    if (invitado.tieneTicket) {
        ticket = "con-ticket";
    }
    
    let claseChequeado = "";
    if (invitado.confirmado) {
        claseChequeado = "confirmado";
    }
    

    html += `
    <div class="lineainvitado ${ticket} ${claseChequeado}">


        <div class="idInvitado">
            ${invitado.id}
        </div>

        <div class="nombreInvitado">
            <strong>${invitado.nombre}</strong>
        </div>
        <div class="botonestareas">
        <div class"statusInvitado">
            <input onclick="actualizarConfirmacion(${invitado.id})" type="checkbox" ${chequeado}>
        </div>
        <div>
            <button class="btn" onclick="eliminarElementoPorNombre('${invitado.nombre}')">X</button>
        </div>
        </div>
        </div>
        `;
  }

  
  totalRealizadas.textContent = `Tareas realizadas: ${totalRealizas}`;
  total.textContent = `Total tareas: ${invitados.length}`;
  lista.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", renderizarDatos);
