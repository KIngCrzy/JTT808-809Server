const iconv = require('iconv-lite')

class JTT809Body9401 {
	decode(data) {
		return {
			warn_src: data.toString('hex', 0, 1),
			warn_type: data.toString('hex', 1, 3),
			warn_time: Number(data.readBigUInt64BE(3, 8)),
			supervision_id: data.readUIntBE(11, 4),
			supervision_endtime: Number(data.readBigUInt64BE(15, 8)),
			supervision_level: data.toString('hex', 23, 24),
			supervisor: iconv.decode(data.slice(24, 40), 'gbk').replace(/\u0000/g, ''),
			supervisor_tel: iconv.decode(data.slice(40, 60), 'gbk').replace(/\u0000/g, ''),
			supervisor_email: iconv.decode(data.slice(60, 92), 'gbk').replace(/\u0000/g, ''),
		}
	}

	encode(params) {
		const {
			warn_src, warn_type, warn_time, supervision_id, supervision_endtime, supervision_level, supervisor, supervisor_tel, supervisor_email,
		} = params
		const warn_src_buf = Buffer.from(warn_src, 'hex')
		const warn_type_buf = Buffer.from(warn_type, 'hex')
		const warn_time_buf = Buffer.alloc(8)
		const supervision_id_buf = Buffer.alloc(4)
		const supervision_endtime_buf = Buffer.alloc(8)
		warn_time_buf.writeBigUInt64BE(BigInt(warn_time), 0, 8)
		supervision_id_buf.writeUIntBE(supervision_id, 0, 4)
		supervision_endtime_buf.writeBigUInt64BE(BigInt(supervision_endtime), 0, 8)
		const supervision_level_buf = Buffer.from(supervision_level, 'hex')
		const supervisor_buf = Buffer.alloc(16)
		const supervisor_tel_buf = Buffer.alloc(20)
		const supervisor_email_buf = Buffer.alloc(30)

		supervisor_buf.write(iconv.encode(supervisor, 'gbk').toString('hex'), 0, 16, 'hex')
		supervisor_tel_buf.write(iconv.encode(supervisor_tel, 'gbk').toString('hex'), 0, 20, 'hex')
		supervisor_email_buf.write(iconv.encode(supervisor_email, 'gbk').toString('hex'), 0, 30, 'hex')

		const data = Buffer.concat([warn_src_buf, warn_type_buf, warn_time_buf, supervision_id_buf, supervision_endtime_buf,
			supervision_level_buf, supervisor_buf, supervisor_tel_buf, supervisor_email_buf])
		return data
	}
}
module.exports = JTT809Body9401
