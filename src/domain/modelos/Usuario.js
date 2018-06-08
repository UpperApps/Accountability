export default class Usuario {
  constructor (data) {
    this.nome = data.nome
    this.chave = data.chave
    this.gerencia = data._gerencia
  }
}
