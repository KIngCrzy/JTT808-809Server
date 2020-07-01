const JTT809body9601 = require('./JTT809Body9601')
const JTT809body1200 = require('./JTT809Body1200')
const JTT809Body9601 = new JTT809body9601()
class JTT809Body9600 extends JTT809body1200 {
	constructor() {
		super()
		this.DATA_TYPE = {
			9601: JTT809Body9601,
		}
	}

	body = {
		'9601': {
			"vehicle_no": "浙A25307",
			"vehicle_color": 1,
			"data_type": "9601",
			"data": null
		},
	}
}
module.exports = JTT809Body9600
