async function matchWord(word, apiKey) {
    if (!apiKey) {
        console.error("No API key available");
        return null;
    }

    try {
        let response = await fetch("https://deepspaceai.pythonanywhere.com/v1/dictionary/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ api_key: apiKey, word: word }),
        });

        let data = await response.json();
        return data.matches || [];
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
}

async function getWord(word) {
    let apiKey = localStorage.getItem("api_key");
    if (!apiKey) {
        console.error("No API key available");
        return null;
    }

    try {
        let response = await fetch("https://deepspaceai.pythonanywhere.com/v1/dictionary/get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ api_key: apiKey, word: word }),
        });

        let data = await response.json();
        return data.data || data[word] || null;
    } catch (error) {
        console.error("Error fetching word data:", error);
        return null;
    }
}
