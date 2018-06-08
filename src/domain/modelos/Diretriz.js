import Indicador from './Indicador'
import Iniciativa from './Iniciativa'
import Projeto from './Projeto'

export default class Diretriz {
  constructor (data) {
    this.id = data.id
    this.nome = data.nome
    this.responsaveis = data.responsaveis
    this.indicadores = data.indicadores.map(indicador => new Indicador(indicador))
    this.iniciativas = data.iniciativas.map(iniciativa => new Iniciativa(iniciativa))
    this.projetos = data.projetos.map(projeto => new Projeto(projeto))
  }
}
