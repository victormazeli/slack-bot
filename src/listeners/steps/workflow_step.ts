import { WorkflowStep } from "@slack/bolt";
import channels_block from "../blocks/channels_block";
import numeric_options_block from "../blocks/numeric_options_block";
import query_blocks from "../blocks/query_blocks";
import { fetchLatestNews, mapArticleForDisplay} from "../../services/news.service"

const ws = new WorkflowStep('get_news', {
	edit: async ({ ack, step, configure }) => {
		await ack();

		const blocks = []; 

		const numericOptions = numeric_options_block;
		const channels = channels_block;
		const queryBlock = query_blocks

		blocks.push(numericOptions);
		blocks.push(channels);
		blocks.push(queryBlock);

		await configure({ blocks });


    },
	save: async ({ ack, step, view, update }) => {
		await ack();

		const { values } = view.state;
		// console.log("state values >>", values);
		// console.log("state values options >>", values["num_articles"]["_"]["selected_option"]);
		// console.log("state values  channels >>", values["channel_ids"]["_"]["selected_channels"]);
		const query = values["query"]["_"]["value"];
		const channels = values["channel_ids"]["_"]["selected_channels"];
		const num_articles = values["num_articles"]["_"]["selected_option"];


		const inputs = {
			num_articles: { value: num_articles?.value },
			query: { value: query },
			channels: { value: channels}
		};

		const outputs = channels?.map((channel_id: any) => {
			return {
				type: 'text',
				name: channel_id,
				label: 'posted message timestamp',
			}
		});


		await update({ inputs, outputs });
	},
	execute: async ({ step, complete, client, fail }) => {
		const { inputs } = step;
		const num_articles = inputs["num_articles"]["value"];
		const query = inputs["query"]["value"];
		const channels = inputs["channels"]["value"];
		let articles;
		try {
			articles = await fetchLatestNews(Number(num_articles), 1, query);
		} catch (err) {
			fail({error: {message: "Failed to fetch news articles "}});
			return
		}
		let outputs: any = {};

		try {
			if (typeof articles === "object") {
				for (const article of articles) {
					let blocks = await mapArticleForDisplay(article);
					for (const channel of channels) {
						const response = await client.chat.postMessage({channel: channel, blocks: blocks, unfurl_links: false, unfurl_media: false, text: article.title});
						outputs[channel] = response.message?.ts
					}
				}
				
			}else{
				for (const channel of channels) {
					const response = await client.chat.postMessage({channel: channel, text: `No article found`});
						outputs[channel] = response.message?.ts
				}

			}
			
		} catch (err) {
			fail({error: {message: "Notification Failed"}});
			return
		}

		complete({ outputs });
	},
});

export const workFlowStep = ws;