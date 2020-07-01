class JTT808Body0108 {
    body = {
        "upgrade_type": 0,
        "upgrade_result": 0
    }

    decode(data) {
        return {
            'upgrade_type': data[0],
            'upgrade_result': data[1]
        }
    }
    encode(params) {
        const { upgrade_type, upgrade_result } = params
        const data = Buffer.alloc(2)
        data.writeUIntBE(upgrade_type, 0, 1)
        data.writeUIntBE(upgrade_result, 1, 1)
        return data
    }
}

module.exports = JTT808Body0108
