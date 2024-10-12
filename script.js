//const textArea = document.querySelector('#text-1');

navigator.serviceWorker.register('sw.js');

let container = document.querySelector('.collection');

const btnStart = document.getElementById('btnStart');

const btnStop = document.getElementById('btnStop');

const textArea = document.getElementById('textArea');

let lista = [];



var recognition = new webkitSpeechRecognition();



recognition.continuous = true;

recognition.lang = 'es-Es';

recognition.interimResult = false;



btnStart.addEventListener('click', () => {

    recognition.start();

    

});

btnStop.addEventListener('click', () => {

    recognition.abort();

});



recognition.onresult = (event)=>{

    const texto = event.results[event.results.length - 1][0].transcript;

    console.log(texto)

    //textArea.value = texto;



    btnSave(texto)



}



/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */

function btnSave(texto){

    let nota = textArea.value;

    let fecha = new Date().toLocaleString();

    lista.push({

      nota: texto,

      fecha: fecha

    })

    guardarNotas(lista);

    textArea.value = '';

  }

  

  /* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */

  function guardarNotas(array){

    localStorage.setItem('notas', JSON.stringify(array)  );

    renderizarNotas(array)

  }

  

  /* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */

  function leerNotas(){

    let array = JSON.parse(  localStorage.getItem('notas') );

    if( array){

      return array;

    } else {

      return [];

  

    }

  }

  

  /* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */

  function renderizarNotas(array){

    console.log(array)

    container.innerHTML = '';

    array.forEach(item => {

      container.innerHTML += `<li class="collection-item">

                              <div>${item.nota}

                                <a href="#!" class="secondary-content">${item.fecha}</a>

                              </div>

                            </li>`;

    });

}
