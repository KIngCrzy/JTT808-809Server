const iconv = require('iconv-lite')
class JTT808Body8105 {

    body = {
        "command_word": 1,
        "command_params": {
            // "ConnectionControl": 1,
            "dialing_name": 'TKName',
            "dialing_username": 'TK',
            "dialing_password": 'TK123',
            "server_address": "smart-iov.net",
            "tcp_port": 7080,
            "udp_port": 7080,
            "manufacturer_id": "12345",
            // 'Supervision_platform_authentication_code': "1234567890A",
            "hardware_version": '1',
            "firmware_version": '2',
            "time_limit": 0,
            "url": "www.TK.com",
        }
    }

    decode(data) {
        const command_word = data.readUIntBE(0, 1)
        const command_params_array = iconv.decode(data.slice(1), 'gbk').split(';')

        let command_params
        if (command_word === 1) {
            let dialing_name, dialing_username, dialing_password, server_address,
                tcp_port, udp_port, manufacturer_id,
                hardware_version, firmware_version, url, time_limit
            url = command_params_array[0]
            dialing_name = command_params_array[1]
            dialing_username = command_params_array[2]
            dialing_password = command_params_array[3]
            server_address = command_params_array[4]
            tcp_port = Number(command_params_array[5])
            udp_port = Number(command_params_array[6])

            manufacturer_id = command_params_array[7]
            hardware_version = command_params_array[8]
            firmware_version = command_params_array[9]
            command_params_array[10] ? time_limit = iconv.encode(command_params_array[10], 'gbk').readUIntBE(0, 2) : time_limit = 0

            command_params = {
                dialing_name, dialing_username, dialing_password, server_address,
                tcp_port, udp_port, manufacturer_id,
                hardware_version, firmware_version, url, time_limit,
            }

        }
        if (command_word === 2) {
            let connection_control, authentication_code,
                dialing_name, dialing_username, dialing_password,
                server_address, tcp_port, udp_port, time_limit

            command_params_array[0] ? connection_control = iconv.encode(command_params_array[0], 'gbk').readUIntBE(0, 1) : connection_control = ''
            if (connection_control === 0) {
                console.log(command_params_array);

                authentication_code = command_params_array[1]
                dialing_name = command_params_array[2]
                dialing_username = command_params_array[3]
                dialing_password = command_params_array[4]
                server_address = command_params_array[5]
                tcp_port = Number(command_params_array[6])
                udp_port = Number(command_params_array[7])
                command_params_array[8] ? time_limit = iconv.encode(command_params_array[8], 'gbk').readUIntBE(0, 2) : time_limit = 0

                command_params = {
                    connection_control, authentication_code,
                    dialing_name, dialing_username, dialing_password,
                    server_address, tcp_port, udp_port, time_limit
                }
            }

        }
        if ([3, 4, 5, 6, 7].includes(command_word)) {
            command_params = null
        }
        return {
            command_word,
            command_params,
        }
    }

    encode(params) {
        let data = Buffer.alloc(1)
        const { command_word, command_params } = params
        data.writeUIntBE(command_word, 0, 1)

        if (command_word === 1) {
            const { dialing_name, dialing_username, dialing_password, server_address,
                tcp_port, udp_port, manufacturer_id,
                hardware_version, firmware_version, url, time_limit,
            } = command_params

            let params_bytes = []
            url ? params_bytes.push(iconv.encode(url, 'gbk')) : params_bytes.push(Buffer.from([]))
            dialing_name ? params_bytes.push(iconv.encode(dialing_name, 'gbk')) : params_bytes.push(Buffer.from([]))
            dialing_username ? params_bytes.push(iconv.encode(dialing_username, 'gbk')) : params_bytes.push(Buffer.from([]))
            dialing_password ? params_bytes.push(iconv.encode(dialing_password, 'gbk')) : params_bytes.push(Buffer.from([]))
            server_address ? params_bytes.push(iconv.encode(server_address, 'gbk')) : params_bytes.push(Buffer.from([]))
            tcp_port ? params_bytes.push(iconv.encode(tcp_port, 'gbk')) : params_bytes.push(Buffer.from([]))
            udp_port ? params_bytes.push(iconv.encode(udp_port, 'gbk')) : params_bytes.push(Buffer.from([]))

            // if (tcp_port) {
            //     const tcp_port_buf = Buffer.alloc(2)
            //     tcp_port_buf.writeUIntBE(tcp_port, 0, 2)
            //     params_bytes.push(tcp_port_buf)
            // } else {
            //     params_bytes.push(Buffer.from([]))
            // }
            // if (udp_port) {
            //     const udp_port_buf = Buffer.alloc(2)
            //     udp_port_buf.writeUIntBE(udp_port, 0, 2)
            //     console.log(udp_port_buf);

            //     params_bytes.push(udp_port_buf)
            // } else {
            //     params_bytes.push(Buffer.from([]))
            // }
            // console.log('params_bytes', params_bytes)

            manufacturer_id ? params_bytes.push(iconv.encode(manufacturer_id, 'gbk')) : params_bytes.push(Buffer.from([]))
            hardware_version ? params_bytes.push(iconv.encode(hardware_version, 'gbk')) : params_bytes.push(Buffer.from([]))
            firmware_version ? params_bytes.push(iconv.encode(firmware_version, 'gbk')) : params_bytes.push(Buffer.from([]))

            if (time_limit) {
                const time_limit_buf = Buffer.alloc(2)
                time_limit_buf.writeUIntBE(time_limit, 0, 2)
                params_bytes.push(time_limit_buf)
            } else {
                params_bytes.push(Buffer.from([]))
            }

            params_bytes.map(x => {
                data = Buffer.concat([data, x, iconv.encode(';', 'gbk')])
            })

        }
        else if (command_word === 2) {
            const { connection_control, authentication_code,
                dialing_name, dialing_username, dialing_password,
                server_address, tcp_port, udp_port, time_limit
            } = command_params
            const connection_control_buf = Buffer.alloc(1)
            connection_control_buf.writeUIntBE(connection_control, 0, 1)
            let params_bytes = [connection_control_buf]

            if (connection_control === 0) {
                authentication_code ? params_bytes.push(iconv.encode(authentication_code, 'gbk')) : params_bytes.push(Buffer.from([]))
                dialing_name ? params_bytes.push(iconv.encode(dialing_name, 'gbk')) : params_bytes.push(Buffer.from([]))
                dialing_username ? params_bytes.push(iconv.encode(dialing_username, 'gbk')) : params_bytes.push(Buffer.from([]))
                dialing_password ? params_bytes.push(iconv.encode(dialing_password, 'gbk')) : params_bytes.push(Buffer.from([]))
                server_address ? params_bytes.push(iconv.encode(server_address, 'gbk')) : params_bytes.push(Buffer.from([]))
                tcp_port ? params_bytes.push(iconv.encode(tcp_port, 'gbk')) : params_bytes.push(Buffer.from([]))
                udp_port ? params_bytes.push(iconv.encode(udp_port, 'gbk')) : params_bytes.push(Buffer.from([]))

                // if (tcp_port) {
                //     const tcp_port_buf = Buffer.alloc(2)
                //     tcp_port_buf.writeUIntBE(tcp_port, 0, 2)
                //     params_bytes.push(tcp_port_buf)
                // } else {
                //     params_bytes.push(Buffer.from([]))
                // }
                // if (udp_port) {
                //     const udp_port_buf = Buffer.alloc(2)
                //     udp_port_buf.writeUIntBE(udp_port, 0, 2)
                //     params_bytes.push(udp_port_buf)
                // } else {
                //     params_bytes.push(Buffer.from([]))
                // }
                if (time_limit) {
                    const time_limit_buf = Buffer.alloc(2)
                    time_limit_buf.writeUIntBE(time_limit, 0, 2)
                    params_bytes.push(time_limit_buf)
                } else {
                    params_bytes.push(Buffer.from([]))
                }

                params_bytes.map(x => {
                    data = Buffer.concat([data, x, iconv.encode(';', 'gbk')])
                })
            }
        }
        else if ([3, 4, 5, 6, 7].includes(command_word)) {

        }
        else {
            throw 'command_word value is illegal in 0x8105 message'
        }
        return data
    }
}


module.exports = JTT808Body8105
