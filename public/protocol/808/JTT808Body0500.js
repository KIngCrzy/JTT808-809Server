const JTT808Body0201 = require('./JTT808Body0201')

const JTT808body0201 = new JTT808Body0201()

class JTT808Body0500 {
	body = {
		"flow_number": 3136,
		"location_info": {
			"alarms": {
				"emergency_alarm": 1,
				"speed_alarm": 0,
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
				"access_route": 0,
				"road_time": 0,
				"route_deviation": 0,
				"vss_malfunction": 0,
				"abnormal_oil": 0,
				"vehicle_stolen": 0,
				"abnormal_ignition": 0,
				"abnormal_movement": 0,
				"collision_rollover": 0
			},
			"status": {
				"acc": 0,
				"positioning": 0,
				"south_latitude": 0,
				"west_longitude": 0,
				"stop_operation": 0,
				"encryption_plugin": 0,
				"oil_disconnected": 0,
				"circuit_disconnected": 0,
				"door_locked": 0
			},
			"latitude": 30120334,
			"longitude": 109203745,
			"altitude": 802,
			"speed": 670,
			"direction": 30,
			"time": "191106173319",
			"extra_info": [
				{
					"id": "01",
					"info": 10
				},
				// {
				//     "id": "02",
				//     "info": 100
				// },
				// {
				//     "id": "03",
				//     "info": 670
				// },
				// {
				//     "id": "11",
				//     "info": {
				//         "type": 0,
				//         "id": null
				//     }
				// },
				// {
				//     "id": "12",
				//     "info": {
				//         "type": 4,
				//         "id": 2,
				//         "direction": 1
				//     }
				// },
				// {
				//     "id": "13",
				//     "info": {
				//         "id": 3,
				//         "time": 513,
				//         "result": 1
				//     }
				// }
			]
		}
	}

	decode(data) {
		return JTT808body0201.decode(data)
	}
	encode(params) {
		const result = JTT808body0201.encode(params)
		return result
	}
}

module.exports = JTT808Body0500
