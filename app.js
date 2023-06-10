//CREAR GRAFICO EN EL HTML
const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});

//COGIENDO VALORES DEL HTML EN VARIABLES
const intialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const Intereses = document.getElementById("compound");
const monthlyContributionInput = document.getElementById("monthlyContribution");

const message = document.getElementById("message");

//EL BOTON
const button = document.querySelector(".input-group button");
//EL EVENT LISTENER
button.addEventListener("click", calculateGrowth);

// CALCULO DEL INTERÉS COMPUESTO
const data = [];
const labels = [];

function calculateGrowth(e) {
  e.preventDefault(); // Evita el comportamiento predeterminado del evento submit del formulario
  data.length = 0; // Borra todos los elementos del array data
  labels.length = 0; // Borra todos los elementos del array labels
  let growth = 0; // Inicializa la variable growth en cero
  try {
    const initial = parseInt(intialAmount.value); // Obtiene el valor del input con id "intialAmount" y lo convierte a un número entero
    const period = parseInt(years.value); // Obtiene el valor del input con id "years" y lo convierte a un número entero
    const interest = parseInt(rates.value); // Obtiene el valor del input con id "rates" y lo convierte a un número entero
    const comp = parseInt(Intereses.value); // Obtiene el valor del input con id "Intereses" y lo convierte a un número entero
    const monthlyCon = parseInt(monthlyContributionInput.value); // Obtiene el valor del input con id "monthlyContributionInput" y lo convierte a un número entero
    const tabla = document.getElementById("tabla-resultados"); // Obtiene la tabla con id "tabla-resultados" y la asigna a la variable tabla
    tabla.innerHTML = "<tr><th>Año</th><th>Capital</th><th>Interés</th></tr>"; // Agrega el encabezado de la tabla al HTML

    for (let i = 1; i <= period; i++) {
      // Ciclo for que itera desde 1 hasta el valor del input con id "years"
      let final =
        initial * Math.pow(1 + interest / 100 / comp, comp * i) +
        monthlyCon *
          12 *
          (((Math.pow(1 + interest / 100 / comp, comp * i) - 1) /
            (interest / 100 / comp)) *
            (1 + interest / 100 / comp)); // Calcula el monto final con la fórmula del interés compuesto, incluyendo una contribución mensual

      Math.ceil(final); // Redondea hacia arriba el valor de final
      /* console.log(final); */ // Imprime el valor de final en la consola del navegador (comentado)
      data.push(toDecimal(final, 2)); // Agrega el valor de final redondeado a dos decimales al array data usando la función toDecimal
      labels.push("Año " + i); // Agrega una etiqueta con el año actual al array labels
      growth = toDecimal(final, 2); // Asigna el valor de final redondeado a dos decimales a la variable growth

      let interesAnual =
        initial * Math.pow(1 + interest / 100, i) +
        monthlyCon *
          12 *
          (((Math.pow(1 + interest / 100, i) - 1) / (interest / 100)) *
            (1 + interest / 100)) -
        (initial + monthlyCon * 12 * i); // Calcula el interés anual

      /* TABLA CON EL INTERES COMPUESTO  */

      tabla.innerHTML +=
        "<tr><td>" +
        i +
        "</td><td>" +
        final.toFixed(2) + "€" +
        "</td><td>" +
        interesAnual.toFixed(2)+ "€" +
        "</td></tr>";
    }
    // MENSAJE EL EL GRAFICO

    message.innerText = `Habrás generado ${growth}€ despues de ${period} años.`;
    drawGraph();
  } catch (error) {
    console.error(error);
  }
}

// NO DATA PLUGIN

//EL GRAFICO EN LINEAS
function drawGraph() {
  line.destroy();
  line = new Chart(context, {
    /* plugins: [ChartDataLabels], */
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Intereses",
          data,
          fill: true,
          backgroundColor: "#64bbe1",
          borderWidth: 3,
        },
      ],
    },
    /*     options: {
      plugins: {
        datalabels: {
          backgroundColor: 'blue'
        }
      }
    } */
  });
}

function toggleChartType() {
  if (line.config.type === "line") {
    line.destroy();
    line = new Chart(context, {
      /*       plugins: [ChartDataLabels],
       */
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Intereses",
            data,
            backgroundColor: "#64bbe1",
            borderWidth: 3,
          },
        ],
      },
    });
  } else {
    line.destroy();
    line = new Chart(context, {
      /*       plugins: [ChartDataLabels],
       */
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Intereses",
            data,
            fill: true,
            backgroundColor: "#64bbe1",
            borderWidth: 3,
          },
        ],
      },
    });
  }
}

function toDecimal(value, decimals) {
  return +value.toFixed(decimals);
}

/* DARK MODE */

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
