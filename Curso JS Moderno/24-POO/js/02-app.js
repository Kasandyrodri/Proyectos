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

const juan =new Cliente1('Juan',400);
console.log(juan)
console.log(juan.mostrarInformacion())
console.log(Cliente1.bienvenida())
//console.log(juan.bienvenida)
const Cliente2=class{
    constructor(nombre,saldo){
        this.nombre=nombre
        this.saldo=saldo
    }
}
const juan2 =new Cliente2();
console.log(juan2)