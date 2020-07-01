class JTT808Body8801 {
    body = {
        "channel_id": 1,
        "command": 10,
        "time": 1,
        "flag": 1,
        "resolution": "04",
        "quality": 1,
        "brightness": 128,
        "contrast": 64,
        "saturation": 64,
        "chroma": 128
    }

    decode(data) {
        return {
            'channel_id': data.readUIntBE(0, 1),
            'command': data.readUIntBE(1, 2),
            'time': data.readUIntBE(3, 2),
            'flag': data.readUIntBE(5, 1),
            'resolution': data.toString('hex', 6, 7),
            'quality': data.readUIntBE(7, 1),
            'brightness': data.readUIntBE(8, 1),
            'contrast': data.readUIntBE(9, 1),
            'saturation': data.readUIntBE(10, 1),
            'chroma': data.readUIntBE(11, 1),

        }
    }

    encode(params) {
        const {
            channel_id, command,
            time, flag, resolution, quality,
            brightness, contrast, saturation, chroma,
        } = params
        const resolution_buf = Buffer.from(resolution, 'hex')
        const data = Buffer.alloc(resolution_buf.length + 11)
        data.writeUInt8(channel_id, 0)
        data.writeUIntBE(command, 1, 2)
        data.writeUIntBE(time, 3, 2)
        data.writeUInt8(flag, 5)
        data.write(resolution, 6, resolution_buf.length, 'hex')
        data.writeUInt8(quality, 6 + resolution_buf.length)
        data.writeUInt8(brightness, 7 + resolution_buf.length)
        data.writeUInt8(contrast, 8 + resolution_buf.length)
        data.writeUInt8(saturation, 9 + resolution_buf.length)
        data.writeUInt8(chroma, 10 + resolution_buf.length)
        return data
    }
}
module.exports = JTT808Body8801
