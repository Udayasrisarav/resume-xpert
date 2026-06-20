export async function getFeedback(prompt: string) {
    try {
        console.log("OpenRouter key:", import.meta.env.VITE_OPENROUTER_API_KEY);

        const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        if (!resp.ok) {
            console.error("OpenRouter API error:", resp.status, resp.statusText);
            return "";
        }

        const data = await resp.json();
        console.log("Raw OpenRouter response:", data);

        return data.choices?.[0]?.message?.content ?? "";
    } catch (err) {
        console.error("getFeedback failed:", err);
        return "";
    }
}
