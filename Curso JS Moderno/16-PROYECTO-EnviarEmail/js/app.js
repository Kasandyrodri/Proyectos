// Hola aqui comenzando con el email
//proyecto de simulador de envios de email
document.addEventListener('DOMContentLoaded',function(){


    const email={
        email:'',
        asunto:'',
        mensajes:''
    }
    //seleccionarmos los elemntows de la interfaz
    const inputEmail= document.querySelector('#email');
    const inputAsunto= document.querySelector('#asunto'); 
    const inputMensaje= document.querySelector('#mensaje');
    const formulario=document.querySelector('#formulario');
    const btnSubmit =document.querySelector('#formulario button[type="submit"]');

    //asignaremos eventos el blur se dispara cuando salgamos de ese campo
    inputEmail.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);

    function validar(e){
        console.log(e.target.parentElement)//este seria el DIV padre
        if (e.target.value.trim()===''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
            comprobarEmail();
            return;
        }
        if (e.target.value ==='email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        //asignamos valores
        email[e.target.name]=e.target.value.trim().toLowerCase();


    }
    function mostrarAlerta(mensaje,referencia){
        limpiarAlerta(referencia);
        //Comprueba si ya existe una alerta
        const alerta=referencia.querySelector('.bg-red-600')
        if (alerta){
            alerta.remove();
        }

        const error=document.createElement('P');
        error.textContent=mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center')
        //inyenctar el error al formulario
        referencia.appendChild(error);
    }
    function limpiarAlerta(referencia){
        const alerta =referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove();
        }
    }
    function validarEmail(email){
        const regex= /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado=regex.test(email);
        return resultado;
    }
    function comprobarEmail(){
        console.log(email)
        if (Object.values(email).includes(''))
        {

        }else{
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled=false;
        }
    }

    
});
