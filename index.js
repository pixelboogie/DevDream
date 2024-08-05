import OpenAI from "openai"
import { getCurrentWeather, getLocation, functions } from "./tools"

// Something to stop the execution while developing
const devMode = false;
// const devMode = true;
if(devMode){
    throw new Error("Just saving. I don't want to execute!"); I    
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const availableFunctions = {
    getCurrentWeather,
    getLocation
}


async function agent(query){
        const messages = [
                { role: "system", content: "You are a helpful AI agent. Give highly specific answers based on the information you're provided. Prefer to gather information with the tools provided to you rather than giving basic, generic answers." },
                { role: "user", content: query }
            ]
            
        const runner = openai.beta.chat.completions.runFunctions({
            model: "gpt-3.5-turbo-1106",
            messages,
            functions
    }).on("message", (message) => console.log(message))
    
    const finalContent = await runner.finalContent()
    console.log(finalContent)
    
}

await agent("What is the current weather in my location?")


