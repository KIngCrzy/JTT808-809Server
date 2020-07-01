class JTT808Body8606 {
    body = {
        "id": 0,
        "limit_time": 1,
        "in_driver": 0,
        "in_platform": 1,
        "out_driver": 0,
        "out_platform": 1,
        "start_time": "000000083000",
        "end_time": "000000180000",
        "vertices": [
            {
                "vertex_id": 0,
                "road_id": 0,
                "latitude": 30120334,
                "longitude": 109203745,
                "road_width": 5,
                "limit_time": 1,
                "limit_speed": 1,
                "south_latitude": 0,
                "west_longitude": 0,
                "upper_time": 600,
                "lower_time": 60,
                "maximum_speed": 60,
                "overspeed_duration": 5
            },
            {
                "vertex_id": 1,
                "road_id": 1,
                "latitude": 30120333,
                "longitude": 109203746,
                "road_width": 5,
                "limit_time": 1,
                "limit_speed": 0,
                "south_latitude": 0,
                "west_longitude": 0,
                "upper_time": 600,
                "lower_time": 60,
                "maximum_speed": null,
                "overspeed_duration": null
            },
        ]
    }

    decode(data) {
        let list = []
        const parameter = {
            "id": null,
            "limit_time": null,
            "in_driver": null,
            "in_platform": null,
            "out_driver": null,
            "out_platform": null,
            "start_time": null,
            "end_time": null,
            "vertices": null
        }
        parameter.id = data.readUIntBE(0, 4)
        const attributes = data.readUIntBE(4, 2)
        parameter.limit_time = (attributes >> 0) & 0b1
        parameter.in_driver = (attributes >> 2) & 0b1
        parameter.in_platform = (attributes >> 3) & 0b1
        parameter.out_driver = (attributes >> 4) & 0b1
        parameter.out_platform = (attributes >> 5) & 0b1
        parameter.start_time = (attributes >> 0) & 0b1 ? data.slice(6, 12).toString('hex') : ''
        parameter.end_time = (attributes >> 0) & 0b1 ? data.slice(12, 18).toString('hex') : ''

        const total = data.readUIntBE(6 + parameter.start_time.length / 2 + parameter.end_time.length / 2, 2)
        const data_buf = data.slice(8 + parameter.start_time.length / 2 + parameter.end_time.length / 2)

        const vertices_parameter = {
            'vertex_id': null,
            'road_id': null,
            'latitude': null,
            'longitude': null,
            'road_width': null,
            'limit_time': null,
            'limit_speed': null,
            'south_latitude': null,
            'west_longitude': null,
            'upper_time': null,
            'lower_time': null,
            'maximum_speed': null,
            'overspeed_duration': null
        }
        const arr = []

        arr[0] = data_buf.readUIntBE(17, 1)
        const a = []
        const b = []
        const c = []
        const d = []

        a[0] = arr[0] >> 0 & 0b1 ? data_buf.slice(18, 20) : ''
        b[0] = arr[0] >> 0 & 0b1 ? data_buf.slice(20, 22) : ''
        c[0] = arr[0] >> 1 & 0b1 ? data_buf.slice(22, 24) : ''
        d[0] = arr[0] >> 1 & 0b1 ? data_buf.slice(24, 25) : ''


        vertices_parameter.vertex_id = data_buf.readUIntBE(0, 4)
        vertices_parameter.road_id = data_buf.readUIntBE(4, 4)
        vertices_parameter.latitude = data_buf.readUIntBE(8, 4)
        vertices_parameter.longitude = data_buf.readUIntBE(12, 4)
        vertices_parameter.road_width = data_buf.readUIntBE(16, 1)

        vertices_parameter.limit_time = (arr[0] >> 0 & 0b1)
        vertices_parameter.limit_speed = (arr[0] >> 1 & 0b1)
        vertices_parameter.south_latitude = (arr[0] >> 2 & 0b1)
        vertices_parameter.west_longitude = (arr[0] >> 3 & 0b1)

        vertices_parameter.upper_time = a[0].readUIntBE(0, 2)
        vertices_parameter.lower_time = b[0].readUIntBE(0, 2)
        vertices_parameter.maximum_speed = c[0].readUIntBE(0, 2)
        vertices_parameter.overspeed_duration = d[0].readUIntBE(0, 1)
        list.push(vertices_parameter)
        parameter.vertices = list

        let length = 0
        for (let i = 1; i < total; i += 1) {
            const vertices_parameter = {
                'vertex_id': null,
                'road_id': null,
                'latitude': null,
                'longitude': null,
                'road_width': null,
                'limit_time': null,
                'limit_speed': null,
                'south_latitude': null,
                'west_longitude': null,
                'upper_time': null,
                'lower_time': null,
                'maximum_speed': null,
                'overspeed_duration': null
            }

            length = length + 18 + a[i - 1].length + b[i - 1].length + c[i - 1].length + d[i - 1].length

            const regional_attributes = data_buf.readUIntBE(17 + length, 1)
            arr[i] = data_buf.readUIntBE(17 + length, 1)
            a[i] = arr[i] >> 0 & 0b1 ? data_buf.readUIntBE(18 + length, 2) : ''
            b[i] = arr[i] >> 0 & 0b1 ? data_buf.readUIntBE(20 + length, 2) : ''
            c[i] = arr[i] >> 1 & 0b1 ? data_buf.readUIntBE(22 + length, 2) : ''
            d[i] = arr[i] >> 1 & 0b1 ? data_buf.readUIntBE(24 + length, 1) : ''

            vertices_parameter.vertex_id = data_buf.readUIntBE(0 + length, 4)
            vertices_parameter.road_id = data_buf.readUIntBE(4 + length, 4)
            vertices_parameter.latitude = data_buf.readUIntBE(8 + length, 4)
            vertices_parameter.longitude = data_buf.readUIntBE(12 + length, 4)
            vertices_parameter.road_width = data_buf.readUIntBE(16 + length, 1)
            vertices_parameter.limit_time = (regional_attributes >> 0) & 0b1
            vertices_parameter.limit_speed = (regional_attributes >> 1) & 0b1
            vertices_parameter.south_latitude = (regional_attributes >> 2) & 0b1
            vertices_parameter.west_longitude = (regional_attributes >> 3) & 0b1

            vertices_parameter.upper_time = a[i]
            vertices_parameter.lower_time = b[i]
            vertices_parameter.maximum_speed = c[i]
            vertices_parameter.maximum_speed = d[i]
            list.push(vertices_parameter)
        }
        return parameter
    }


    encode(params) {
        let route_attribute = 0b0000000000000000
        const {
            id, limit_time, in_driver, in_platform, out_driver, out_platform, start_time,
            end_time, vertices
        } = params
        let data = Buffer.alloc(6)
        data.writeUIntBE(id, 0, 4)
        if (limit_time) {
            route_attribute |= 0b0000000000000001
        }
        if (in_driver) {
            route_attribute |= 0b0000000000000100
        }
        if (in_platform) {
            route_attribute |= 0b0000000000001000
        }
        if (out_driver) {
            route_attribute |= 0b0000000000010000
        }
        if (out_platform) {
            route_attribute |= 0b0000000000100000
        }
        data.writeUIntBE(route_attribute, 4, 2)

        if (limit_time) {
            // 起始时间           
            const start_time_buf = Buffer.from(start_time, 'hex')
            // 结束时间
            const end_time_buf = Buffer.from(end_time, 'hex')
            data = Buffer.concat([data, start_time_buf, end_time_buf])
        }
        const vertices_len_buf = Buffer.alloc(2)
        vertices_len_buf.writeUIntBE(vertices.length, 0, 2)
        data = Buffer.concat([data, vertices_len_buf])

        const vertices_data_buf = Buffer.alloc(18)
        for (let i = 0; i < vertices.length; i += 1) {
            const { vertex_id, road_id, latitude, longitude, road_width, limit_time,
                limit_speed, south_latitude, west_longitude, upper_time, lower_time,
                maximum_speed, overspeed_duration
            } = vertices[i]
            vertices_data_buf.writeUIntBE(vertex_id, 0, 4)
            vertices_data_buf.writeUIntBE(road_id, 4, 4)
            vertices_data_buf.writeUIntBE(latitude, 8, 4)
            vertices_data_buf.writeUIntBE(longitude, 12, 4)
            vertices_data_buf.writeUIntBE(road_width, 16, 1)
            // 路段属性
            let road_attribute = 0b00000000
            if (limit_time) {
                road_attribute |= 0b00000001
            }
            if (limit_speed) {
                road_attribute |= 0b00000010
            }
            if (south_latitude) {
                road_attribute |= 0b00000100
            }
            if (west_longitude) {
                road_attribute |= 0b00001000
            }
            vertices_data_buf.writeUIntBE(road_attribute, 17, 1)
            data = Buffer.concat([data, vertices_data_buf])

            if (limit_time) {
                const upper_time_buf = Buffer.alloc(4)
                upper_time_buf.writeUIntBE(upper_time, 0, 2)
                upper_time_buf.writeUIntBE(lower_time, 2, 2)
                data = Buffer.concat([data, upper_time_buf])
            }
            if (limit_speed) {
                const maximum_speed_buf = Buffer.alloc(3)
                maximum_speed_buf.writeUIntBE(maximum_speed, 0, 2)
                maximum_speed_buf.writeUIntBE(overspeed_duration, 2, 1)
                data = Buffer.concat([data, maximum_speed_buf])
            }
        }
        return data
    }
}
module.exports = JTT808Body8606
