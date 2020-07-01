const JTT809body1201 = require('./JTT809Body1201')
const JTT809body1202 = require('./JTT809Body1202')
const JTT809body1203 = require('./JTT809Body1203')
const JTT809body1205 = require('./JTT809Body1205')
const JTT809body1206 = require('./JTT809Body1206')
const JTT809body1207 = require('./JTT809Body1207')
const JTT809body1208 = require('./JTT809Body1208')
const JTT809body1209 = require('./JTT809Body1209')
const JTT809body120a = require('./JTT809Body120a')
const JTT809body120b = require('./JTT809Body120b')

const JTT809body1300 = require('./JTT809Body1300')
const iconv = require('iconv-lite')

class JTT809Body1200 extends JTT809body1300 {
    constructor() {
        super()
        this.DATA_TYPE = {
            '1201': new JTT809body1201(),
            '1202': new JTT809body1202(),
            '1203': new JTT809body1203(),
            '1205': new JTT809body1205(),
            '1206': new JTT809body1206(),
            '1207': new JTT809body1207(),
            '1208': new JTT809body1208(),
            '1209': new JTT809body1209(),
            '120a': new JTT809body120a(),
            '120b': new JTT809body120b(),
        }
    }

    body = {
        '1201': {
            'vehicle_no': '蒙E88888',
            'vehicle_color': 1,
            'data_type': '1201',
            'data': {
                'platform_id': 'ABCD1234567',
                'producer_id': 'AB123456789',
                'terminal_model_type': 'AB123456',
                'terminal_id': 'A112233',
                'terminal_simcode': '1234567891011'
            }
        },
        '1202': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1202",
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
        '1203': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1203",
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
        '1205': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1205",
            "data": null
        },
        '1206': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1206",
            "data": null
        },
        '1207': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1207",
            "data": {
                "start_time": 1574319191,
                "end_time": 1574322112
            }
        },
        '1208': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1208",
            "data": null
        },
        '1209': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1209",
            "data": {
                "start_time": 1574319191,
                "end_time": 1574322112
            }
        },
        '120a': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "120a",
            "data": {
                "driver_name": "李三",
                "driver_id": "510000199901010002",
                "licence": "SICHUAN10000",
                "org_name": "四川省交通运输厅"
            }
        },
        '120b': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "120b",
            "data": {
                "ewaybill_info": "测试"
            }
        },

    }

    decode(data) {
        return {
            'vehicle_no': iconv.decode(data.slice(0, 21), 'gbk').replace(/\u0000/g, ''),
            'vehicle_color': data.readUIntBE(21, 1),
            ...super.decode(data.slice(22))
        }
    }

    encode(params) {
        const { vehicle_no, vehicle_color } = params
        let vehicle_no_buf = Buffer.alloc(21);
        let vehicle_color_buf = Buffer.alloc(1);

        vehicle_no_buf.write(iconv.encode(vehicle_no, 'gbk').toString('hex'), 0, 21, 'hex')
        vehicle_color_buf.writeUIntBE(vehicle_color, 0, 1)
        return Buffer.concat([vehicle_no_buf, vehicle_color_buf, super.encode(params)])
    }

}
module.exports = JTT809Body1200
