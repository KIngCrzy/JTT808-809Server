const JTT809body9202 = require('./JTT809Body9202')
const JTT809body9203 = require('./JTT809Body9203')
const JTT809body9204 = require('./JTT809Body9204')
const JTT809body9205 = require('./JTT809Body9205')
const JTT809body9206 = require('./JTT809Body9206')
const JTT809body9207 = require('./JTT809Body9207')
const JTT809body9208 = require('./JTT809Body9208')
const JTT809body9209 = require('./JTT809Body9209')
const JTT809body920a = require('./JTT809Body920a')
const JTT809body920b = require('./JTT809Body920b')

const JTT809body1200 = require('./JTT809Body1200')

const JTT809Body9202 = new JTT809body9202()
const JTT809Body9203 = new JTT809body9203()
const JTT809Body9204 = new JTT809body9204()

const JTT809Body9205 = new JTT809body9205()
const JTT809Body9206 = new JTT809body9206()
const JTT809Body9207 = new JTT809body9207()
const JTT809Body9208 = new JTT809body9208()
const JTT809Body9209 = new JTT809body9209()
const JTT809Body920a = new JTT809body920a()
const JTT809Body920b = new JTT809body920b()

class JTT809Body9200 extends JTT809body1200 {
	constructor() {
		super()
		this.DATA_TYPE = {
			'9202': JTT809Body9202,
			'9203': JTT809Body9203,
			'9204': JTT809Body9204,
			'9205': JTT809Body9205,
			'9206': JTT809Body9206,
			'9207': JTT809Body9207,
			'9208': JTT809Body9208,
			'9209': JTT809Body9209,
			'920a': JTT809Body920a,
			'920b': JTT809Body920b,
		}
	}

	body = {
		'9202': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9202",
			"data": {
				"encrypt": 0,
				"date": "190b07e3",
				"time": "0b201e",
				"lon": 109203745,
				"lat": 30120334,
				"vec1": 67,
				"vec2": 67,
				"vec3": 5600,
				"direction": 30,
				"altitude": 67,
				"state": {
					"acc": 1,
					"positioning": 1,
					"south_latitude": 0,
					"west_longitude": 0,
					"stop_operation": 0,
					"encryption_plugin": 0,
					"oil_disconnected": 0,
					"circuit_disconnected": 0,
					"door_locked": 1
				},
				"alarm": {
					"emergency_alarm": 1,
					"speed_alarm": 1,
					"fatigue_driving": 0,
					"early_warning": 0,
					"gnss_malfunction": 0,
					"gnss_disconnected": 0,
					"gnss_short": 0,
					"terminal_undervoltage": 0,
					"terminal_down": 0,
					"display_malfunction": 0,
					"tts_malfunction": 0,
					"camera_malfunction": 0,
					"overtime_driving": 0,
					"overtime_parking": 0,
					"access_area": 0,
					"access_route": 1,
					"road_time": 1,
					"route_deviation": 0,
					"vss_malfunction": 0,
					"abnormal_oil": 0,
					"vehicle_stolen": 0,
					"abnormal_ignition": 0,
					"abnormal_movement": 0,
					"collision_rollover": 0
				}
			}
		},
		'9203': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9203",
			"data": {
				"gnss_data": [
					{
						"encrypt": 0,
						"date": "190b07e3",
						"time": "0b201e",
						"lon": 109203745,
						"lat": 30120334,
						"vec1": 67,
						"vec2": 67,
						"vec3": 5600,
						"direction": 30,
						"altitude": 67,
						"state": {
							"acc": 1,
							"positioning": 1,
							"south_latitude": 0,
							"west_longitude": 0,
							"stop_operation": 0,
							"encryption_plugin": 0,
							"oil_disconnected": 0,
							"circuit_disconnected": 0,
							"door_locked": 1
						},
						"alarm": {
							"emergency_alarm": 1,
							"speed_alarm": 1,
							"fatigue_driving": 0,
							"early_warning": 0,
							"gnss_malfunction": 0,
							"gnss_disconnected": 0,
							"gnss_short": 0,
							"terminal_undervoltage": 0,
							"terminal_down": 0,
							"display_malfunction": 0,
							"tts_malfunction": 0,
							"camera_malfunction": 0,
							"overtime_driving": 0,
							"overtime_parking": 0,
							"access_area": 0,
							"access_route": 1,
							"road_time": 1,
							"route_deviation": 0,
							"vss_malfunction": 0,
							"abnormal_oil": 0,
							"vehicle_stolen": 0,
							"abnormal_ignition": 0,
							"abnormal_movement": 0,
							"collision_rollover": 0
						}
					}
				]
			}
		},
		'9204': {
			"vehicle_no": "川A25308",
			"vehicle_color": 2,
			"data_type": "9204",
			"data": {
				"trans_type": "011",
				"vin": "川A25308",
				"vehicle_nationality": "510121",
				"vehicle_type": "12",
				"rtpn": "330101212281",
				"owers_name": "四川亚细亚运业",
				"owers_orig_id": "2000",
				"owers_tel": "13516814488",
				"rtoln": "330101200007",
				"vehicle_mode": "金龙",
				"vehicle_color": 2,
				"vehicle_orig_id": "123456",
				"driver_info": [
					{
						"name": "张伟",
						"certificate_number": "3301011060008041111",
						"phone_number": "13854389427"
					}
				],
				"business_area": "2",
				"banline_type": "1",
				"approved_seats": 30,
				"origin": "金堂县",
				"destination": "锦江区",
				"departure_st": "金堂客运中心站",
				"des_st": "成都东站汽车客运站"
			}
		},
		'9205': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9205",
			"data": {
				"reason_code": "01"
			}
		},
		'9206': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9206",
			"data": {
				"reason_code": "03"
			}
		},
		'9207': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9207",
			"data": {
				"result": "00"
			}
		},
		'9208': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9208",
			"data": {
				"result": "00"
			}
		},
		'9209': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "9209",
			"data": {
				"result": "00"
			}
		},
		'920a': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "920a",
			"data": null
		},
		'920b': {
			"vehicle_no": "蒙E88888",
			"vehicle_color": 1,
			"data_type": "920b",
			"data": null
		},
	}
}
module.exports = JTT809Body9200
