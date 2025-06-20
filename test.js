const data = {
  choices: [
    { message: { content: "Hello from AI!" } }
  ]
};

const raw = data.choices?.[0]?.message?.content || '';
console.log("✅ raw:", raw);
