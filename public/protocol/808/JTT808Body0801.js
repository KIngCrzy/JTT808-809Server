const JTT808Body0200 = require('./JTT808Body0200')
const JTT808body0200 = new JTT808Body0200()

class JTT808Body0801 {
    body = {
        "media_id": 1,
        "media_type": 1,
        "media_format": 2,
        "event_type": 2,
        "channel_id": 2,
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
            "extra_info": [
                {
                    "id": "01",
                    "info": 10
                },
            ]
        },
        "media_data": "b5e7d7d3d4cbb5a5cafdbedda3ba"
    }

    decode(data) {
        const media_id = data.readUIntBE(0, 4)
        const media_type = data.readUIntBE(4, 1)
        const media_format = data.readUIntBE(5, 1)
        const event = data.readUIntBE(6, 1)
        const channel = data.readUIntBE(7, 1)
        const location_info = JTT808body0200.decode(data.slice(8, 36))
        const media_data = data.slice(36).toString('hex')

        return {
            'media_id': media_id,
            'media_type': media_type,
            'media_format': media_format,
            'event_type': event,
            'channel_id': channel,
            'location_info': location_info,
            'media_data': media_data
        }
    }

    encode(params) {
        console.log('parmars', params)
        const { media_id, media_type, media_format, event_type,
            channel_id, location_info, media_data } = params
        const data = Buffer.alloc(8)
        data.writeUIntBE(media_id, 0, 4)
        data.writeUIntBE(media_type, 4, 1)
        data.writeUIntBE(media_format, 5, 1)
        data.writeUIntBE(event_type, 6, 1)
        data.writeUIntBE(channel_id, 7, 1)
        const location_info_buf = JTT808body0200.encode(location_info)
        const data_buf = Buffer.from(media_data, 'hex')
        return Buffer.concat([data, location_info_buf, data_buf])
    }
}

module.exports = JTT808Body0801
