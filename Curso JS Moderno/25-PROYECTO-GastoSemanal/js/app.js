//variables y selectores
const formulario=document.querySelector('#agregar-gasto');
const gastosListado=document.querySelector('#gastos ul');


//eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntaPresupuesto)
    document.addEventListener('submit',AgregarGasto)


}

//clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto=Number(presupuesto)
        this.restante=Number(presupuesto)
        this.gastos=[]
    }
    nuevoGasto(gasto){
        this.gastos=[...this.gastos,gasto]
        console.log(gastos)
    }
    calcularRestante(){
        const gastado=this.gastos.reduce((total,gasto)=>total+gasto.cantidad,0);
        this.restante=this.presupuesto-gastado;
    }
    eliminarGasto(id){
        this.gastos=this.gastos.filter(gasto=>gasto.id!==id)//aqui filtra atodos los que no sean con esa id que intenta borrar
        this.calcularRestante();
    }
}
class UI{
    
    insertarPresupuesto(cantidad){
        const{presupuesto,restante}=cantidad;
        document.querySelector('#total').textContent=presupuesto;
        document.querySelector('#restante').textContent=restante;

    }
    imprimirAlerta(mensaje,tipo){
        //creamos el dic para el mensaje
        const divMensaje=document.createElement('div')
        divMensaje.classList.add('text-center','alert')
        if (tipo==='error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }
        //mensaje de error
        divMensaje.textContent=mensaje;
        //insertamos en el html
        document.querySelector('.primario').insertBefore(divMensaje,formulario)

        //quitar del html luego de un tiempo
        setTimeout(()=>{
            divMensaje.remove();
        },3000);

        
    }
    mostrarGastos(gastos){

        this.limpiarHTML()
            //iterar sobre,los gastos
            gastos.forEach(gasto => {
                const {cantidad,nombre,id}=gasto
                //crear un li
                const nuevoGasto=document.createElement('li')
                nuevoGasto.className='list-group-item d-felx justify-content-between align-items-center';
                nuevoGasto.setAttribute('data-id',id);
                nuevoGasto.dataset.id=id;   //esto en la consola te mandara data-id o dat-xxx 
                console.log(nuevoGasto)
                //Agegar en el html
                nuevoGasto.innerHTML=`
                    ${nombre} <span class="badge badge-primary badge-pill">${cantidad}</span>
                `
                //boton para borrar el gasto
                const btnBorrar =document.createElement('button');
                btnBorrar.classList.add('btn','btn-danger','borrar-gasto')
                btnBorrar.innerHTML='Borrar &times'
                btnBorrar.onclick=()=>{
                    eliminarGasto(id);
                }
                nuevoGasto.appendChild(btnBorrar);

                //agregar al html
                gastosListado.appendChild(nuevoGasto)
                
            });
        }
        limpiarHTML(){
            while(gastosListado.firstChild){
                gastosListado.removeChild(gastosListado.firstChild)

            }
        }
        actualizarRestante(restante){
            document.querySelector('#restante').textContent=restante
        }
        comprobarPresupuesto(presupuestoObj){
            const{presupuesto,restante}=presupuestoObj;
            const restanteDiv=document.querySelector('.restante');
            //comprobar el 25%
            if((presupuesto/4>restante)){
                restanteDiv.classList.remove('alert-succes','alert-warning')
                restanteDiv.classList.add('alert-danger')
            }else if ((presupuesto/2)>restante){
                restanteDiv.classList.remove('alert-succes')
                restanteDiv.classList.add('alert-warning')
            }else{
                restanteDiv.classList.remove('alert-danger','alert-warning')
                restanteDiv.classList.add('alert-succes')
            }

            //si el total es menor a 0
            if (restante<=0){
                ui.imprimirAlerta('El presupuesto se ha agotado','error');
                formulario.querySelector('button[type="submit"]').disabled=true;
            }
        }
}

//creamos la clase  globalmente
const ui=new UI();
let presupuesto

//funciones
function preguntaPresupuesto(){
    const presupuestoUsuario=prompt('Ingresa el presupuesto');

    if(presupuestoUsuario==''||presupuestoUsuario==null||isNaN(presupuestoUsuario)||presupuestoUsuario<=0){
        window.location.reload();
    }
    //presuppuesto valido
    presupuesto=new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuestoUsuario);

}

//añade gasto
function AgregarGasto(e){
    e.preventDefault()
    //leer gasto desde el formulario
    const nombre=document.querySelector('#gasto').value;
    const cantidad =Number(document.querySelector('#cantidad').value);

    //validad
    if(nombre==='' ||cantidad===''){
        ui.imprimirAlerta("Todos los campos son obligatorios","error");
        return
    }else if(cantidad <=0||isNaN(cantidad)){
        ui.imprimirAlerta("La cantidad debe ser valida","error");
        return
    }

    //genrear un objeto con el gasto
    const gasto={nombre,cantidad,id:Date.now()}//nombre:nombre  cantidad :cantidad , id:date.now
    //añadimos un nuevo gasto
    presupuesto.nuevoGasto(gasto)
    //menaje de todo bien cuando agregammos en la lista de gastos un nuevo
    ui.imprimirAlerta('Gasto agregado correctamente')

    //impirmir los gastos
    const {gastos,restante}=presupuesto; //estoy extrayendo el restante del presupuesto
    ui.mostrarGastos(gastos)
    ui.actualizarRestante(restante)
    ui.comprobarPresupuesto(presupuesto)
    //para resetear el formulario
    formulario.reset();
    
}
function eliminarGasto(id){
    presupuesto.eliminarGasto(id)
    //elimina las clases del html
    const {gastos,restante}=presupuesto
    ui.mostrarGastos(gastos)
    ui.actualizarRestante(restante)
    ui.comprobarPresupuesto(presupuesto)
}