import OpenAI from "openai"
import { getCurrentWeather, getLocation, functions } from "./tools"
import { renderNewMessage } from "./dom"

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

const messages = [
                { role: "system", content: "You are a helpful AI agent. Give highly specific answers based on the information you're provided. Prefer to gather information with the tools provided to you rather than giving basic, generic answers." },
            ]

async function agent(query){
        
            messages.push({ role: "user", content: query })
            renderNewMessage(query, "user")
            
        const runner = openai.beta.chat.completions.runFunctions({
            model: "gpt-4-1106-preview",
            messages,
            functions
    }).on("message", (message) => console.log(message))
    
    const finalContent = await runner.finalContent()
    messages.push({role: "system", content: finalContent})
    renderNewMessage(finalContent, "assistant")
    
}

document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputElement = document.getElementById("user-input")
    inputElement.focus()
    const formData = new FormData(event.target)
    const query = formData.get("user-input")
    event.target.reset()
    await agent(query)
})


