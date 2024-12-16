export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
  
    if (!query) {
      return new Response(JSON.stringify({ suggestions: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    // Simulate fetching suggestions
    const suggestions = await getSuggestionsFromDatabase(query); // Replace with your logic
  
    return new Response(JSON.stringify({ suggestions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  // Mock function to simulate database fetch
  async function getSuggestionsFromDatabase(query) {
    const mockData = ["Product 1", "Product 2", "Product 3"];
    return mockData.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }
  