class Cliente{
    #nombre;
        constructor(nombre,saldo){
            this.#nombre=nombre
            this.saldo=saldo
        }
    mostrarInformacion(){
        return `Cliente ${this.#nombre} tu Saldo es: ${this.saldo}`
    }
    static bienvenida(){
        return 'Bienvenida al cajero'
    }
    setNombre(nombre){
        this.#nombre=nombre;
    }
    getNombre(){
        return this.#nombre
    }

}

const juan=new Cliente('Juan',200)
console.log(juan.nombre)
console.log(juan.mostrarInformacion())