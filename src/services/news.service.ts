import axios from "axios"
import "../utils/env"
import moment from "moment"
import app_homeBlock from "../blocks/app_home.block"
import { Block, KnownBlock } from "@slack/bolt"

export const fetchLatestNews = async (pageSize?: number, page?: number, q?: string) => {
    const options = {
        method: 'GET',
        url: `${process.env.NEW_API_BASE_URL}`,
        params: {domains: "techcrunch.com,thenextweb.com", q: q, pageSize: pageSize, page: page, apiKey: `${process.env.NEWS_API_KEY}`},
      };
      try {
        const response = await axios.request(options);
        console.log(response);
        if (response.data.status === "ok" && response.data.articles.length > 0) {
            return response.data.articles;
        }else {
            return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
}


export const mapDataForDisplay = async (pageSize?: number, page?: number, q?: string): Promise<(Block | KnownBlock)[]> => {
  let size = 5;
  let currentPage = 1;
  const getArticle = await fetchLatestNews(pageSize, page, q);
  const blocks = app_homeBlock.blocks
  if (typeof getArticle === "object") {
    for (const article of getArticle) {
      const heading = {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": article.title,
          "emoji": true
        }
      }
      blocks.push(heading);
      const articleDate ={
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": ` :stopwatch: ${article.publishedAt}`
          }
        ]
      }
      blocks.push(articleDate);
      const content = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": article.description
        },
        "accessory": {
          "type": "image",
          "image_url": article.urlToImage,
          "alt_text": "cute cat"
        }
      }
      blocks.push(content);
      
    }
    return blocks;
  }else{
    return []
  }
  

}

export const mapArticleForDisplay = async (article:any): Promise<(Block | KnownBlock)[]> => {
  const blocks = []
 
      const heading = {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": article.title,
          "emoji": true
        }
      }
      blocks.push(heading);
      const articleDate ={
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": ` :stopwatch: ${article.publishedAt}`
          }
        ]
      }
      blocks.push(articleDate);
      const content = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `${article.description.slice(0, 200)}... <${article.url}|Continue reading...>`
        },
        "accessory": {
          "type": "image",
          "image_url": article.urlToImage,
          "alt_text": "cute cat"
        }
      }
      blocks.push(content);
      
    return blocks;
 
  

}