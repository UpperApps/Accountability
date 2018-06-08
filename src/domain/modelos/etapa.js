export default class Etapa {
  constructor (data) {
    this.id = data.id
    this.descricao = data.descricao
    this.inicio = data.inicio
    this.fim = data.fim
    this.inicioT = this.getDataInicio()
    this.fimT = this.getDataFim()
    this.idT = this.getIdEtapa()
  }

  getIdEtapa () {
    return this.id.split('.').slice(-1)
  }

  getDataFim () {
    return new Date(this.fim.split('/')[2], this.fim.split('/')[1] - 1, this.fim.split('/')[0])
  }

  getDataInicio () {
    return new Date(this.inicio.split('/')[2], this.inicio.split('/')[1] - 1, this.inicio.split('/')[0])
  }
}
