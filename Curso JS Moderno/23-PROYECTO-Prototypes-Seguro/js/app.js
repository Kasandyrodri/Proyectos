//proyecto de cotizacion de seguto de un auto
//constructores
function Seguro(marca,year,tipo){
    this.marca=marca
    this.year=year
    this.tipo=tipo
    
}
//realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro=function(){
    /*
        1=Americano=1.15
    */ 
   let cantidad;
   const base=2000;
   switch(this.marca){
        case '1':
            cantidad=base*1.15;
            break;
        case '2':
            cantidad=base*1.05;
            break;
        case '3': 
            cantidad=base*1.35;
            break;   
        default:
            break;
   }

   //leer el año
   const diferencia=new Date().getFullYear()-this.year;
   //cada año q la diferecnia es mayou el costo se reducira 3%
   cantidad-=((diferencia*3)*cantidad)/100;
   
   if (this.tipo==='basico'){
    cantidad*=1.30;
   }else{
    cantidad*=1.35;
   }

   console.log(cantidad);

}

function UI(){}

//llena las opciones de los años
UI.prototype.llenarOpciones=()=>{
    const max=new Date().getFullYear(),
        min=max-20;

    const selectYear=document.querySelector('#year');
    for(let i=max;i>min;i--){
        let option=document.createElement('option')
        option.value=i;
        option.textContent=i;
        selectYear.appendChild(option);
    }


}

//muestra alertas en pantalla
UI.prototype.mostrarMensaje=(mensaje,tipo)=>{
    const div=document.createElement('div')

    if (tipo==='error'){
        div.classList.add('error')
    }
    else{
        div.classList.add('correcto')
    }
    div.classList.add('mensaje','mt-10')
    div.textContent=mensaje;

    //insertar en el html
    const formulario=document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(()=>{
        div.remove();
    },3000)
}

UI.prototype.mostrarResultado=(seguro,total)=>{
    //crear el resultado
    const {marca,year,tiop}=seguro;
    let textmarca;
     switch(seguro.marca) {
          case '1':
               textmarca = 'Americano';
               break;
          case '2':
               textmarca = 'Asiatico';
               break;
          case '3':
               textmarca = 'Europeo';
               break;
     }


    const div=document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML=`
    <p class='header'>Tu Resumen: </p>
    <p class="font-bold">Marca: <span class="font-normal"> ${textmarca} </span> </p>
    <p class="font-bold">Año: <span class="font-normal"> ${year} </span> </p>
    <p class="font-bold">Tipo: <span class="font-normal"> ${tipo} </span> </p>
    <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
    `;
    const resultadoDiv=document.querySelector('#resultado');
    resultadoDiv.appendChild(div);
    //mostrar el spinner
    const spinner=document.querySelector('#cargando')
    spinner.style.display='block'
    setTimeout(()=>{
        spinner.style.display='none';
        resultadoDiv.appendChild(div);
    },3000)


}
//instanciaremos ui
const ui=new UI();



document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones();   //llena el select de los años
})


eventListeners();
function eventListeners(){
    const formulario=document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //leer la marca seelccionada
    const marca=document.querySelector('#marca').value;
    const year=document.querySelector('#year').value;
    const tipo=document.querySelector('input[name="tipo"]:checked').value;
    if (marca===''||year===''||tipo===''){
        ui.mostrarMensaje('Todos los campos son obligatorios','error')
        return
    }
    ui.mostrarMensaje('Cotizando...','exito')

    //instanciar el seguro
    const seguro=new Seguro(marca,year,tipo);
    const total=seguro.cotizarSeguro();

    //utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro,total);
}
