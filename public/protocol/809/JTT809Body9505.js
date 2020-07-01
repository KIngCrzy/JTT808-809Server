const iconv = require('iconv-lite')

class JTT809Body9505 {
	decode(data) {
		return {
			authentication_code: data.toString('hex', 0, 10),
			access_point_name: iconv.decode(data.slice(10, 30), 'gbk').replace(/\u0000/g, ''),
			username: iconv.decode(data.slice(30, 79), 'gbk').replace(/\u0000/g, ''),
			password: iconv.decode(data.slice(79, 101), 'gbk').replace(/\u0000/g, ''),
			server_ip: iconv.decode(data.slice(101, 133), 'gbk').replace(/\u0000/g, ''),
			tcp_port: data.readUIntBE(133, 2),
			udp_port: data.readUIntBE(135, 2),
			end_time: Number(data.readBigUInt64BE(137, 8)),
		}
	}

	encode(params) {
		const {
			authentication_code, access_point_name, username, password,
			server_ip, tcp_port, udp_port, end_time } = params
		const data = Buffer.alloc(145)
		data.write(iconv.encode(authentication_code, 'gbk').toString('hex'), 0, 10, 'hex')
		data.write(iconv.encode(access_point_name, 'gbk').toString('hex'), 10, 30, 'hex')
		data.write(iconv.encode(username, 'gbk').toString('hex'), 30, 79, 'hex')
		data.write(iconv.encode(password, 'gbk').toString('hex'), 79, 101, 'hex')
		data.write(iconv.encode(server_ip, 'gbk').toString('hex'), 101, 133, 'hex')
		data.writeUIntBE(tcp_port, 133, 2)
		data.writeUIntBE(udp_port, 135, 2)
		data.writeBigUInt64BE(BigInt(end_time), 137, 8)

		return data
	}
}
module.exports = JTT809Body9505
