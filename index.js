import OpenAI from "openai"
import { getCurrentWeather, getLocation, tools } from "./tools"

// Something to stop the execution while developing
const devMode = false;
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
        
        const MAX_ITERATIONS = 5;
        
        // for(let i=0; i<=MAX_ITERATIONS; i++){
        //     console.log(`Iteration #${i + 1}`)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            tools
        })
        
        // const responseText = response.choices[0].message.content
        //console.log(responseText)
        console.log(response)
        
    }
// }

// console.log(await agent("What is the current weather in my location?"))
await agent("What is my current location?")

