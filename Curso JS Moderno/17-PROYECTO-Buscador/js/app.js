//aqui realizaremos el buscador hecho por nosotros
const marca=document.querySelector('#marca');
const minimo=document.querySelector('#minimo');
const maximo=document.querySelector('#maximo');
const puertas=document.querySelector('#puertas');
const transmision=document.querySelector('#transmision');
const color=document.querySelector('#color');
const resultado=document.querySelector('#resultado');
const year=document.querySelector('#year');


const max=new Date().getFullYear();
const min = max-10;

//Generar un onjeto con la busquieda
const datosBusqueda={
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:''

}

//eventos
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos();//muestra los automoviles al cargar 

    //Llenar las opciones de los años
    llenarSelect();


})
// Event listener para los select de busqueda
marca.addEventListener('change',e=>{
    datosBusqueda.marca=e.target.value;
    filtrarMarca();
})
year.addEventListener('change',e=>{
    datosBusqueda.year=e.target.value;
    filtrarYear();
    
})
minimo.addEventListener('change',e=>{
    datosBusqueda.minimo=e.target.value;
    
})
maximo.addEventListener('change',e=>{
    datosBusqueda.maximo=e.target.value;
    
})
puertas.addEventListener('change',e=>{
    datosBusqueda.puertas=e.target.value;
    
})
transmision.addEventListener('change',e=>{
    datosBusqueda.transmision=e.target.value;
    
})
color.addEventListener('change',e=>{
    datosBusqueda.color=e.target.value;
    console.log(datosBusqueda)
})


//funciones
function mostrarAutos(){
    autos.forEach(auto =>{

        const{marca,modelo,year,puertas,transmision,precio,color}=auto;
        const autoHTML=document.createElement('p');
        autoHTML.textContent=`
            ${marca} ${modelo} - ${year} -${puertas} Puertas -Transmision: ${transmision}
            - ${precio}- ${color}
            `
        //insertar en el html
        resultado.appendChild(autoHTML)


    })
}
function llenarSelect(){
    for (let i =max;i>=min;i--){
        const opcion=document.createElement('option');
        opcion.value=i;
        opcion.textContent=i
        year.appendChild(opcion);//agreg las opciones de año a select

    }
}
//Fucnion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado=autos.filter(filtrarMarca).filter(filtrarYear)
    console.log(resultado);
}
function filtrarMarca(auto){
    const {marca}=datosBusqueda;
    if(marca){
        return auto.marca===datosBusqueda.marca;
    }
    return auto;
}
function filtrarYear(auto){
    const {year}=datosBusqueda;
    if(year){
        return auto.year===parseInt(year);
    }
    return auto;
}