class JTT808Body0800 {
    body = {
        "media_id": 1,
        "media_type": 1,
        "media_format": 2,
        "event": 2,
        "channel": 2
    }

    decode(data) {
        const media_id = data.readUIntBE(0, 4)
        const media_type = data.readUIntBE(4, 1)
        const media_format = data.readUIntBE(5, 1)
        const event = data.readUIntBE(6, 1)
        const channel = data.readUIntBE(7, 1)
        return {
            'media_id': media_id,
            'media_type': media_type,
            'media_format': media_format,
            'event': event,
            'channel': channel
        }
    }
    encode(params) {
        const { media_id, media_type, media_format, event, channel } = params
        const data = Buffer.alloc(8)
        data.writeUIntBE(media_id, 0, 4)
        data.writeUIntBE(media_type, 4, 1)
        data.writeUIntBE(media_format, 5, 1)
        data.writeUIntBE(event, 6, 1)
        data.writeUIntBE(channel, 7, 1)
        return data
    }
}

module.exports = JTT808Body0800
