//selectores
const pacienteInput=document.querySelector('#mascota')
const propietarioInput=document.querySelector('#propietario')
const telefonoInput=document.querySelector('#telefono')
const fechaInput=document.querySelector('#fecha')
const sintomasInput=document.querySelector('#sintomas')

const formulario=document.querySelector('#nueva-cita')
const formularioInput = document.querySelector('#nueva-cita [type="submit"]')
const contenedorCitas=document.querySelector('#citas')




//objeto de cita
const citaObj={
    id:generarId(),
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    sintomas:''
}

//eventListeners-eventos
pacienteInput.addEventListener('change',datosCita)
propietarioInput.addEventListener('change',datosCita)
telefonoInput.addEventListener('change',datosCita)
fechaInput.addEventListener('change',datosCita)
sintomasInput.addEventListener('change',datosCita)

formulario.addEventListener('submit',submitCita)
let editando=false

/*pacienteInput.addEventListener('change',(e)=>{
    //citaObj.paciente=e.target.value
    citaObj[e.target.name]=e.target.value //esto funciona si es elcaso de que el name es lo mismo donde queremosincruirlo

})//change o input hacen lo mismo*/


//Clases
class notificacion{
    constructor({texto,tipo}){
        this.texto=texto
        this.tipo=tipo
        this.mostrar()
    }
    mostrar(){
        //crear la notificaion
        const alerta=document.createElement('div')
        alerta.classList.add('text-center','w-100','p-3','text-white','my-3','alert',
        'text-uppercase','fw-bold','small','alert')
        
        //eliminar alertas duplicadas
        const alertaPrevia=document.querySelector('.alert')
        /*if(alertaPrevia){
            alertaPrevia.remove()
        }*/
        alertaPrevia?.remove() //esto es gracias al encademamineto -exciste el elemnto


        //si es de tipo error agrega una clase
        this.tipo==='error'?alerta.classList.add('alert-danger'):alerta.classList.add('alert-success')
        //mensaje de error
        alerta.textContent=this.texto

        //insertar en el dom
        formulario.parentElement.insertBefore(alerta,formulario)

        //quitar despues de 5 seg
        setTimeout(()=>{
            alerta.remove()
        },3000);
    }
}

class AdminCitas{
    constructor(){
        this.citas=[]
    }
    agregar(cita){
        this.citas=[...this.citas,cita]
        this.mostrar()
    }

    editar(citaActualizada){
        this.citas=this.citas.map(cita=>cita.id===citaActualizada.id?citaActualizada:cita)
        this.mostrar()
    }
    eliminar(id){
        this.citas=this.citas.filter(cita=>cita.id!==id)
        this.mostrar()
    }
    mostrar(){
        //limipar el html
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)

        }
        //si hy citas
        if(this.citas.length===0){
            contenedorCitas.innerHTML= `<p>No hay registros</p>`
            return
        }

        //generando las citas
        this.citas.forEach(cita=>{
            const divCita=document.createElement('div')
            divCita.classList.add('mx-5','my-5','bg-white','shadow','px-5','py-5','rounded-3')    
            const paciente=document.createElement('p')
            paciente.classList.add('fw-normal','mb-3','text-secondary','text-lowercase')
            paciente.innerHTML = `<span class="fw-bold text-uppercase">Paciente: </span> ${cita.mascota}`

            const propietario=document.createElement('p')
            propietario.classList.add('fw-normal','mb-3','text-secondary','text-lowercase')
            propietario.innerHTML = `<span class="fw-bold text-uppercase">Propietario: </span> ${cita.propietario}`

            const telefono=document.createElement('p')
            telefono.classList.add('fw-normal','mb-3','text-secondary','text-lowercase')
            telefono.innerHTML = `<span class="fw-bold text-uppercase">Telefono: </span> ${cita.telefono}`

            const fecha=document.createElement('p')
            fecha.classList.add('fw-normal','mb-3','text-secondary','text-lowercase')
            fecha.innerHTML = `<span class="fw-bold text-uppercase">Fecha: </span> ${cita.fecha}`

            const sintomas=document.createElement('p')
            sintomas.classList.add('fw-normal','mb-3','text-secondary','text-lowercase')
            sintomas.innerHTML = `<span class="fw-bold text-uppercase">Sintomas: </span> ${cita.sintomas}`


            //botones de eliminar y editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-primary','fw-bold','text-uppercase','d-flex','align-items-center','gap-2','btn-editar');
            btnEditar.innerHTML = `Editar <svg fill="none" class="bi" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536-2.036 5.036a2.5 2.5 0 01-3.536 0L6.5 21.036 3 17.5l6.732-6.732a2.5 2.5 0 013.536 0z"/></svg>`;
            const clone=structuredClone(cita)
            btnEditar.onclick=() =>cargarEdicion(clone)  //este es un event handler

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','fw-bold','text-uppercase','d-flex','align-items-center','gap-2');
            btnEliminar.innerHTML = `Eliminar <svg fill="none" class="bi" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2z"/></svg>`;

            btnEliminar.onclick=()=>this.eliminar(cita.id)
            const contenedorBotones=document.createElement('div')
            contenedorBotones.classList.add('flex','justify-between','mt-10')

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);



            //nyectar al html
            divCita.appendChild(paciente)
            divCita.appendChild(propietario)
            divCita.appendChild(telefono)
            divCita.appendChild(fecha)
            divCita.appendChild(sintomas)
            divCita.appendChild(contenedorBotones)
            contenedorCitas.appendChild(divCita)
    })
}
}


//funciones
//agregando los datos en el sistema todo lo de los campos del front 
function datosCita(e){
    citaObj[e.target.name]=e.target.value
}
const citas=new AdminCitas()


function submitCita (e){
    e.preventDefault()
    //exiasten 2 formas pñara validar el form
    /*const{mascota,propietario,telefono,fecha,sintomas}=citaObj;
    if(mascota.trim()===''||propietario.trim()===''||telefono.trim()===''||fecha.trim()===''||sintomas.trim()===''){
        console.log('Todos los campos son obligatorios')
        return;
    }*/
   //otro metodo object.value
    if(Object.values(citaObj).some(valor=>valor.trim()==='')){  //some para ver por lo moe salguno se cumpa
        new notificacion({
            texto:'Todos los campos son obligatorios',
            tipo:'error'

        })
        return;
    }
    if(editando){citas.editar({...citaObj})
    new notificacion({
            texto:'Guardado correctamente',
            tipo:'exito'

        })
    }
    
    else{console.log('registro nuevo')
        citas.agregar({...citaObj})//lo que hacemos es que antes de almacernarlos añadimos una copia
            new notificacion({
            texto:'Paciente registrado',
            tipo:'exito'

        })
    }

    formulario.reset()
    reiniciarObjetoCita()
    formularioInput.value='Registrar Paciente'
    editando=false;

    

        

}
function reiniciarObjetoCita(){
    //reiniciando el objeto
    /*citaObj.mascota=''
    citaObj.propietario=''
    citaObj.telefono=''
    citaObj.fecha=''
    citaObj.sintomas=''*/

    //tambien hay otra forma ObjectAsign
    Object.assign(citaObj,{ 
        id:generarId(),
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    sintomas:''

    })
    
}
function generarId(){
    return Math.random().toString(36).substring(2)+Date.now()
}

function cargarEdicion(cita){

    Object.assign(citaObj,cita)

    pacienteInput.value=cita.mascota
    propietarioInput.value=cita.propietario
    telefonoInput.value=cita.telefono
    fechaInput.value=cita.fecha
    sintomasInput.value=cita.sintomas

    editando=true
    formularioInput.value='Guardar cambios'
}

