export default class Perfil {
  constructor (data) {
    this.nome = data.displayName
    this.cargo = data.jobTitle
    this.email = data.mail
    this.nucleo = data.department
    this.gerencia = data.officeLocation === null ? undefined : data.officeLocation.split('/')[0]
    this.diretoria = data.officeLocation === null ? undefined : data.officeLocation.split('/')[1]
  }
}
