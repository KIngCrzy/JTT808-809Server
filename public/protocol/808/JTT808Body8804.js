class JTT808Body8804 {
    body = {
        "command": 1,
        "time": 60,
        "flag": 1,
        "sampling_rate": 3
    }

    decode(data) {
        return {
            'command': data.readUIntBE(0, 1),
            'time': data.readUIntBE(1, 2),
            'flag': data.readUIntBE(3, 1),
            'sampling_rate': data.readUIntBE(4, 1),
        }
    }

    encode(params) {
        const { command, time, flag, sampling_rate } = params
        const data = Buffer.alloc(5)
        data.writeUIntBE(command, 0, 1)
        data.writeUIntBE(time, 1, 2)
        data.writeUIntBE(flag, 3, 1)
        data.writeUIntBE(sampling_rate, 4, 1)
        return data
    }
}
module.exports = JTT808Body8804
