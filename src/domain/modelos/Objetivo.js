import Indicador from './Indicador'
import Diretriz from './Diretriz'

export default class Objetivo {
  constructor (data) {
    this.id = data.id
    this.cor = data.cor
    this.nome = data.nome
    this.responsaveis = data.responsaveis
    this.indicadorMacro = new Indicador(data.indicadorMacro)
    this.diretrizes = data.diretrizes.map(diretriz => new Diretriz(diretriz))
    this.selecionado = true
    this.selecionavel = true
  }

  onlyUnique (value, index, self) {
    return self.indexOf(value) === index
  }

  getNumberIniciativas () {
    return this.diretrizes.reduce(function (preval, diretriz) {
      return preval + diretriz.iniciativas.length
    }, 0)
  }

  getNumberProjetos () {
    return this.diretrizes.reduce(function (preval, diretriz) {
      return preval + diretriz.projetos.length
    }, 0)
  }

  getTotalAcoes () {
    return this.getNumberIniciativas() + this.getNumberProjetos()
  }

  getTotalAcoesPorGerencia (gerencia) {
    return this.objetivos
    .map(objetivo => objetivo.diretrizes)
    .reduce((preval, diretrizes) => preval.concat(diretrizes), [])
    .map(diretrizes => diretrizes.iniciativas)
    .reduce((preval, iniciativas) => preval.concat(iniciativas), [])
    .filter(iniciativa => (iniciativa.responsaveis.includes(gerencia) || iniciativa.intervenientes.includes(gerencia)))
    .length
  }

  getAllIniciativas () {
    return this.diretrizes.reduce(function (preval, diretriz) {
      preval = preval.concat(diretriz.iniciativas)
      return preval
    }, [])
  }

  getAllProjetos () {
    return this.diretrizes.reduce(function (preval, diretriz) {
      preval = preval.concat(diretriz.projetos)
      return preval
    }, [])
  }

  getAllAcao () {
    return this.getAllIniciativas().concat(this.getAllProjetos())
  }

  getTotalDiretivas () {
    return this.objetivos
    .map(objetivo => objetivo.diretrizes.length)
    .reduce((sum, diretrizes) => sum + diretrizes)
  }

  getTotalDiretivasPorGerencia (gerencia) {
    return this.objetivos
    .map(objetivo => objetivo.diretrizes)
    .reduce((preval, diretrizes) => preval.concat(diretrizes), [])
    .filter(diretriz => diretriz.responsaveis.includes(gerencia))
    .length
  }

  getListaAnos () {
    var anos = this.getAllIniciativas()
      .reduce((preval, iniciativa) => preval.concat(iniciativa.getDataFim().getFullYear()), [])
    // Buscar período do PET no json > Alteração prevista para a fase de aceleração
    return [...new Set(anos), 2021, 2022]
  }
}
