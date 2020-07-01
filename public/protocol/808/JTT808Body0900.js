class JTT808Body0900 {
    body = {
        "type": "41",
        "content": "000200000152520585000a1e97"
    }

    decode(data) {
        return {
            'type': data.readUIntBE(0, 1),
            'content': data.toString('hex', 1)
        }
    }
    encode(params) {
        const { type, content } = params
        const data = Buffer.alloc(1)
        data.writeUIntBE(type, 0, 1)
        const content_buf = Buffer.from(content, 'hex')
        return Buffer.concat([data, content_buf])
    }
}

module.exports = JTT808Body0900
