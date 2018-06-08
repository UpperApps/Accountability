import { StatusIniciativas } from './StatusIniciativas'
import Etapa from './etapa'

export default class Iniciativa {
  constructor (data) {
    this.id = data.id
    this.nome = data.nome
    this.conducao = data.conducao
    this.responsaveis = data.responsaveis
    this.intervenientes = data.intervenientes
    this.inicio = data.inicio
    this.fim = data.fim
    this.status = data.status
    this.arquivos = data.arquivos
    this.entregasAtb1 = data.entregasAtb1
    this.entregasAtb2 = data.entregasAtb2
    this.etapas = data.etapas.map(etapa => new Etapa(etapa))
  }

  getStatus () {
    return StatusIniciativas.find(status => status.id === this.status)
  }

  getDataFim () {
    return new Date(this.fim.split('/')[2], this.fim.split('/')[1] - 1, this.fim.split('/')[0])
  }
}
