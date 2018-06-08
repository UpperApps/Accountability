import authentication from '@/domain/servicos/autenticacao'
import Perfil from '@/domain/modelos/Perfil'
import Vue from 'vue'

function montaHeader (token) {
  const headers = { Authorization: 'Bearer ' + token }
  return { headers }
}

export default class GraphService {
  constructor () {
    this.graphUrl = 'https://graph.microsoft.com'
  }

  getPerfil () {
    return authentication.acquireToken(this.graphUrl).then(token => {
      return Vue.http.get(this.graphUrl + '/v1.0/me?$select=displayName,department,officeLocation,jobTitle,mail', montaHeader(token))
      .then(response => response.json())
      .then(dados => {
        return new Perfil(dados)
      })
    })
  }
  getPerfilFoto () {
    return authentication.acquireToken(this.graphUrl).then(token => {
      return Vue.http.get(this.graphUrl + '/beta/me/photos/48x48/$value',
        { headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'image/jpeg'
        },
          responseType: 'blob'
        })
        .then(dados => {
          return dados
        }
        )
    })
  }

  getListaUsuarios (grupoId) {
    return authentication.acquireToken(this.graphUrl).then(token => {
      return fetch(this.graphUrl + '/beta/groups/' + grupoId + '/users', montaHeader(token))
        .then(response => response.json())
    })
  }

  getFoto (email) {
    return authentication.acquireToken(this.graphUrl).then(token => {
      return Vue.http.get(this.graphUrl + '/beta/users/' + email + '/photos/48x48/$value',
        { headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'image/jpeg'
        },
          responseType: 'blob'
        })
      .then(dados => {
        return dados
      }
      )
    })
  }
}
