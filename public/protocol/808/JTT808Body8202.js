class JTT808Body8202 {

    body = {
        "time_interval": 1,
        "validity_period": 600
    }

    decode(data) {
        return {
            'time_interval': data.readUIntBE(0, 2),
            'validity_period': data.readUIntBE(2, 4),
        }
    }

    encode(params) {
        const { time_interval, validity_period } = params
        const data = Buffer.alloc(6)
        data.writeUIntBE(time_interval, 0, 2)
        data.writeUIntBE(validity_period, 2, 4)
        return data
    }
}
module.exports = JTT808Body8202
