const JTT809body9501 = require('./JTT809Body9501')
const JTT809body9502 = require('./JTT809Body9502')
const JTT809body9503 = require('./JTT809Body9503')
const JTT809body9504 = require('./JTT809Body9504')
const JTT809body9505 = require('./JTT809Body9505')

const JTT809body1200 = require('./JTT809Body1200')

const JTT809Body9501 = new JTT809body9501()
const JTT809Body9502 = new JTT809body9502()
class JTT809Body9500 extends JTT809body1200 {
	constructor() {
		super()
		this.DATA_TYPE = {
			'9501': JTT809Body9501,
			'9502': JTT809Body9502,
			'9503': new JTT809body9503(),
			'9504': new JTT809body9504(),
			'9505': new JTT809body9505(),
		}
	}

	body = {
		'9501': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9501",
			"data": {
				"monitor_tel": "15511112222"
			}
		},
		'9502': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9502",
			"data": {
				"lens_id": 0,
				"size": "03"
			}
		},
		'9503': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9503",
			"data": {
				"msg_sequence": 0,
				"msg_priority": "00",
				"msg_content": "前方路段塌方，请绕道而行"
			}
		},
		'9504': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9504",
			"data": {
				"start_time": 1574319191,
				"end_time": 1574322112
			}
		},
		'9505': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9505",
			"data": {
				"authentication_code": "1234567890",
				"access_point_name": "sadas",
				"username": "asd",
				"password": "asdas",
				"server_ip": "127.0.0.1",
				"tcp_port": 20809,
				"udp_port": 0,
				"end_time": 1574322112
			}
		},
	}
}
module.exports = JTT809Body9500
