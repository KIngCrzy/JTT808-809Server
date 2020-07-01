const JTT808Body8601 = require('./JTT808Body8601')
const JTT808body8601 = new JTT808Body8601()
class JTT808Body8603 {
    body = {
        "list": [
            0,
            1
        ]
    }
    decode(data) {
        return JTT808body8601.decode(data)

    }

    encode(params) {
        return JTT808body8601.encode(params)
    }
}
module.exports = JTT808Body8603
