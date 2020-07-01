class JTT808Body8604 {
    body = {
        "id": 0,
        "limit_time": 1,
        "limit_speed": 1,
        "in_driver": 0,
        "in_platform": 1,
        "out_driver": 0,
        "out_platform": 1,
        "south_latitude": 0,
        "west_longitude": 0,
        "start_time": "000000083000",
        "end_time": "000000180000",
        "open_door": 0,
        "communication_module": 0,
        "collect_gnss": 0,
        "maximum_speed": 60,
        "overspeed_duration": 5,
        "vertices": [
            {
                "latitude": 30120334,
                "longitude": 109203745
            },
            {
                "latitude": 30120334,
                "longitude": 109203745
            },
        ]
    }

    decode(data) {
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
            "start_time": null,
            "end_time": null,
            "maximum_speed": null,
            "overspeed_duration": null,
            "total": null,
            "vertices": null
        }
        const vertices = {
            'latitude': null,
            'longitude': null
        }
        const arr = []
        const list = []
        arr[0] = data.readUIntBE(4, 2)

        const a = []
        const b = []
        const c = []
        const d = []

        a[0] = arr[0] >> 0 & 0b1 ? data.slice(6, 12) : ''
        b[0] = arr[0] >> 0 & 0b1 ? data.slice(12, 18) : ''
        c[0] = arr[0] >> 1 & 0b1 ? data.slice(18, 20) : ''
        d[0] = arr[0] >> 1 & 0b1 ? data.slice(20, 21) : ''

        parameter.id = data.readUIntBE(0, 4)
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
        parameter.start_time = (arr[0] >> 0) & 0b1 ? a[0].toString('hex') : ''
        parameter.end_time = (arr[0] >> 0) & 0b1 ? b[0].toString('hex') : ''
        parameter.maximum_speed = (arr[0] >> 1) & 0b1 ? c[0].readUIntBE(0, 2) : ''
        parameter.overspeed_duration = (arr[0] >> 1) & 0b1 ? d[0].readUIntBE(0, 1) : ''

        const len = 6 + a[0].length + b[0].length + c[0].length + d[0].length

        parameter.total = data.readUIntBE(len, 2)
        const vertices_buf = data.slice(len + 2)
        console.log(vertices_buf)
        for (let i = 0; i < parameter.total; i += 1) {
            vertices.longitude = vertices_buf.readUIntBE(i * 4, 4)
            vertices.latitude = vertices_buf.readUIntBE(i * 4 + 4, 4)
            list.push(vertices)
        }
        parameter.vertices = list
        return parameter
    }

    encode(params) {
        let attribute = 0b0000000000000000
        const {
            id, limit_time, limit_speed, in_driver, in_platform,
            out_driver, out_platform, south_latitude, start_time, end_time, west_longitude,
            forbid_open, close_communication, collect_position,
            maximum_speed, overspeed_duration, vertices,
        } = params
        let data = Buffer.alloc(6)
        data.writeUIntBE(id, 0, 4)
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
        data.writeUIntBE(attribute, 4, 2)
        if (limit_time) {
            // 起始时间           
            const start_time_buf = Buffer.from(start_time, 'hex')
            // 结束时间
            const end_time_buf = Buffer.from(end_time, 'hex')
            data = Buffer.concat([data, start_time_buf, end_time_buf])
        }
        if (limit_speed) {
            const result = Buffer.alloc(3)
            result.writeUIntBE(maximum_speed, 0, 2)
            result.writeUIntBE(overspeed_duration, 2, 1)
            data = Buffer.concat([data, result])
        }
        const vertices_len_buf = Buffer.alloc(2)
        vertices_len_buf.writeUIntBE(vertices.length, 0, 2)
        data = Buffer.concat([data, vertices_len_buf])

        const len = vertices.length
        const coordinate = Buffer.alloc(len * 8)
        for (let i = 0; i < len; i += 1) {
            coordinate.writeUIntBE(vertices[i].latitude, 2 * i * 4, 4)
            coordinate.writeUIntBE(vertices[i].longitude, (2 * i + 1) * 4, 4)
        }
        data = Buffer.concat([data, coordinate])
        return data
    }
}
module.exports = JTT808Body8604
