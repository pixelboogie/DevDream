export async function getCurrentWeather() {
    const weather = {
        temperature: "90",
        unit: "fahrenheit",
        forecast: "Mostly sunny"
    }
    return JSON.stringify(weather);
}

export async function getLocation() {
    return "Sugar Land, TX"
}
