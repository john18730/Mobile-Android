export class Contato {
  
  constructor() {
}
 // constructor(id?: number, nome?: string, email?: string) {
 //   this.id = id;
 //   this.nome = nome;
 //   this.email = email;
 // }
 
 public id: number;
 public atributoJoao: string;    
 public email: string;
 public atributoIdade: string;      
 
 toString() {
   return this.id+''+this.atributoJoao+''+this.email + '' + this.atributoIdade;
 }
}