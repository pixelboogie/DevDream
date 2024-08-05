import OpenAI from "openai"
import { getCurrentWeather, getLocation } from "./tools"

// Something to stop the execution while developing
const devMode = false;
if(devMode){
    throw new Error("Just saving. I don't want to execute!"); I    
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const location = await getLocation();
const weather = await getCurrentWeather();
/**
 * Goal - build an agent that can get the current weather at my current location
 * and give me some localized ideas of activities I can do.
 */
const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
        {
            role: "user",
            content: `Give me an idea for an activity based on my location of ${ location } and weather of ${ weather }`,
            
        }
    ]
})

console.log(response.choices[0].message.content)

