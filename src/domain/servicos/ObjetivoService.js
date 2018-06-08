import Objetivo from '../modelos/Objetivo'
import Vue from 'vue'

export default class ObjetivoService {
  constructor (resource) {
    this._resource = resource('dados_v2.json{/id}')
  }
  carregaJson () {
    Vue.http.get(`http://localhost:3001/pet`)
    .then(response => {
      console.log(response.data)
      this.pets = response.data
      return this.pets
    })
    .catch(e => {
      console.log(e)
      this.errors.push(e)
    })
  }

  lista () {
    return this._resource
    .query()
    .then(res => res.json())
    .then(dados => {
      this.objetivos = dados.map(dado => new Objetivo(dado))
      return this.objetivos
    }
    , err => {
      console.log(err)
      throw new Error('Não foi possível obter os Objetivos')
    })
  }
}
