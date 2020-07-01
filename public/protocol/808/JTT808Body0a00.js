class JTT808Body0a00 {

    body = {
        e: 128,
        n: 455,
    }

    decode(data) {
        return {
            'e': data.readUIntBE(0, 4),
            'n': Number(data.readBigUInt64BE(4, 128))
        }
    }
    encode(params) {
        console.log(params);

        const { e, n } = params
        const data = Buffer.alloc(132)
        data.writeUIntBE(e, 0, 4)

        data.writeBigUInt64BE(BigInt(n), 4, 128)
        return data
    }
}

module.exports = JTT808Body0a00
