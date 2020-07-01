const JTT808Body0200 = require('./JTT808Body0200')
const JTT808body0200 = new JTT808Body0200()

class JTT808Body0704 {
    body = {
        "data_type": 0,
        "location_info": [
            {
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
                "latitude": 30120334,
                "longitude": 109203745,
                "altitude": 802,
                "speed": 670,
                "direction": 30,
                "time": "191106173319",
                "extra_info": [
                    {
                        "id": "01",
                        "info": 125000
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
                            "type": 0,
                            "id": null
                        }
                    },
                    {
                        "id": "12",
                        "info": {
                            "type": 4,
                            "id": 2,
                            "direction": 1
                        }
                    },
                    {
                        "id": "13",
                        "info": {
                            "id": 3,
                            "time": 513,
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
        ]
    }


    decode(data) {
        const data_Number = data.readUIntBE(0, 2)
        const data_type = data.readUIntBE(2, 1)
        const location_info = []
        let index = 3
        const result = { n: null, location_info_data: null }
        for (let i = 0; i < data.readUIntBE(0, 2); i += 1) {
            const n = data.readUIntBE(index, 2)
            result.n = n
            result.location_info_data = JTT808body0200.decode(data.slice(index + 2, index + 2 + n), 'gbk')
            location_info.push(result)
            index += 2 + n
        }
        return {
            'data_Number': data_Number,
            'data_type': data_type,
            'location_info': location_info
        }
    }

    encode(params) {
        const { data_type, location_info } = params
        let data = Buffer.alloc(3)
        data.writeUIntBE(location_info.length, 0, 2)
        data.writeUIntBE(data_type, 2, 1)
        for (let i = 0; i < location_info.length; i += 1) {
            const len = Buffer.alloc(2)
            const location_info_buf = JTT808body0200.encode(location_info[i])
            len.writeUIntBE(location_info_buf.length, 0, 2)
            data = Buffer.concat([data, len, location_info_buf])
        }
        return data
    }
}

module.exports = JTT808Body0704
