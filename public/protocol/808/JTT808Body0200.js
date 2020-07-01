
class JTT808Body0200 {
    body = {
        "alarms": {
            "emergency_alarm": 1,
            "speed_alarm": 0,
            "fatigue_driving": 0,
            "danger_warning": 0,
            "gnss_malfunction": 0,
            "gnss_disconnected": 0,
            "gnss_short": 0,
            "terminal_undervoltage": 0,
            "terminal_down": 0,
            "display_malfunction": 0,
            "tts_malfunction": 0,
            "camera_malfunction": 0,
            "ic_malfunction": 0,
            "speed_warning": 0,
            "fatigue_warning": 0,
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
            "collision_warning": 0,
            "rollover_warning": 0,
            "abnormal_open": 0
        },
        "status": {
            "acc": 0,
            "positioning": 0,
            "south_latitude": 0,
            "west_longitude": 0,
            "stop_operation": 0,
            "encryption_plugin": 0,
            "have_load": 0,
            "full_load": 0,
            "oil_disconnected": 0,
            "circuit_disconnected": 0,
            "door_locked": 0,
            "front_door": 0,
            "middle_door": 0,
            "back_door": 0,
            "driver_door": 0,
            "custom_door": 0,
            "gps_positioing": 0,
            "beidou_positioning": 0,
            "glonass_positioning": 0,
            "galileo_positioning": 0
        },
        "latitude": 3,
        "longitude": 4,
        "altitude": 5,
        "speed": 6,
        "direction": 7,
        "time": "191106173319",
        "extra_info": [
            {
                "id": "01",
                "info": 10
            },
            {
                "id": "02",
                "info": 100
            },
            {
                "id": "03",
                "info": 670
            },
            {
                "id": "04",
                "info": 1
            },
            {
                "id": "11",
                "info": {
                    "type": 1,
                    "Section_id": 1
                }
            },
            {
                "id": "12",
                "info": {
                    "type": 4,
                    "Section_id": 2,
                    "direction": 1
                }
            },
            {
                "id": "13",
                "info": {
                    "Section_id": 3,
                    "time": 2,
                    "result": 1
                }
            },
            {
                "id": "25",
                "info": {
                    "low_beam": 0,
                    "high_beam": 0,
                    "right_turn": 0,
                    "left_turn": 0,
                    "brake": 0,
                    "reverse_gear": 0,
                    "fog_light": 0,
                    "shrine_light": 0,
                    "horn": 0,
                    "air_conditioning": 0,
                    "netural_gear": 0,
                    "retarder": 0,
                    "abs": 0,
                    "heater": 0,
                    "clutch": 0
                }
            },
            {
                "id": "2a",
                "info": {
                    "deep_hibernation": 0,
                    "hibernation": 0
                }
            },
            {
                "id": "2b",
                "info": 0
            },
            {
                "id": "30",
                "info": 90
            },
            {
                "id": "31",
                "info": 10
            }
        ]
    }



    _is_1(data, position) {
        const data_len = data.length
        if (position / 8 >= data_len) {
            throw 'Position cannot be out of bound'
        }
        return (data[data_len - 1 - position / 8] >> (position % 8)) & 0b1
    }

    decode(data) {
        const alarms = {
            emergency_alarm: null,
            speed_alarm: null,
            fatigue_driving: null,
            danger_warning: null,
            gnss_malfunction: null,
            gnss_disconnected: null,
            gnss_short: null,
            terminal_undervoltage: null,
            terminal_down: null,
            display_malfunction: null,
            tts_malfunction: null,
            camera_malfunction: null,
            ic_malfunction: null,
            speed_warning: null,
            fatigue_warning: null,
            overtime_driving: null,
            overtime_parking: null,
            access_area: null,
            access_route: null,
            road_time: null,
            route_deviation: null,
            vss_malfunction: null,
            abnormal_oil: null,
            vehicle_stolen: null,
            abnormal_ignition: null,
            abnormal_movement: null,
            collision_rollover: null,
            rollover_warning: null,
            abnormal_open: null,
        }
        const alarms_dword = data.slice(0, 4)
        alarms.emergency_alarm = this._is_1(alarms_dword, 0)
        alarms.speed_alarm = this._is_1(alarms_dword, 1)
        alarms.fatigue_driving = this._is_1(alarms_dword, 2)
        alarms.danger_warning = this._is_1(alarms_dword, 3)
        alarms.gnss_malfunction = this._is_1(alarms_dword, 4)
        alarms.gnss_disconnected = this._is_1(alarms_dword, 5)
        alarms.gnss_short = this._is_1(alarms_dword, 6)
        alarms.terminal_undervoltage = this._is_1(alarms_dword, 7)
        alarms.terminal_down = this._is_1(alarms_dword, 8)
        alarms.display_malfunction = this._is_1(alarms_dword, 9)
        alarms.tts_malfunction = this._is_1(alarms_dword, 10)
        alarms.camera_malfunction = this._is_1(alarms_dword, 11)

        alarms.ic_malfunction = this._is_1(alarms_dword, 12)
        alarms.speed_warning = this._is_1(alarms_dword, 13)
        alarms.fatigue_warning = this._is_1(alarms_dword, 14)

        alarms.overtime_driving = this._is_1(alarms_dword, 18)
        alarms.overtime_parking = this._is_1(alarms_dword, 19)
        alarms.access_area = this._is_1(alarms_dword, 20)
        alarms.access_route = this._is_1(alarms_dword, 21)
        alarms.road_time = this._is_1(alarms_dword, 22)
        alarms.route_deviation = this._is_1(alarms_dword, 23)
        alarms.vss_malfunction = this._is_1(alarms_dword, 24)
        alarms.abnormal_oil = this._is_1(alarms_dword, 25)
        alarms.vehicle_stolen = this._is_1(alarms_dword, 26)
        alarms.abnormal_ignition = this._is_1(alarms_dword, 27)
        alarms.abnormal_movement = this._is_1(alarms_dword, 28)
        alarms.collision_rollover = this._is_1(alarms_dword, 29)
        alarms.rollover_warning = this._is_1(alarms_dword, 30)
        alarms.abnormal_open = this._is_1(alarms_dword, 31)

        const status = {
            acc: null,
            positioning: null,
            south_latitude: null,
            west_longitude: null,
            stop_operation: null,
            encryption_plugin: null,

            have_load: null,
            full_load: null,

            oil_disconnected: null,
            circuit_disconnected: null,
            door_locked: null,

            front_door: null,
            middle_door: null,
            back_door: null,
            driver_door: null,
            custom_door: null,
            gps_positioning: null,
            beidou_positioning: null,
            glonass_positioning: null,
            galileo_positioning: null,
        }

        const status_dword = data.slice(4, 8)
        status.acc = this._is_1(status_dword, 0)
        status.positioning = this._is_1(status_dword, 1)
        status.south_latitude = this._is_1(status_dword, 2)
        status.west_longitude = this._is_1(status_dword, 3)
        status.stop_operation = this._is_1(status_dword, 4)
        status.encryption_plugin = this._is_1(status_dword, 5)

        status.have_load = this._is_1(status_dword, 8)
        status.full_load = this._is_1(status_dword, 9)

        status.oil_disconnected = this._is_1(status_dword, 10)
        status.circuit_disconnected = this._is_1(status_dword, 11)
        status.door_locked = this._is_1(status_dword, 12)

        status.front_door = this._is_1(status_dword, 13)
        status.middle_door = this._is_1(status_dword, 14)
        status.back_door = this._is_1(status_dword, 15)
        status.driver_door = this._is_1(status_dword, 16)
        status.custom_door = this._is_1(status_dword, 17)
        status.gps_positioning = this._is_1(status_dword, 18)
        status.beidou_positioning = this._is_1(status_dword, 19)
        status.glonass_positioning = this._is_1(status_dword, 20)
        status.galileo_positioning = this._is_1(status_dword, 21)

        // 纬度
        const latitude = data.readUIntBE(8, 4)
        // 经度
        const longitude = data.readUIntBE(12, 4)
        // 高程
        const altitude = data.readUIntBE(16, 2)
        // 速度
        const speed = data.readUIntBE(18, 2)
        // 方向
        const direction = data.readUIntBE(20, 2)
        // 时间
        const time = data.slice(22, 28).toString('hex')

        let extra_info_info_type
        let extra_info_info_id
        let extra_info
        let extra_info_info

        // 位置附加信息项列表
        if (data.length > 28) {
            extra_info = []
            let index = 28
            while (index < data.length) {
                const extra_info_id = data.slice(index, index + 1).toString('hex')

                if (['01', '2b'].includes(extra_info_id)) {
                    extra_info_info = data.readUIntBE(index + 2, 4)
                    extra_info.push({
                        'id': extra_info_id,
                        'info': extra_info_info,
                    })
                    index += 6
                }
                else if (['02', '03', '04'].includes(extra_info_id)) {
                    extra_info_info = data.readUIntBE(index + 2, 2)
                    extra_info.push({
                        'id': extra_info_id,
                        'info': extra_info_info,
                    })
                    index += 4
                } else if (extra_info_id === '11') {
                    extra_info_info_type = data.readUIntBE(index + 2, 1)
                    if (extra_info_info_type === 0) {
                        extra_info.push({
                            'id': extra_info_id,
                            'info': {
                                type: 0,
                                id: null,
                            },
                        })
                        index += 3
                    } else if ([1, 2, 3, 4].includes(extra_info_info_type)) {
                        extra_info_info_id = data.readUIntBE(index + 3, 4)
                        extra_info.push({
                            'id': extra_info_id,
                            'info': {
                                type: extra_info_info_type,
                                id: extra_info_info_id,
                            },
                        })
                        index += 7
                    } else {
                        throw 'The location type of the additional information of speed alarm is wrong'
                    }
                } else if (extra_info_id == '12') {
                    extra_info_info_type = data.readUIntBE(index + 2, 1)
                    extra_info_info_id = data.readUIntBE(index + 3, 4)
                    const extra_info_info_direction = data.readUIntBE(index + 7, 1)
                    extra_info.push({
                        'id': extra_info_id,
                        'info': {
                            'type': extra_info_info_type,
                            'id': extra_info_info_id,
                            'direction': extra_info_info_direction,
                        },
                    })
                    index += 8
                } else if (extra_info_id === '13') {
                    extra_info_info_id = data.readUIntBE(index + 2, 4)
                    const extra_info_info_time = data.readUIntBE(index + 6, 2)
                    const extra_info_info_result = data.readUIntBE(index + 8, 1)
                    extra_info.push({
                        'id': extra_info_id,
                        'info': {
                            'id': extra_info_info_id,
                            'time': extra_info_info_time,
                            'result': extra_info_info_result,
                        },
                    })
                    index += 9
                }
                else if (extra_info_id === '25') {
                    extra_info_info = data.readUIntBE(index + 2, 4)
                    extra_info.push({
                        'id': extra_info_id,
                        'info': {
                            'low_beam': this._is_1(extra_info_info, 0),
                            'high_beam': this._is_1(extra_info_info, 1),
                            'right_turn': this._is_1(extra_info_info, 2),
                            'left_turn': this._is_1(extra_info_info, 3),
                            'brake': this._is_1(extra_info_info, 4),
                            'reverse_gear': this._is_1(extra_info_info, 5),
                            'fog_light': this._is_1(extra_info_info, 6),
                            'shrine_light': this._is_1(extra_info_info, 7),
                            'horn': this._is_1(extra_info_info, 8),
                            'air_conditioning': this._is_1(extra_info_info, 9),
                            'neutral_gear': this._is_1(extra_info_info, 10),
                            'retarder': this._is_1(extra_info_info, 11),
                            'abs': this._is_1(extra_info_info, 12),
                            'heater': this._is_1(extra_info_info, 13),
                            'clutch': this._is_1(extra_info_info, 14)
                        },
                    })
                    index += 6
                } else if (extra_info_id === '2a') {
                    // extra_info_info_id = data.readUIntBE(index + 2, 4)
                    extra_info_info = data.readUIntBE(index + 2, 2)

                    extra_info.push({
                        'id': extra_info_id,
                        'info': {
                            'id': extra_info_info_id,
                            'info': {
                                'deep_hibernation': this._is_1(extra_info_info, 0),
                                'hibernation': this._is_1(extra_info_info, 1)
                            }
                        },
                    })
                    index += 4
                }
                else if (['30', '31'].includes(extra_info_id)) {
                    extra_info.push({
                        'id': extra_info_id,
                        'info': data.readUIntBE(index + 2, 1)
                    })
                    index += 3
                }
            }
        } else {
            extra_info = null
        }
        return {
            'alarms': alarms,
            'status': status,
            'latitude': latitude,
            'longitude': longitude,
            'altitude': altitude,
            'speed': speed,
            'direction': direction,
            'time': time,
            'extra_info': extra_info,
        }
    }

    encode(params) {
        let alarm_state = 0b00000000000000000000000000000000
        let state_data = 0b00000000000000000000000000000000

        const { alarms, status, latitude, longitude, altitude, speed, direction, time, extra_info } = params

        const { emergency_alarm, speed_alarm, fatigue_driving, danger_warning, gnss_malfunction, gnss_disconnected,
            gnss_short, terminal_undervoltage, terminal_down, display_malfunction, tts_malfunction, camera_malfunction,
            ic_malfunction, speed_warning, fatigue_warning, overtime_driving, overtime_parking, access_area, access_route,
            road_time, route_deviation, vss_malfunction, abnormal_oil, vehicle_stolen, abnormal_ignition,
            abnormal_movement, collision_warning, rollover_warning, abnormal_open } = alarms

        const { acc, positioning, south_latitude, west_longitude, stop_operation, encryption_plugin,
            have_load, full_load, oil_disconnected, circuit_disconnected, door_locked, front_door,
            middle_door, back_door, driver_door, custom_door, gps_positioning, beidou_positioning,
            glonass_positioning, galileo_positioning } = status

        if (emergency_alarm === 1) { alarm_state |= 0b00000000000000000000000000000001 }
        if (speed_alarm === 1) { alarm_state |= 0b00000000000000000000000000000010 }
        if (fatigue_driving === 1) { alarm_state |= 0b00000000000000000000000000000100 }
        if (danger_warning === 1) { alarm_state |= 0b00000000000000000000000000001000 }
        if (gnss_malfunction === 1) { alarm_state |= 0b00000000000000000000000000010000 }
        if (gnss_disconnected === 1) { alarm_state |= 0b00000000000000000000000000100000 }
        if (gnss_short === 1) { alarm_state |= 0b00000000000000000000000001000000 }
        if (terminal_undervoltage === 1) { alarm_state |= 0b00000000000000000000000010000000 }
        if (terminal_down === 1) { alarm_state |= 0b00000000000000000000000100000000 }
        if (display_malfunction === 1) { alarm_state |= 0b00000000000000000000001000000000 }
        if (tts_malfunction === 1) { alarm_state |= 0b00000000000000000000010000000000 }
        if (camera_malfunction === 1) { alarm_state |= 0b00000000000000000000100000000000 }
        if (ic_malfunction === 1) { alarm_state |= 0b00000000000000000001000000000000 }
        if (speed_warning === 1) { alarm_state |= 0b00000000000000000010000000000000 }
        if (fatigue_warning === 1) { alarm_state |= 0b00000000000000000100000000000000 }
        if (overtime_driving === 1) { alarm_state |= 0b00000000000000001000000000000000 }
        if (overtime_parking === 1) { alarm_state |= 0b00000000000000010000000000000000 }
        if (access_area === 1) { alarm_state |= 0b00000000000000100000000000000000 }
        if (access_route === 1) { alarm_state |= 0b00000000000001000000000000000000 }
        if (road_time === 1) { alarm_state |= 0b00000000000010000000000000000000 }
        if (route_deviation === 1) { alarm_state |= 0b00000000000100000000000000000000 }
        if (vss_malfunction === 1) { alarm_state |= 0b00000000001000000000000000000000 }
        if (abnormal_oil === 1) { alarm_state |= 0b00000000010000000000000000000000 }
        if (vehicle_stolen === 1) { alarm_state |= 0b00000000100000000000000000000000 }
        if (abnormal_ignition === 1) { alarm_state |= 0b00000001000000000000000000000000 }
        if (abnormal_movement === 1) { alarm_state |= 0b00000010000000000000000000000000 }
        if (collision_warning === 1) { alarm_state |= 0b00000100000000000000000000000000 }
        if (rollover_warning === 1) { alarm_state |= 0b00001000000000000000000000000000 }
        if (abnormal_open === 1) { alarm_state |= 0b00010000000000000000000000000000 }


        if (acc === 1) { state_data |= 0b00000000000000000000000000000001 }
        if (positioning === 1) { state_data |= 0b00000000000000000000000000000010 }
        if (south_latitude === 1) { state_data |= 0b00000000000000000000000000000100 }
        if (west_longitude === 1) { state_data |= 0b00000000000000000000000000001000 }
        if (stop_operation === 1) { state_data |= 0b00000000000000000000000000010000 }
        if (encryption_plugin === 1) { state_data |= 0b00000000000000000000000000100000 }
        if (have_load === 1) { state_data |= 0b00000000000000000000000001000000 }
        if (full_load === 1) { state_data |= 0b00000000000000000000000010000000 }
        if (oil_disconnected === 1) { state_data |= 0b00000000000000000000000100000000 }
        if (circuit_disconnected === 1) { state_data |= 0b00000000000000000000001000000000 }
        if (door_locked === 1) { state_data |= 0b00000000000000000000010000000000 }
        if (front_door === 1) { state_data |= 0b00000000000000000000100000000000 }
        if (middle_door === 1) { state_data |= 0b00000000000000000001000000000000 }
        if (back_door === 1) { state_data |= 0b00000000000000000010000000000000 }
        if (driver_door === 1) { state_data |= 0b00000000000000000100000000000000 }
        if (custom_door === 1) { state_data |= 0b00000000000000001000000000000000 }
        if (gps_positioning === 1) { state_data |= 0b00000000000000010000000000000000 }
        if (beidou_positioning === 1) { state_data |= 0b00000000000000100000000000000000 }
        if (glonass_positioning === 1) { state_data |= 0b00000000000001000000000000000000 }
        if (galileo_positioning === 1) { state_data |= 0b00000000000010000000000000000000 }

        let result_buf
        let data = Buffer.alloc(22)

        data.writeUIntBE(alarm_state, 0, 4)
        data.writeUIntBE(state_data, 4, 4)

        data.writeUIntBE(latitude, 8, 4)
        data.writeUIntBE(longitude, 12, 4)
        data.writeUIntBE(altitude, 16, 2)
        data.writeUIntBE(speed, 18, 2)
        data.writeUIntBE(direction, 20, 2)
        data = Buffer.concat([data, Buffer.from(time, 'hex')])
        // console.log('extra_info', extra_info)
        if (extra_info != null | []) {
            for (let i = 0; i < extra_info.length; i += 1) {
                const { id, info } = extra_info[i]
                if (['01', '2b'].includes(id)) {
                    result_buf = Buffer.alloc(5)
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf.writeUIntBE(4, 0, 1)
                    result_buf.writeUIntBE(info, 1, 4)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])

                } else if (['02', '03', '04'].includes(id)) {
                    result_buf = Buffer.alloc(3)
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf.writeUIntBE(2, 0, 1)
                    result_buf.writeUIntBE(info, 1, 2)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])

                } else if (id === '11') {
                    const { type } = info
                    if (type === 0) {
                        result_buf = Buffer.alloc(2)
                        const id_buf = Buffer.from(id, 'hex')
                        result_buf.writeUIntBE(1, 0, 1)
                        result_buf.writeUIntBE(type, 1, 1)
                        data = Buffer.concat([data, id_buf, result_buf])

                    } else {
                        const { Section_id } = info
                        result_buf = Buffer.alloc(6)
                        const id_buf = Buffer.from(id, 'hex')
                        result_buf.writeUIntBE(5, 0, 1)
                        result_buf.writeUIntBE(type, 1, 1)
                        result_buf.writeUIntBE(Section_id, 2, 4)
                        data = Buffer.concat([data, id_buf, result_buf])
                    }
                } else if (id === '12') {
                    const { type, Section_id, direction } = info
                    result_buf = Buffer.alloc(7)
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf.writeUIntBE(6, 0, 1)
                    result_buf.writeUIntBE(type, 1, 1)
                    result_buf.writeUIntBE(Section_id, 2, 4)
                    result_buf.writeUIntBE(direction, 1, 1)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])

                } else if (id === '13') {
                    const { Section_id, time, result } = info
                    result_buf = Buffer.alloc(8)
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf.writeUIntBE(7, 0, 1)
                    result_buf.writeUIntBE(Section_id, 1, 4)
                    result_buf.writeUIntBE(time, 5, 2)
                    result_buf.writeUIntBE(result, 6, 1)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])

                } else if (id === '25') {
                    result_buf = Buffer.alloc(5)
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf.writeUIntBE(4, 0, 1)
                    result_buf.writeUIntBE(info, 1, 4)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])

                } else if (id === '2a') {
                    const { deep_hibernation, hibernation } = info
                    result_buf = Buffer.alloc(3)
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf.writeUIntBE(2, 0, 1)
                    result_buf.writeUIntBE(deep_hibernation, 1, 1)
                    result_buf.writeUIntBE(hibernation, 2, 1)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])

                } else if (id === '2b') {
                    result_buf = Buffer.alloc(5)
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf.writeUIntBE(4, 0, 1)
                    result_buf.writeUIntBE(info, 0, 4)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])

                } else if (['30', '31'].includes(id)) {
                    const id_buf = Buffer.from(id, 'hex')
                    result_buf = Buffer.alloc(2)
                    result_buf.writeUIntBE(1, 0, 1)
                    result_buf.writeUIntBE(info, 1, 1)
                    result_buf = Buffer.concat([id_buf, result_buf])
                    data = Buffer.concat([data, result_buf])
                }
            }
        }
        return data
    }
}
module.exports = JTT808Body0200
