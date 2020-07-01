const iconv = require('iconv-lite')

class JTT808Body8300 {
    body = {
        "flag": {
            // "emergency": true,
            // "monitor_display": true,
            // "tts_broadcast": true,
            // "screen_display": false,
            // "can_error": false

            "emergency": 1,
            "monitor_display": 1,
            "tts_broadcast": 0,
            "screen_display": 0,
            "can_error": 1
        },
        "text": "前方路段有塌方，请立即停车"
    }

    decode(data) {
        let emergency, monitor_display, tts_broadcast, screen_display, can_error
        const flag_word = data.readUIntBE(0, 1)

        // const flag_word = parseInt(data.slice(0, 1).toString('hex'), 16).toString(2).padStart(8, '0')
        // emergency = flag_word.substr(-1, 1) === 1 ? true : false
        // monitor_display = flag_word.substr(-3, 1) === 1 ? true : false
        // tts_broadcast = flag_word.substr(-4, 1) === 1 ? true : false
        // screen_display = flag_word.substr(-5, 1) === 1 ? true : false
        emergency = (flag_word >> 0) & 0b1
        monitor_display = (flag_word >> 2) & 0b1

        tts_broadcast = (flag_word >> 3) & 0b1
        screen_display = (flag_word >> 4) & 0b1
        can_error = (flag_word >> 5) & 0b1

        const flag = {
            emergency, monitor_display, tts_broadcast, screen_display, can_error
        }
        return {
            flag,
            'text': iconv.decode(data.slice(1), 'gbk').replace(/\u0000/g, ''),
        }
    }

    encode(params) {
        const { flag, text } = params
        let flagdata = 0b00000000
        if (flag.emergency) {
            flagdata |= 0b00000001
        }
        if (flag.monitor_display) {
            flagdata |= 0b00000100
        }
        if (flag.tts_broadcast) {
            flagdata |= 0b00001000
        }
        if (flag.screen_display) {
            flagdata |= 0b00010000
        }
        if (flag.can_error) {
            flagdata |= 0b00100000
        }

        let data = Buffer.alloc(1)
        data.writeIntBE(flagdata, 0, 1)

        const text_buf = iconv.encode(text, 'gbk')
        data = Buffer.concat([data, text_buf])
        return data
    }
}
module.exports = JTT808Body8300
