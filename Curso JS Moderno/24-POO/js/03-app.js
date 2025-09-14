class Cliente1{
        constructor(nombre,saldo){
            this.nombre=nombre
            this.saldo=saldo
        }
    mostrarInformacion(){
        return `Cliente ${this.nombre} tu Saldo es: ${this.saldo}`
    }
    static bienvenida(){
        return 'Bienvenida al cajero'
    }

}

//console.log(juan)
//console.log(juan.mostrarInformacion())
//console.log(Cliente1.bienvenida())
//console.log(juan.bienvenida)
//Empresa para heredar 
class Empresa extends Cliente1{
    constructor(nombre,saldo,telefono,categoria){
        super(nombre,saldo);
        this.telefono=telefono
        this.categoria=categoria
    }
    static bienvenida(){//reescribir un codigo
        return 'Bienvenida al cajero de Empresas'
    }

}
const juan =new Cliente1('Juan',400);
const empresa =new Empresa('Codigo con juan',500,212345,"Aprendizaje en linea");
console.log(empresa);
console.log(empresa.mostrarInformacion())
console.log(Cliente1.bienvenida())
console.log(Empresa.bienvenida())