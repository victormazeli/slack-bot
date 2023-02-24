import moment from "moment"
const currentDate = moment().format('LL');

export default {
	"type": "home",
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": " :newspaper: Global Headlines Today :newspaper: ",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${currentDate} | Top stories`
			}
		},
		{
			"type": "divider"
		},
	]
}