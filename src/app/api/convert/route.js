// app/api/convert/route.js
export async function POST(req) {
  try {
    const { from, to = 'USD', amounts } = await req.json();

    if (
      !from ||
      !to ||
      !Array.isArray(amounts) ||
      amounts.some(a => isNaN(Number(a)))
    ) {
      return new Response(
        JSON.stringify({ error: 'Invalid parameters' }),
        { status: 400 }
      );
    }

    const apiKey = 'a65d9946095bb83c7fad5d9c'; // Replace with your ExchangeRate-API key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from.toUpperCase()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== 'success') {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch exchange rates' }),
        { status: 400 }
      );
    }

    const rate = data.conversion_rates[to.toUpperCase()];
    if (!rate) {
      return new Response(
        JSON.stringify({ error: `Conversion rate not found for ${to}` }),
        { status: 400 }
      );
    }

    const results = amounts.map(amount => +(Number(amount) * rate).toFixed(2));

    return new Response(
      JSON.stringify({
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        rate,
        results,
      }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
