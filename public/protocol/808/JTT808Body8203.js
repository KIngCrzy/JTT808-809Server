class JTT808Body8203 {
    body = {
        "flow_number": 0,
        "alarms": {
            "emergency_alarm": 1,
            "danger_warning": 1,
            "access_area": 0,
            "access_route": 0,
            "road_time": 0,
            "abnormal_ignition": 0,
            "abnormal_movement": 0
        }
    }

    decode(data) {
        const flow_number = data.readUIntBE(0, 2)
        const alarms = {
            emergency_alarm: null,
            danger_warning: null,
            access_area: null,
            access_route: null,
            road_time: null,
            abnormal_ignition: null,
            abnormal_movement: null
        }
        const result = data.readUIntBE(2, 4)
        alarms.emergency_alarm = (result >> 0) & 0b1
        alarms.danger_warning = (result >> 3) & 0b1
        alarms.access_area = (result >> 20) & 0b1
        alarms.access_route = (result >> 21) & 0b1
        alarms.road_time = (result >> 22) & 0b1
        alarms.abnormal_ignition = (result >> 27) & 0b1
        alarms.abnormal_movement = (result >> 28) & 0b1
        return {
            'flow_number': flow_number,
            'alarms': alarms
        }
    }

    encode(params) {
        const { flow_number, alarms } = params

        const {
            emergency_alarm, danger_warning, access_area, access_route, road_time,
            abnormal_ignition, abnormal_movement
        } = alarms
        const data = Buffer.alloc(6)
        data.writeUIntBE(flow_number, 0, 2)

        let alarms_dword = 0
        if (emergency_alarm) {
            alarms_dword |= 0b1
        }
        if (danger_warning) {
            alarms_dword |= 0b1000
        }
        if (access_area) {
            alarms_dword |= 0b100000000000000000000
        }
        if (access_route) {
            alarms_dword |= 0b1000000000000000000000
        }
        if (road_time) {
            alarms_dword |= 0b10000000000000000000000
        }
        if (abnormal_ignition) {
            alarms_dword |= 0b1000000000000000000000000000
        }
        if (abnormal_movement) {
            alarms_dword |= 0b10000000000000000000000000000
        }
        data.writeUIntBE(alarms_dword, 2, 4)
        return data
    }
}
module.exports = JTT808Body8203
