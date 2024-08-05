export function renderNewMessage(text, role) {
    const conversationContainer = document.getElementById("conversation")
    const newArticle = document.createElement("article")
    newArticle.classList.add(role === "assistant" ? "ai-message" : "user-message")
    const newParagraph = document.createElement("p")
    newParagraph.textContent = text
    newArticle.append(newParagraph)
    conversationContainer.append(newArticle)
    scrollToBottom()
}

function scrollToBottom() {
    requestAnimationFrame(() => {
        document.body.scrollIntoView({ behavior: "smooth", block: "end" })
    });
}