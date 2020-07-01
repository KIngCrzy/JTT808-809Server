class JTT808Body0901 {

    body = {
        "data": "1f8b08002f9ecb5d02ff4b49ca2a494dce00003b99d3d307000000"
    }

    decode(data) {
        return {
            'length': data.readUIntBE(0, 4),
            'data': data.toString('hex', 4),
        }
    }
    encode(params) {
        const { data } = params
        const concent = Buffer.from(data, 'hex')
        const result = Buffer.alloc(4)
        result.writeUIntBE(concent.length, 0, 4)
        return Buffer.concat([result, Buffer.from(data, 'hex')])
    }
}

module.exports = JTT808Body0901
