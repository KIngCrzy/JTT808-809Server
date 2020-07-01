const iconv = require('iconv-lite')

class JTT808Body8302 {

    body = {
        "flag": {
            "emergency": 1,
            "tts_broadcast": 1,
            "screen_display": 1
        },
        "question": "在以下学历中哪个是最高的",
        "candidate_answers": [
            {
                "id": 1,
                "content": "小学"
            },
            {
                "id": 2,
                "content": "初中"
            },
            {
                "id": 3,
                "content": "高中"
            },
            {
                "id": 4,
                "content": "本科"
            }
        ]
    }

    decode(data) {
        const flag_data = {
            "emergency": null,
            "tts_broadcast": null,
            "screen_display": null
        }
        const flag = data.readUIntBE(0, 1)
        flag_data.emergency = (flag >> 0) & 0b1
        flag_data.tts_broadcast = (flag >> 3) & 0b1
        flag_data.screen_display = (flag >> 4) & 0b1
        const n = data.readUIntBE(1, 1)
        const question = iconv.decode(data.slice(2, 2 + n), 'gbk')

        const list = []
        let length = 0
        const data_buf = data.slice(n + 2)

        while (length < data_buf.length) {
            const result = {
                "id": null,
                "content": null
            }
            result.id = data_buf.readUIntBE(0 + length, 1)
            const answers_len = data_buf.readUIntBE(1 + length, 2)

            result.content = iconv.decode(data_buf.slice(3 + length, 3 + length + answers_len), 'gbk')
            list.push(result)
            length = length + 3 + answers_len
        }

        return {
            'flag': flag_data,
            'question': question,
            'candidate_answers': list,
        }
    }

    encode(params) {
        let flag = 0b00000000
        let data = Buffer.alloc(2)
        const { emergency, tts_broadcast, screen_display } = params.flag
        if (emergency) {
            flag |= 0b00000001
        }
        if (tts_broadcast) {
            flag |= 0b00001000
        }
        if (screen_display) {
            flag |= 0b00010000
        }
        data.writeUIntBE(flag, 0, 1)
        const question_buf = iconv.encode(params.question, 'gbk')
        data.writeUInt8(question_buf.length, 1)
        data = Buffer.concat([data, question_buf])
        console.log('data', data, data.length)

        const candidate_answers_len = params.candidate_answers.length
        const candidate_answers_buf = Buffer.alloc(3)

        for (let i = 0; i < candidate_answers_len; i += 1) {
            const { id, content } = params.candidate_answers[i]
            candidate_answers_buf.writeUInt8(id, 0)
            const content_buf = iconv.encode(content, 'gbk')
            candidate_answers_buf.writeUIntBE(content_buf.length, 1, 2)
            data = Buffer.concat([data, candidate_answers_buf, content_buf])
        }
        return data
    }
}
module.exports = JTT808Body8302
