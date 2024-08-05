import OpenAI from "openai"
import { getCurrentWeather, getLocation, tools } from "./tools"

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
        
        const MAX_ITERATIONS = 5;
        
        for(let i=0; i<=MAX_ITERATIONS; i++){
        //     console.log(`Iteration #${i + 1}`)
            const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages,
            tools
        })
        
        const { finish_reason : finishReason, message } = response.choices[0]
        const { tool_calls: toolCalls } = message
        console.log(toolCalls)
        
        messages.push(message)
        
        if (finishReason === "stop") {
            console.log(message.content)
            console.log("AGENT ENDING")
            return
        } else if (finishReason === "tool_calls") {
            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name
                const functionToCall = availableFunctions[functionName]
                const functionArgs = JSON.parse(toolCall.function.arguments)
                const functionResponse = await functionToCall(functionArgs)
                console.log(functionResponse)
                messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    name: functionName,
                    content: functionResponse
                })
            }
        }
        
    }
}


// console.log(await agent("What is the current weather in my location?"))
await agent("What is the current weather in my location?")
// await agent("What is my current location?")
// await agent("How are you today?")
//  await agent("What is the current weather in Tokyo, New York City?")

