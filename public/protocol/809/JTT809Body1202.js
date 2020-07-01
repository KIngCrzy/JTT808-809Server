const iconv = require('iconv-lite')

class JTT809Body1202 {
	decode(data) {
		const encrypt = data.readUIntBE(0, 1)
		const date = data.toString('hex', 1, 5)
		const time = data.toString('hex', 5, 8)
		const lon = data.readUIntBE(8, 4)
		const lat = data.readUIntBE(12, 4)
		const vec1 = data.readUIntBE(16, 2)
		const vec2 = data.readUIntBE(18, 2)
		const vec3 = data.readUIntBE(20, 4)
		const direction = data.readUIntBE(24, 2)
		const altitude = data.readUIntBE(26, 2)
		// 解析状态
		let acc, positioning, south_latitude, west_longitude, stop_operation,
			encryption_plugin, oil_disconnected, circuit_disconnected, door_locked

		const state_dword = parseInt(data.slice(28, 32).toString('hex'), 16).toString(2).padStart(32, '0')
		acc = state_dword.substr(-1, 1)
		positioning = state_dword.substr(-2, 1)
		south_latitude = state_dword.substr(-3, 1)
		west_longitude = state_dword.substr(-4, 1)
		stop_operation = state_dword.substr(-5, 1)
		encryption_plugin = state_dword.substr(-6, 1)
		oil_disconnected = state_dword.substr(-11, 1)
		circuit_disconnected = state_dword.substr(-12, 1)
		door_locked = state_dword.substr(-13, 1)

		const state = {
			acc, positioning, south_latitude, west_longitude, stop_operation,
			encryption_plugin, oil_disconnected, circuit_disconnected, door_locked
		}

		// 解析报警

		let emergency_alarm, speed_alarm, fatigue_driving, early_warning, gnss_malfunction, gnss_disconnected, gnss_short, terminal_undervoltage,
			terminal_down, display_malfunction, tts_malfunction, camera_malfunction, overtime_driving, overtime_parking, access_area, access_route, road_time, route_deviation,
			vss_malfunction, abnormal_oil, vehicle_stolen, abnormal_ignition, abnormal_movement, collision_rollover
		const alarm_dword = parseInt(data.slice(32, 36).toString('hex'), 16).toString(2).padStart(32, '0')
		emergency_alarm = alarm_dword.substr(-1, 1)
		speed_alarm = alarm_dword.substr(-2, 1)
		fatigue_driving = alarm_dword.substr(-3, 1)
		early_warning = alarm_dword.substr(-4, 1)
		gnss_malfunction = alarm_dword.substr(-5, 1)
		gnss_disconnected = alarm_dword.substr(-6, 1)
		gnss_short = alarm_dword.substr(-7, 1)
		terminal_undervoltage = alarm_dword.substr(-8, 1)
		terminal_down = alarm_dword.substr(-9, 1)
		display_malfunction = alarm_dword.substr(-10, 1)
		tts_malfunction = alarm_dword.substr(-11, 1)
		camera_malfunction = alarm_dword.substr(-12, 1)
		overtime_driving = alarm_dword.substr(-19, 1)
		overtime_parking = alarm_dword.substr(-20, 1)
		access_area = alarm_dword.substr(-21, 1)
		access_route = alarm_dword.substr(-22, 1)
		road_time = alarm_dword.substr(-23, 1)
		route_deviation = alarm_dword.substr(-24, 1)
		vss_malfunction = alarm_dword.substr(-25, 1)
		abnormal_oil = alarm_dword.substr(-26, 1)
		vehicle_stolen = alarm_dword.substr(-27, 1)
		abnormal_ignition = alarm_dword.substr(-28, 1)
		abnormal_movement = alarm_dword.substr(-29, 1)
		collision_rollover = alarm_dword.substr(-30, 1)
		const alarm = {
			emergency_alarm, speed_alarm, fatigue_driving, early_warning, gnss_malfunction, gnss_disconnected, gnss_short, terminal_undervoltage,
			terminal_down, display_malfunction, tts_malfunction, camera_malfunction, overtime_driving, overtime_parking, access_area, access_route, road_time, route_deviation,
			vss_malfunction, abnormal_oil, vehicle_stolen, abnormal_ignition, abnormal_movement, collision_rollover}
			
		return {
			encrypt,
			date,
			time,
			lon,
			lat,
			vec1,
			vec2,
			vec3,
			direction,
			altitude,
			state,
			alarm,
		}

	}

	encode(params) {
		const {
			encrypt, date, time, lon, lat, vec1,
			vec2, vec3, direction, altitude, state, alarm,
		} = params
		const data = Buffer.alloc(36)
		data.writeUIntBE(encrypt, 0, 1)
		// data.writeUIntBE(date, 1, 4)
		// data.writeUIntBE(time, 5, 3)
		data.write(date, 1, 4, 'hex')
		data.write(time, 5, 3, 'hex')

		data.writeUIntBE(lon, 8, 4)
		data.writeUIntBE(lat, 12, 4)
		data.writeUIntBE(vec1, 16, 2)
		data.writeUIntBE(vec2, 18, 2)
		data.writeUIntBE(vec3, 20, 4)
		data.writeUIntBE(direction, 24, 2)
		data.writeUIntBE(altitude, 26, 2)
		// 车辆状态
		const {
			acc, positioning, south_latitude,
			west_longitude, stop_operation, encryption_plugin,
			oil_disconnected, circuit_disconnected, door_locked,
		} = state
		// console.log('1202state', state)
		let state_data = 0b00000000000000000000000000000000
		if (acc===1) { state_data |= 0b00000000000000000000000000000001 }
		if (positioning===1) { state_data |= 0b00000000000000000000000000000010 }
		if (south_latitude===1) { state_data |= 0b00000000000000000000000000000100 }
		if (west_longitude===1) { state_data |= 0b00000000000000000000000000001000 }
		if (stop_operation===1) { state_data |= 0b00000000000000000000000000010000 }
		if (encryption_plugin===1) { state_data |= 0b00000000000000000000000000100000 }
		if (oil_disconnected===1) { state_data |= 0b00000000000000000000010000000000 }
		if (circuit_disconnected===1) { state_data |= 0b00000000000000000000100000000000 }
		if (door_locked===1) { state_data |= 0b00000000000000000001000000000000 }
		// console.log('state_data1202', state_data)
		data.writeUIntBE(state_data, 28, 4)
		// 报警标志
		const {
			emergency_alarm, speed_alarm, fatigue_driving, early_warning, gnss_malfunction, gnss_disconnected, gnss_short, terminal_undervoltage, terminal_down,
			display_malfunction, tts_malfunction, camera_malfunction, overtime_driving, overtime_parking, access_area, access_route, road_time, route_deviation, vss_malfunction, abnormal_oil,
			vehicle_stolen, abnormal_ignition, abnormal_movement, collision_rollover,
		} = alarm
		let alarm_state = 0b00000000000000000000000000000000
		if (emergency_alarm===1) { alarm_state |= 0b00000000000000000000000000000001 }
		if (speed_alarm===1) { alarm_state |= 0b00000000000000000000000000000010 }
		if (fatigue_driving===1) { alarm_state |= 0b00000000000000000000000000000100 }
		if (early_warning===1) { alarm_state |= 0b00000000000000000000000000001000 }
		if (gnss_malfunction===1) { alarm_state |= 0b00000000000000000000000000010000 }
		if (gnss_disconnected===1) { alarm_state |= 0b00000000000000000000000000100000 }
		if (gnss_short===1) { alarm_state |= 0b00000000000000000000000001000000 }
		if (terminal_undervoltage===1) { alarm_state |= 0b00000000000000000000000010000000 }
		if (terminal_down===1) { alarm_state |= 0b00000000000000000000000100000000 }
		if (display_malfunction===1) { alarm_state |= 0b00000000000000000000001000000000 }
		if (tts_malfunction===1) { alarm_state |= 0b00000000000000000000010000000000 }
		if (camera_malfunction===1) { alarm_state |= 0b00000000000000000000100000000000 }
		if (overtime_driving===1) { alarm_state |= 0b00000000000001000000000000000000 }
		if (overtime_parking===1) { alarm_state |= 0b00000000000010000000000000000000 }
		if (access_area===1) { alarm_state |= 0b00000000000100000000000000000000 }
		if (access_route===1) { alarm_state |= 0b00000000001000000000000000000000 }
		if (road_time===1) { alarm_state |= 0b00000000010000000000000000000000 }
		if (route_deviation===1) { alarm_state |= 0b00000000100000000000000000000000 }
		if (vss_malfunction===1) { alarm_state |= 0b00000001000000000000000000000000 }
		if (abnormal_oil===1) { alarm_state |= 0b00000010000000000000000000000000 }
		if (vehicle_stolen===1) { alarm_state |= 0b00000100000000000000000000000000 }
		if (abnormal_ignition===1) { alarm_state |= 0b00001000000000000000000000000000 }
		if (abnormal_movement===1) { alarm_state |= 0b00010000000000000000000000000000 }
		if (collision_rollover===1) { alarm_state |= 0b00100000000000000000000000000000 }
		data.writeUIntBE(alarm_state, 32, 4)
		return data
	}
}
module.exports = JTT809Body1202
