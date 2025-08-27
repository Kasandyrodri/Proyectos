//estaremos creando nuestro proyecto
//variabels
const carrito=document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
const listaCursos=document.querySelector('#lista-cursos');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click',agregarCurso);
    //elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click',() =>{
        articulosCarrito=[]
        limpiarHTML();
    })

}

//funciones
function agregarCurso(e){
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arrgelo de articuloCarrito por el data-id
        articulosCarrito=articulosCarrito.filter(curso => curso.id !==cursoId);

        carritoHTML(); //iterar sobre el carrito y mostrar en e html
    }
}

//lee el contendio del html y extrae la inf del curso
function leerDatosCurso(curso){
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,//de la clase precio el span
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //revisa si un elemento ua existe en el carrito
    const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id);
    if (existe){
        const cursos=articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;
            } else{
                return curso;
            }
            
        });
        articulosCarrito=[...cursos];
    }
    else{
        articulosCarrito=[...articulosCarrito,infoCurso]
    }
    //agrega elementos al arreglo de cariito
    
    carritoHTML();
}


//muestra el carrito de compras en el htrml
function carritoHTML(){

    //limipar el html previo
    limpiarHTML();
    //Recorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad,id}=curso;
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>${imagen}</td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //Agrega el html del carrito en el body
        contenedorCarrito.appendChild(row)
    })
}
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML='';
    //Una forma mas rapida
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}