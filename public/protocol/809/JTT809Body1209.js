const iconv = require('iconv-lite')
const JTT809body1207 = require('./JTT809Body1207')
const JTT809Body1207 = new JTT809body1207()

class JTT809Body1209 {

    decode(data) {
        return JTT809Body1207.decode(data)
    }

    encode(params) {

        return JTT809Body1207.encode(params)
    }

}
module.exports = JTT809Body1209
