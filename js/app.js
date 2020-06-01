//seleccionar el formulario en el cual se trabajará
const formulario = document.getElementById('generar-nombre').addEventListener('submit', cargarNombres);

//LLamado a AJAX y se imprimen los resultados.
function cargarNombres(e) {
    e.preventDefault();
   
    const origen = document.getElementById('origen'), // obtenemos el select de options
        origenSelected = origen.options[origen.selectedIndex].value;//se toma el valor elegido de las opciones 
        
    const genero = document.getElementById('genero'),
    generoSelected = genero.options[genero.selectedIndex].value;

    const numero = document.getElementById('numero').value;//Este nos devuelve cualquier value indicado por el input

    let url = '';
    url += 'https://randomuser.me/api/?';

    //solo si se elige un origen, se toma como condición para delimitar por región los nombres
    if(origenSelected !== '') {
        //se le agrega al url el filtro por lugar de origen, según las indicaciones del API
        url += `nat=${origenSelected}&`; //se finaliza con un & en caso de que se vaya a agregar otro filtro
    }
    if(generoSelected !== '') {
        url += `gender=${generoSelected}&`;
    }
    if(numero !== '') {
        url += `results=${numero}`;
    }

    //con FetchAPI
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            let htmlNombres = '';
                htmlNombres += `<ul class="lista">`;

            data.results.map(function(persona) { 
                htmlNombres += `<li>${persona.name.first} </li>`;
            });
            
            htmlNombres += `</ul>`;

            document.getElementById('resultado').innerHTML = htmlNombres;
        })
        .catch(() => console.log('there\'s an error'));
    /*AJAX AJAX AJAX AJAX AJAX AJAX
    
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if(this.status === 200){
            const personas = JSON.parse(this.responseText);
            let htmlNombres = `<h2> Nombres generados</h2>`;
            htmlNombres += `<ul class="lista">`;

            personas.results.map(function(persona) {
                htmlNombres += `
                    <li>${persona.name.first}</li>
                `;
            });

            htmlNombres += `</ul>`;

            const resultado = document.getElementById('resultado').innerHTML = htmlNombres;
        }
    };

    xhr.send();
*/

}


/*  const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://uinames.com', true);

    xhr.onload = function() {
        if(this.status === 200){
            console.log(this.responseText);
        }
    };

    xhr.send(); */