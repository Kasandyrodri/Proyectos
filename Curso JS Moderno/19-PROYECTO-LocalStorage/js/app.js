//Vamos a crear las variables
const formulario=document.querySelector('#formulario');
const listaTweets=document.querySelector('#lista-tweets')
let tweets=[];

//Evenet Listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit',agregarTweet);

    //cuando el docs esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets=JSON.parse(localStorage.getItem('tweets')) ||[];
        crearHTML();
    });

}



// funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet =document.querySelector('#tweet').value;
    if(tweet ===''){
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }

    const tweetObj={
        id:Date.now(),
        tweet:tweet
    }

    //añadir al lado de los tweetes
    tweets=[...tweets,tweetObj];
    //una vez agregado creamos el html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError=document.createElement('p');
    mensajeError.textContent=error;
    mensajeError.classList.add('error');

    //Insertarlo ene l contenido
    const contenido=document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos
    setTimeout(()=>{
        mensajeError.remove();
    },3000)
    

}
function crearHTML(){

    limpiarHTML();
    if(tweets.length>0){
        tweets.forEach(tweet => {
            //agregar un boton de eliminar
            const btnEliminar=document.createElement('a')
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText='X';
            //Añadir la funcion de eliminar
            btnEliminar.onClick= ()=>{
                borrarTweet();
            }

            //crear el html
            const li=document.createElement('li')
            li.innerText=tweet.tweet;

            //insertarlo en el html
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//elimina un tweet
function borrarTweet(id){

    tweets=tweets.filter(tweet=>tweet.id !==id)
    console.log(tweets);
}
//agrega los tweets actuales a los storage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets))

}