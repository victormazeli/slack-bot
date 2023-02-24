export default {
	type: "modal",
	title: {
		"type": "plain_text",
		"text": "Travel Bot",
		"emoji": true
	},
	submit: {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	close: {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	blocks: [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Fill out this form to find best hotels around your location",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Location",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"element": {
				"type": "radio_buttons",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "1",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "2",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "3",
							"emoji": true
						},
						"value": "value-2"
					}
				],
				"action_id": "radio_buttons-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Adults",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"element": {
				"type": "datepicker",
				"initial_date": "1990-04-28",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "datepicker-action"
			},
			"label": {
				"type": "plain_text",
				"text": "CheckIn",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"element": {
				"type": "datepicker",
				"initial_date": "1990-04-28",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "datepicker-action"
			},
			"label": {
				"type": "plain_text",
				"text": "CheckOut",
				"emoji": true
			}
		}
	]
}