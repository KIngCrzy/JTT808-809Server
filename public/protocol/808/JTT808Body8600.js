class JTT808Body8600 {
    body = {
        "type": 0,
        "list": [
            {
                "id": 0,
                "limit_time": 0,
                "limit_speed": 0,
                "in_driver": 0,
                "in_platform": 1,
                "out_driver": 0,
                "out_platform": 1,
                "south_latitude": 0,
                "west_longitude": 0,
                "latitude": 30120334,
                "longitude": 109203745,
                "radius": 100,
                "start_time": null,
                "end_time": null,
                "maximum_speed": null,
                "overspeed_duration": null
            },
            {
                "id": 1,
                "limit_time": 1,
                "limit_speed": 1,
                "in_driver": 0,
                "in_platform": 1,
                "out_driver": 0,
                "out_platform": 1,
                "south_latitude": 0,
                "west_longitude": 0,
                "latitude": 30120334,
                "longitude": 109203745,
                "radius": 200,
                "start_time": "000000083000",
                "end_time": "000000180000",
                "maximum_speed": 60,
                "overspeed_duration": 5
            },
        ]
    }

    decode(data) {
        const type = data.readUIntBE(0, 1)
        const total = data.readUIntBE(1, 1)
        const list = []
        const arr = []

        const parameter = {
            "id": null,
            "limit_time": null,
            "limit_speed": null,
            "in_driver": null,
            "in_platform": null,
            "out_driver": null,
            "out_platform": null,
            "south_latitude": null,
            "west_longitude": null,
            "forbid_open": null,
            "close_communication": null,
            "collect_position": null,
            "latitude": null,
            "longitude": null,
            "radius": null,
            "start_time": null,
            "end_time": null,
            "maximum_speed": null,
            "overspeed_duration": null
        }

        arr[0] = data.readUIntBE(6, 2)

        const a = []
        const b = []
        const c = []
        const d = []
        a[0] = arr[0] >> 0 & 0b1 ? data.slice(20, 26) : ''
        b[0] = arr[0] >> 0 & 0b1 ? data.slice(26, 32) : ''
        c[0] = arr[0] >> 1 & 0b1 ? data.slice(32, 34) : ''
        d[0] = arr[0] >> 1 & 0b1 ? data.slice(34, 35) : ''

        parameter.id = data.readUIntBE(2, 4)
        parameter.limit_time = (arr[0] >> 0) & 0b1
        parameter.limit_speed = (arr[0] >> 1) & 0b1
        parameter.in_driver = (arr[0] >> 2) & 0b1
        parameter.in_platform = (arr[0] >> 3) & 0b1
        parameter.out_driver = (arr[0] >> 4) & 0b1
        parameter.out_platform = (arr[0] >> 5) & 0b1
        parameter.south_latitude = (arr[0] >> 6) & 0b1
        parameter.west_longitude = (arr[0] >> 7) & 0b1
        parameter.forbid_open = (arr[0] >> 8) & 0b1
        parameter.close_communication = (arr[0] >> 14) & 0b1
        parameter.collect_position = (arr[0] >> 15) & 0b1

        parameter.latitude = data.readUIntBE(8, 4)
        parameter.longitude = data.readUIntBE(12, 4)
        parameter.radius = data.readUIntBE(16, 4)
        parameter.start_time = a[0]
        parameter.end_time = b[0]
        parameter.maximum_speed = c[0]
        parameter.overspeed_duration = d[0]

        list.push(parameter)
        let length = 0

        for (let i = 1; i < total; i += 1) {
            const parameter = {
                "id": null,
                "limit_time": null,
                "limit_speed": null,
                "in_driver": null,
                "in_platform": null,
                "out_driver": null,
                "out_platform": null,
                "south_latitude": null,
                "west_longitude": null,
                "forbid_open": null,
                "close_communication": null,
                "collect_position": null,
                "latitude": null,
                "longitude": null,
                "radius": null,
                "start_time": null,
                "end_time": null,
                "maximum_speed": null,
                "overspeed_duration": null
            }
            length = length + 18 + a[i - 1].length + b[i - 1].length + c[i - 1].length + d[i - 1].length
            const regional_attributes = data.readUIntBE(6 + length, 2)
            arr[i] = data.readUIntBE(6 + length, 2)
            a[i] = arr[i] >> 0 & 0b1 ? data.slice(20 + length, 26 + length) : ''
            b[i] = arr[i] >> 0 & 0b1 ? data.slice(26 + length, 32 + length) : ''
            c[i] = arr[i] >> 1 & 0b1 ? data.slice(32 + length, 34 + length) : ''
            d[i] = arr[i] >> 1 & 0b1 ? data.slice(34 + length, 35 + length) : ''

            parameter.id = data.readUIntBE(2 + length, 4)
            parameter.limit_time = (regional_attributes >> 0) & 0b1
            parameter.limit_speed = (regional_attributes >> 1) & 0b1
            parameter.in_driver = (regional_attributes >> 2) & 0b1
            parameter.in_platform = (regional_attributes >> 3) & 0b1
            parameter.out_driver = (regional_attributes >> 4) & 0b1
            parameter.out_platform = (regional_attributes >> 5) & 0b1
            parameter.south_latitude = (regional_attributes >> 6) & 0b1
            parameter.west_longitude = (regional_attributes >> 7) & 0b1
            parameter.forbid_open = (regional_attributes >> 8) & 0b1
            parameter.close_communication = (regional_attributes >> 14) & 0b1
            parameter.collect_position = (regional_attributes >> 15) & 0b1

            parameter.latitude = data.readUIntBE(8 + length, 4)
            parameter.longitude = data.readUIntBE(12 + length, 4)
            parameter.radius = data.readUIntBE(16 + length, 4)

            parameter.start_time = a[i].toString('hex')
            parameter.end_time = b[i].toString('hex')
            parameter.maximum_speed = c[i].readUIntBE(0, 2)
            parameter.overspeed_duration = d[i].readUIntBE(0, 1)
            list.push(parameter)
        }
        return {
            'type': type,
            'list': list,
        }
    }


    encode(parmas) {

        console.log(parmas)

        let attribute = 0b0000000000000000
        const { type, list } = parmas
        let data = Buffer.alloc(2)
        data.writeUInt8(type, 0)
        data.writeUInt8(list.length, 1)

        const list_buf = Buffer.alloc(6)

        for (let i = 0; i < list.length; i++) {
            const {
                id, limit_time, limit_speed, in_driver, in_platform,
                out_driver, out_platform, south_latitude, west_longitude, forbid_open, close_communication, collect_position,
                latitude, longitude, radius, start_time,
                end_time, maximum_speed, overspeed_duration
            } = list[i]
            list_buf.writeUIntBE(id, 0, 4)
            if (limit_time) {
                attribute |= 0b0000000000000001
            }
            if (limit_speed) {
                attribute |= 0b0000000000000010
            }
            if (in_driver) {
                attribute |= 0b0000000000000100
            }
            if (in_platform) {
                attribute |= 0b0000000000001000
            }
            if (out_driver) {
                attribute |= 0b0000000000010000
            }
            if (out_platform) {
                attribute |= 0b0000000000100000
            }
            if (south_latitude) {
                attribute |= 0b0000000001000000
            }
            if (west_longitude) {
                attribute |= 0b0000000010000000
            }
            if (forbid_open) {
                attribute |= 0b0000000100000000
            }
            if (close_communication) {
                attribute |= 0b0100000000000000
            }
            if (collect_position) {
                attribute |= 0b1000000000000000
            }

            list_buf.writeUIntBE(attribute, 4, 2)
            console.log(attribute);


            const attribute_bytes = Buffer.alloc(12)
            attribute_bytes.writeUIntBE(latitude, 0, 4)
            attribute_bytes.writeUIntBE(longitude, 4, 4)
            attribute_bytes.writeUIntBE(radius, 8, 4)

            data = Buffer.concat([data, list_buf, attribute_bytes])
            if (limit_time) {
                // 起始时间           
                const start_time_buf = Buffer.from(start_time, 'hex')
                // 结束时间
                const end_time_buf = Buffer.from(end_time, 'hex')
                data = Buffer.concat([data, start_time_buf, end_time_buf])
            }
            if (limit_speed) {
                const data1 = Buffer.alloc(3)
                data1.writeUIntBE(maximum_speed, 0, 2)
                data1.writeUIntBE(overspeed_duration, 2, 1)
                data = Buffer.concat([data, data1])
            }
        }
        return data
    }
}
module.exports = JTT808Body8600
