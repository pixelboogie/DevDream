# DevDream

## Description
**DevDream** is an innovative AI agent project that leverages OpenAI's APIs to integrate and automate functionalities using JavaScript. The project is designed to create a sophisticated interactive agent capable of performing various tasks, such as fetching weather data and recommending activities based on location. Throughout its development, the project introduces and implements advanced concepts like stateless conversation management, dynamic function calls, and the seamless embedding of external tools into the AI's workflow.

This project is from the Scrimba course "Learn AI Agents" that I took through Coursera: https://www.coursera.org/learn/learn-ai-agents/

The project culminates in the integration of these functionalities into a user-friendly interface, demonstrating the practical application of OpenAI's powerful tools in building interactive, responsive AI agents.

## Features
- **API Key Setup and Configuration**: Establishes secure connections to OpenAI's APIs to enable advanced AI capabilities.
- **Asynchronous API Call Management**: Implements asynchronous JavaScript functions to handle API responses efficiently.
- **Dynamic Interaction Loops**: Develops loops that allow the AI to process and respond to inputs iteratively, enhancing interaction flow.
- **Advanced String Parsing and Regex**: Utilizes string manipulation and regular expressions to extract and process commands from AI outputs.
- **Integration of External Tools**: Embeds external tools, such as weather data retrieval, directly within the AI's operational framework.
- **State Management**: Designs strategies to manage AI statelessness, ensuring coherent and context-aware interactions.
- **ReAct Prompts Design**: Constructs prompts to guide the AI through thought, action, and observation cycles for more relevant responses.
- **Automated Function Calls**: Automates the calling of JavaScript functions based on the AI's needs using OpenAI's latest APIs.
- **User Interface Integration**: Implements a simple UI with vanilla JavaScript to showcase the AI's capabilities in a real-world application.
- **Error Handling and Debugging**: Incorporates robust error handling mechanisms to manage undefined or erroneous AI outputs.
- **Performance Optimization**: Continuously refines and optimizes the codebase for improved performance and maintainability.
- **Event Listener Integration**: Sets up event listeners to monitor and react to specific events within the AI's operational loop.
- **Scalability**: Designs the agent to be easily scalable, allowing for the integration of new functionalities as OpenAI releases updates.

## Installation

### Prerequisites
- Node.js installed on your machine
- An OpenAI API key

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/DevDream.git
   cd DevDream

2. **Install Dependencies:**
    Install the required Node.js packages:

        npm install

3. **Set Up Environment Variables:**

    Create a .env file in the project root directory and add your OpenAI API key:

        OPENAI_API_KEY=your_openai_api_key_here


4. **Run the Application:**

    Start the application using Node.js:

        npm start


## Usage

Once the application is running, you can interact with the AI agent via the user interface. The agent is capable of performing tasks like retrieving weather data, managing conversations, and responding to user inputs with contextually aware information.

## Example Code

Here's an example of how the AI agent handles asynchronous API calls:

    async function fetchWeatherData(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}`);
    const data = await response.json();
    return data.current.condition.text;
    }
    async function handleUserInput(input) {
        const aiResponse = await openai.Completion.create({
            engine: "davinci",
            prompt: `User asked: ${input}\nAI:`,
            maxTokens: 150,
        });

        const weatherData = await fetchWeatherData(input);
        return `AI suggests: ${aiResponse.choices[0].text.trim()}.\nAlso, the current weather in ${input} is ${weatherData}.`;
    }

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
