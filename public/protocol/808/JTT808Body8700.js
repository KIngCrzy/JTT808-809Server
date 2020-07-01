class JTT808Body8700 {
    body = {
        "command_word": "01",
    }

    decode(data) {
        return {
            'command_word': data.toString('hex', 0, 1),
        }
    }

    encode(params) {
        const { command_word } = params
        const command_word_buf = Buffer.from(command_word, 'hex')
        return command_word_buf
    }
}
module.exports = JTT808Body8700
