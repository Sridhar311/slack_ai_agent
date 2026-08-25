import pkg from '@slack/bolt';
import {WebClient} from '@slack/web-api';
import {ChatOpenAI} from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const { App } = pkg;
const client = new WebClient();

const log ={
    info: (message, ...args) => console.log(`[INFO] ${message}`, ...args),
    error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),  
    debug: (message, ...args) => process.env.NODE_ENV === 'development' && console.debug(`[DEBUG] ${message}`, ...args),
}

class SlacAiAgent{
    constructor(){
        this.app = express();
        this.slack= new App({
            token: process.env.SLACK_BOT_TOKEN,
            signingSecret: process.env.SLACK_SIGNING_SECRET,
            socketMode: true,
            appToken: process.env.SLACK_APP_TOKEN
        });
        this.WebClient = new WebClient(process.env.SLACK_BOT_TOKEN);
        this.openai= new ChatOpenAI({
            model: 'gpt-4',
            temperature: 0.3,
            apiKey: process.env.OPENAI_API_KEY 
    });
    this.setupSlackEvents();
    this.setupExpress();
    
    }
}