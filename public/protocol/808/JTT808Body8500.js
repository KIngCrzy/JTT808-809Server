
class JTT808Body8500 {

    body = {
        "door_locked": 1
    }

    decode(data) {
        return {
            'door_locked': data.readUIntBE(0, 1),
        }
    }

    encode(params) {
        const { door_locked } = params
        const data = Buffer.alloc(1)
        let control_flag = 0b00000000
        if (door_locked) {
            control_flag |= 0b00000001
        }
        data.writeUInt8(control_flag, 0)
        return data
    }
}
module.exports = JTT808Body8500
