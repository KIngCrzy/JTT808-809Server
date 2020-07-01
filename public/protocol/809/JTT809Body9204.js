const iconv = require('iconv-lite')

let key
let value
let info_array = []
let data1
let value_str = ''


class JTT809Body9204 {
	constructor() {
		this.intdata = {
			'traction': null, 'vehicle_color': null,
			'approved_tonnage': null, 'cargo_tonnage': null, 'approved_seats': null
		}

		this.strdata = {
			'trans_type': null, 'vin': null, 'trailer_vin': null, 'vehicle_nationality': null, 'vehicle_type': null, 'rtpn': null,
			'owers_name': null, 'owers_orig_id': null, 'owers_tel': null, 'rtoln': null, 'vehicle_mode': null, 'vehicle_orig_id': null,
			'dg_type': null, 'cargo_name': null, 'transport_origin': null, 'transport_des': null, 'business_area': null,
			'banline_type': null, 'origin': null, 'destination': null, 'departure_st': null, 'des_st': null
		}
		this.ALL_KEYS = { ...this.intdata, ...this.strdata }
	}


	decode(data) {
		let result = this.ALL_KEYS
		console.log('9204result',result)
		const items = iconv.decode(data, 'gbk').split(';')
		for (let i = 0;i < items.length;i++) {
			key = items[i].split(':=')[0].toLowerCase().trim()
			value = items[i].split(':=')[1].trim()
			if (value) {
				if (key in this.intdata) {
					result[key] = parseInt(value)
				} else if (key in this.strdata) {
					result[key] = value
				} else if (key in { 'driver_info': null, 'guards_info': null }) {
					const data = value.split(',')
					for (let i = 0;i < data.length;i++) {
						data1 = data[i].split('|')
						info_array.push({
							'name': data1[0],
							'certificate_number': data1[1],
							'phone_number': data1[2]
						})
					}
					result[key] = info_array
				} else if (key === 'tssl') {
					data1 = value.split('|')
					result[key] = { 'start_time': parseInt(data1[0]), 'end_time': parseInt(data1[1]) }
				}
			}
			else {
				result[key] = null
			}
		}
		return result
	}

	encode(params) {
		const params_str_list = []
		Object.keys(params).map(param_key => {
			if (params[param_key]) {
				if (param_key in this.intdata) {
					value_str = String(params[param_key])
				} else if (param_key in this.strdata) {
					value_str = params[param_key]
				}
				else if (param_key in { 'driver_info': null, 'guards_info': null }) {
					const info_array = []
					for (let i = 0;i < params[param_key].length;i++) {
						const info = params[param_key][i]
						info_array.push([info['name'], info['certificate_number'], info['phone_number']].join('|'))
						value_str = info_array.join(',')
					}
				} else if (param_key === 'tssl') {
					value_str = ([String(params[param_key]['start_time']), String(params[param_key]['end_time'])].join('|'))
				}
				params_str_list.push(([param_key.toUpperCase(), value_str]).join(':='))
			}
		})
		return iconv.encode(params_str_list.join(';'), 'gbk')
	}
}

module.exports = JTT809Body9204
