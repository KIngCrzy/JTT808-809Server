const JTT808Body0200 = require('./JTT808Body0200')
const JTT808body0200 = new JTT808Body0200()
class JTT808Body0802 {
    body = {
        "flow_number": 3136,
        "list": [
            {
                "media_id": 1,
                "media_type": 0,
                "channel_id": 1,
                "event_type": 0,
                "location_info": {
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
                    "extra_info": null
                }
            },
            {
                "media_id": 2,
                "media_type": 1,
                "channel_id": 0,
                "event_type": 0,
                "location_info": {
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
                        "acc": 1,
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
                    "extra_info": null
                }
            }
        ]
    }


    decode(data) {
        let items_list
        const flow_number = data.readUIntBE(0, 2)
        const list_length = data.readUIntBE(2, 2)
        console.log('list_length', list_length)
        if (list_length > 0) {
            items_list = []
            for (let i = 0; i < list_length; i += 1) {
                const item = {
                    'media_id': null,
                    'media_type': null,
                    'channel_id': null,
                    'event_type': null,
                    'location_info': null,
                }
                const item_index = 4 + i * 35
                item.media_id = data.readUIntBE(item_index, 4)
                item.media_type = data.readUIntBE(item_index + 4, 1)
                item.channel_id = data.readUIntBE(item_index + 5, 1)
                item.event_type = data.readUIntBE(item_index + 6, 1)
                item.location_info = JTT808body0200.decode(data.slice(item_index + 7, item_index + 35))
                items_list.push(item)
            }
        } else {
            items_list = null
        }
        return {
            'flow_number': flow_number,
            'list': items_list
        }
    }

    encode(params) {
        const { flow_number, list } = params
        let data = Buffer.alloc(4)
        data.writeUIntBE(flow_number, 0, 2)
        data.writeUIntBE(list.length, 2, 2)
        for (let i = 0; i < list.length; i += 1) {
            const { media_id, media_type, channel_id, event_type, location_info } = list[i]
            const data_buf = Buffer.alloc(7)
            data_buf.writeUIntBE(media_id, 0, 4)
            data_buf.writeUIntBE(media_type, 4, 1)
            data_buf.writeUIntBE(channel_id, 5, 1)
            data_buf.writeUIntBE(event_type, 6, 1)
            const location_info_buf = JTT808body0200.encode(location_info)
            data = Buffer.concat([data, data_buf, location_info_buf])
            console.log('data0802', data)
            console.log('data0802', data.length)

        }
        return data
    }
}

module.exports = JTT808Body0802
