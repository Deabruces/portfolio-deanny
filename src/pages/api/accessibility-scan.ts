import type { APIRoute } from 'astro';

// Make this endpoint server-rendered
export const prerender = false;

/**
 * Generate AI-powered alt text for images
 */
async function generateAltText(imageUrl: string, apiKey?: string): Promise<string> {
  if (!apiKey) {
    // Fallback to heuristic-based alt text
    const filename = imageUrl.split('/').pop()?.split('.')[0] || 'image';
    return `Image: ${filename.replace(/-|_/g, ' ')}`;
  }

  try {
    // Use Claude with vision capabilities
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'url',
                url: imageUrl,
              },
            },
            {
              type: 'text',
              text: 'Generate a concise, descriptive alt text for this image that would be useful for screen readers. Focus on the main subject and important details. Keep it under 125 characters. Return ONLY the alt text, no additional explanation.',
            },
          ],
        }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const textBlock = data.content.find((block: any) => block.type === 'text');

    return textBlock?.text || 'Image description unavailable';
  } catch (error) {
    console.error('Alt text generation error:', error);
    // Fallback
    const filename = imageUrl.split('/').pop()?.split('.')[0] || 'image';
    return `Image: ${filename.replace(/-|_/g, ' ')}`;
  }
}

/**
 * Client-side scan results processing
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const { action, data } = await request.json();

    if (!action) {
      return new Response(
        JSON.stringify({ error: 'Action required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.ANTHROPIC_API_KEY;

    // Handle different actions
    switch (action) {
      case 'generate-alt-text': {
        if (!data?.imageUrl) {
          return new Response(
            JSON.stringify({ error: 'Image URL required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        const altText = await generateAltText(data.imageUrl, apiKey);

        return new Response(
          JSON.stringify({ altText }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      case 'generate-bulk-alt-text': {
        if (!data?.images || !Array.isArray(data.images)) {
          return new Response(
            JSON.stringify({ error: 'Images array required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // Generate alt text for multiple images
        const results = await Promise.all(
          data.images.map(async (imageUrl: string) => ({
            imageUrl,
            altText: await generateAltText(imageUrl, apiKey),
          }))
        );

        return new Response(
          JSON.stringify({ results }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      case 'get-recommendations': {
        if (!data?.issues) {
          return new Response(
            JSON.stringify({ error: 'Issues data required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // AI-powered recommendations for fixing issues
        if (apiKey) {
          try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
              },
              body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                messages: [{
                  role: 'user',
                  content: `You are a WCAG accessibility expert. Based on these accessibility issues, provide specific, actionable recommendations:

${JSON.stringify(data.issues, null, 2)}

For each critical and serious issue, provide:
1. Specific code fix
2. Best practice explanation
3. Testing method

Return as JSON array with format:
[
  {
    "issueId": "...",
    "priority": "high|medium|low",
    "fix": "Specific code example",
    "explanation": "Why this fixes it",
    "testingTip": "How to verify"
  }
]`,
                }],
              }),
            });

            if (response.ok) {
              const result = await response.json();
              const textBlock = result.content.find((b: any) => b.type === 'text');

              if (textBlock) {
                try {
                  const recommendations = JSON.parse(textBlock.text);
                  return new Response(
                    JSON.stringify({ recommendations }),
                    { status: 200, headers: { 'Content-Type': 'application/json' } }
                  );
                } catch {
                  // JSON parse failed, return text
                  return new Response(
                    JSON.stringify({ recommendations: textBlock.text }),
                    { status: 200, headers: { 'Content-Type': 'application/json' } }
                  );
                }
              }
            }
          } catch (error) {
            console.error('Recommendations error:', error);
          }
        }

        // Fallback to basic recommendations
        const basicRecommendations = data.issues.map((issue: any) => ({
          issueId: issue.id,
          priority: issue.severity === 'critical' ? 'high' : issue.severity === 'serious' ? 'high' : 'medium',
          fix: issue.suggestion,
          explanation: `WCAG ${issue.wcagCriterion} requires proper ${issue.wcagCriterion.toLowerCase()}`,
          testingTip: 'Use browser DevTools and screen reader testing',
        }));

        return new Response(
          JSON.stringify({ recommendations: basicRecommendations }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Accessibility API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error processing request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
