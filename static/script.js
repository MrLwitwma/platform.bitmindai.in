document.getElementById("apiForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    if (!email) return alert("Please enter your email.");

    let apiUrl = "https://deepspaceai.pythonanywhere.com/v1/api/create/dictionary"
    // apiUrl = "http://127.0.0.1:5000/v1/api/create/dictionary"

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        console.log(result)

        if (response.ok) {
            document.getElementById('loading').classList.remove("hidden")
            setTimeout(() => {
                document.getElementById('loading').classList.add("hidden")
                document.getElementById("apiKey").innerText = result.api_key;
                document.getElementById("result").classList.remove("hidden");
            }, 4000);
        } else {
            alert(result.error || "Something went wrong.");
        }
    } catch (error) {
        alert(error)
        alert("Failed to connect to server.");
    }
});

document.getElementById("copyBtn").addEventListener("click", function () {
    const apiKeyField = document.getElementById("apiKey").textContent;
    const tempInput = document.createElement("textarea");
    tempInput.value = apiKeyField;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("API Key copied!");
});

