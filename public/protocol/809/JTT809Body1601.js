const iconv = require('iconv-lite')
const _ = require('lodash')

class JTT809Body1601 {
	constructor() {
	}

	decode(data) {
		const INT_KEYS = {
			vehicle_color: null,
		}
		const STR_KEYS = {
			vin: null,
			vehicle_type: null,
			trans_type: null,
			vehicle_nationality: null,
			owers_id: null,
			owers_name: null,
			owers_tel: null,
		}
		const ALL_KEYS = {
			vin: null,
			vehicle_color: null,
			vehicle_type: null,
			trans_type: null,
			vehicle_nationality: null,
			owers_id: null,
			owers_name: null,
			owers_tel: null,
		}
		const items = iconv.decode(data, 'gbk').split(';')
		const result = ALL_KEYS
		items.map((x) => {
			const key = x.split(':=')[0].toLowerCase().trim()
			const value = x.split(':=')[1]
			if (value) {
				if (key in INT_KEYS) {
					result[key] = parseInt(value)
				} else if (key in STR_KEYS) {
					result[key] = value
				}
			}
		})
		return result
	}

	encode(params) {
		const INT_KEYS = {
			vehicle_color: null,
		}
		const STR_KEYS = {
			vin: null,
			vehicle_type: null,
			trans_type: null,
			vehicle_nationality: null,
			owers_id: null,
			owers_name: null,
			owers_tel: null,
		}
		const ALL_KEYS = {
			vin: null,
			vehicle_color: null,
			vehicle_type: null,
			trans_type: null,
			vehicle_nationality: null,
			owers_id: null,
			owers_name: null,
			owers_tel: null,
		}
		const params_str_list = []
		Object.keys(params).map((x) => {
			let value_str = ''
			if (x in ALL_KEYS && params[x]) {
				if (x in INT_KEYS) {
					value_str = String(params[x])
				} else if (x in STR_KEYS) {
					value_str = params[x]
				}
				params_str_list.push(`${x.toUpperCase()}:=${value_str}`)
			}
		})
		return iconv.encode(params_str_list.join(';'), 'gbk')
	}
}
module.exports = JTT809Body1601


