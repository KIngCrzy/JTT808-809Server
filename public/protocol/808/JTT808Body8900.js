class JTT808Body8900 {

    body = {
        "type": "41",
        "content": "000200000152520585000a1e97"
    }

    decode(data) {
        return {
            'type': data.toString('hex', 0, 1),
            'content': data.toString('hex', 1)
        }
    }

    encode(params) {
        const { type, content } = params
        const content_buf = Buffer.from(content, 'hex')
        const type_buf = Buffer.from(type, 'hex')
        const data = Buffer.concat([type_buf, content_buf])
        return data
    }
}

module.exports = JTT808Body8900