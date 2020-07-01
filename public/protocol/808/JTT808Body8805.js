class JTT808Body8805 {

    body = {
        "media_id": 1,
        "delete_flag": 0
    }


    decode(data) {
        const media_id = data.readUIntBE(0, 4)
        const delete_flag = data.readUIntBE(4, 1)
        return {
            'media_id': media_id,
            'delete_flag': delete_flag
        }
    }
    encode(params) {
        const data = Buffer.alloc(5)
        const { media_id, delete_flag } = params
        data.writeUIntBE(media_id, 0, 4)
        data.writeUIntBE(delete_flag, 4, 1)
        return data
    }
}

module.exports = JTT808Body8805
