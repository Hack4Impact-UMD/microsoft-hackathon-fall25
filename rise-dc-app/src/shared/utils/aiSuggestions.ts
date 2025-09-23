export const getEventSuggestions = async (existingEvents: string[]): Promise<string[]> => {
  try {
    const res = await fetch("http://localhost:4000/api/ai-suggestions", {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ existingEvents }),
    });

    console.log("Sending request to backend...");

    if (!res.ok) {
      throw new Error(`Backend returned status ${res.status}`);
    }

    const data = await res.json();
    return data.suggestions;
  } catch (err) {
    console.error("AI suggestion fetch error:", err);
    return [
      "Take a short break",
      "Review progress",
      "Prepare for tomorrow",
      "Reflect on goals",
    ];
  }
};
