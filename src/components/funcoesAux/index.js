import colors from 'vuetify/es5/util/colors'

export default {
  style_color: function (str) {
    var val = []
    str.toString().split(' ')
    .forEach(string => {
      val.push(string.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase()
      }).replace('-', '')
    )
    })
    return colors[val[0]][val.length > 1 ? val[1] : 'base']
  },
  capitaliza: function (str) {
    return str !== undefined || str !== null ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : ''
  },
  resumo: function (str, tam) {
    return str.length > tam ? str.substr(0, tam).concat('...') : str
  }
}
