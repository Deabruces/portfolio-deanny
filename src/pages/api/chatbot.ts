import type { APIRoute } from 'astro';

// Make this endpoint server-rendered so it can handle POST requests
export const prerender = false;

// Services database with keywords
const SERVICES = [
  {
    id: 'web-development',
    name: 'Diseño y Desarrollo Web',
    icon: '💻',
    keywords: ['página web', 'sitio web', 'website', 'landing page', 'web corporativa', 'portfolio', 'inicio', 'crear', 'desarrollo web'],
    benefits: ['Diseño moderno', 'Rápido y seguro', 'Responsive'],
    description: 'Páginas modernas, rápidas y seguras que transmiten tu esencia.',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛒',
    keywords: ['tienda online', 'vender', 'ecommerce', 'e-commerce', 'productos', 'carrito', 'pagos', 'shopify', 'woocommerce'],
    benefits: ['Ventas 24/7', 'Integración pagos', 'Gestión inventario'],
    description: 'Tiendas online optimizadas para vender más con experiencia fluida.',
  },
  {
    id: 'booking',
    name: 'Agendamiento y Pago',
    icon: '📅',
    keywords: ['reservas', 'citas', 'agenda', 'booking', 'calendario', 'agendamiento', 'turnos', 'horarios'],
    benefits: ['Reservas online', 'Pagos integrados', 'Recordatorios automáticos'],
    description: 'Sistemas integrados para reservar citas y pagos online con confianza.',
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: '📈',
    keywords: ['seo', 'google', 'posicionamiento', 'tráfico', 'visibilidad', 'búsqueda', 'ranking', 'keywords'],
    benefits: ['Más visibilidad', 'Tráfico orgánico', 'ROI medible'],
    description: 'Optimización para aparecer en Google y atraer clientes constantemente.',
  },
  {
    id: 'maintenance',
    name: 'Mantenimiento Web',
    icon: '🔧',
    keywords: ['mantenimiento', 'actualización', 'soporte', 'backup', 'seguridad', 'actualizar', 'reparar'],
    benefits: ['Siempre actualizado', 'Backups automáticos', 'Soporte prioritario'],
    description: 'Actualización, seguridad y soporte para que tu web funcione al máximo.',
  },
  {
    id: 'branding',
    name: 'Branding y Diseño Visual',
    icon: '🎨',
    keywords: ['logo', 'marca', 'identidad', 'branding', 'colores', 'diseño', 'imagen corporativa', 'tipografía'],
    benefits: ['Identidad única', 'Coherencia visual', 'Diferenciación'],
    description: 'Paleta de colores, tipografías y elementos para dar personalidad a tu marca.',
  },
  {
    id: 'performance',
    name: 'Optimización de Velocidad',
    icon: '⚡',
    keywords: ['lento', 'velocidad', 'rápido', 'optimización', 'performance', 'carga', 'speed', 'rendimiento'],
    benefits: ['Web 10x más rápida', 'Mejor UX', 'Mejor SEO'],
    description: 'Mejora de tiempos de carga y rendimiento para mejor experiencia.',
  },
  {
    id: 'analytics',
    name: 'Analítica Web y Reportes',
    icon: '📊',
    keywords: ['analítica', 'métricas', 'datos', 'estadísticas', 'reportes', 'google analytics', 'medición', 'kpi'],
    benefits: ['Datos claros', 'Decisiones informadas', 'ROI tracking'],
    description: 'Datos claros y métricas accionables para tomar mejores decisiones.',
  },
  {
    id: 'automation',
    name: 'Automatización Inteligente',
    icon: '🤖',
    keywords: ['automatizar', 'automatización', 'workflow', 'zapier', 'n8n', 'repetitivo', 'proceso', 'ahorro tiempo'],
    benefits: ['Ahorra 20+ h/semana', '95% menos errores', 'Escalable'],
    description: 'Workflows con n8n y Zapier que automatizan tareas y escalan tu negocio.',
  },
  {
    id: 'ai-assistant',
    name: 'AI y Asistentes Virtuales',
    icon: '🧠',
    keywords: ['chatbot', 'ai', 'inteligencia artificial', 'asistente virtual', 'claude', 'gpt', 'automatización ia'],
    benefits: ['Atención 24/7', '80% consultas resueltas', 'Escalable'],
    description: 'Chatbots inteligentes con MCP que atienden clientes 24/7.',
  },
  {
    id: 'accessibility',
    name: 'Accesibilidad Web AI',
    icon: '♿',
    keywords: ['accesibilidad', 'wcag', 'ada', 'inclusivo', 'discapacidad', 'normativa', 'cumplimiento'],
    benefits: ['Cumplimiento WCAG', '+16% audiencia', 'Mejor SEO'],
    description: 'Cumplimiento WCAG 2.1 automatizado con IA para expandir tu mercado.',
  },
];

// Fallback AI logic without external API
function analyzeWithBasicAI(message: string): {
  response: string;
  recommendations: Array<{
    name: string;
    icon: string;
    reason: string;
    benefits: string[];
  }>;
} {
  const messageLower = message.toLowerCase();

  // Find matching services
  const matches = SERVICES.filter(service =>
    service.keywords.some(keyword => messageLower.includes(keyword))
  ).slice(0, 3); // Max 3 recommendations

  // Generate personalized response
  let response = '';
  const recommendations = [];

  if (matches.length === 0) {
    response = `Entiendo que estás buscando una solución para tu negocio. Basándome en tu descripción, te recomendaría empezar con una consultoría gratuita donde podemos analizar en detalle tus necesidades específicas.

Mientras tanto, aquí hay algunos servicios que podrían ser relevantes:`;

    // Show general services
    recommendations.push(
      {
        name: SERVICES[0].name,
        icon: SERVICES[0].icon,
        reason: 'Un sitio web profesional es la base de cualquier presencia digital exitosa.',
        benefits: SERVICES[0].benefits,
      },
      {
        name: SERVICES[8].name,
        icon: SERVICES[8].icon,
        reason: 'La automatización puede ahorrarte tiempo valioso sin importar tu industria.',
        benefits: SERVICES[8].benefits,
      }
    );
  } else {
    // Personalized response based on matches
    if (matches.length === 1) {
      response = `Perfecto, veo que necesitas ${matches[0].name.toLowerCase()}.

${matches[0].description}

Este servicio es ideal para tu caso porque:`;
    } else {
      response = `Excelente, he identificado ${matches.length} servicios que se ajustan perfectamente a tus necesidades:`;
    }

    // Add matched services
    matches.forEach(service => {
      recommendations.push({
        name: service.name,
        icon: service.icon,
        reason: service.description,
        benefits: service.benefits,
      });
    });
  }

  // Add complementary service if only 1-2 matches
  if (matches.length > 0 && matches.length < 3) {
    // Suggest SEO if web development
    if (matches.some(m => m.id === 'web-development') && !matches.some(m => m.id === 'seo')) {
      const seo = SERVICES.find(s => s.id === 'seo');
      if (seo) {
        recommendations.push({
          name: seo.name,
          icon: seo.icon,
          reason: 'Complementa tu web con SEO para atraer más clientes de forma orgánica.',
          benefits: seo.benefits,
        });
      }
    }
    // Suggest automation for ecommerce
    else if (matches.some(m => m.id === 'ecommerce') && !matches.some(m => m.id === 'automation')) {
      const automation = SERVICES.find(s => s.id === 'automation');
      if (automation) {
        recommendations.push({
          name: automation.name,
          icon: automation.icon,
          reason: 'Automatiza procesos de tu tienda para ahorrar tiempo y reducir errores.',
          benefits: automation.benefits,
        });
      }
    }
  }

  return { response, recommendations };
}

// Claude AI with MCP tool calling
async function analyzeWithClaudeAI(message: string, apiKey: string): Promise<any> {
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
        max_tokens: 2048,
        tools: [
          {
            name: 'recommend_services',
            description: 'Analiza las necesidades del usuario y recomienda servicios específicos de Deanny Bruces',
            input_schema: {
              type: 'object',
              properties: {
                user_description: {
                  type: 'string',
                  description: 'Descripción del proyecto o necesidad del usuario'
                },
                max_recommendations: {
                  type: 'number',
                  description: 'Número máximo de servicios a recomendar',
                  default: 3
                }
              },
              required: ['user_description']
            }
          }
        ],
        messages: [{
          role: 'user',
          content: `Eres un asistente experto de Deanny Bruces, especialista en desarrollo web, automatización y AI.

El usuario dice: "${message}"

Analiza su necesidad y usa la herramienta recommend_services para obtener recomendaciones personalizadas.
Luego responde en español de forma amigable y profesional, explicando por qué estos servicios son ideales para su caso.`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();

    // Handle tool calls
    if (data.stop_reason === 'tool_use') {
      const toolUse = data.content.find((block: any) => block.type === 'tool_use');

      if (toolUse && toolUse.name === 'recommend_services') {
        // Call MCP server to get recommendations
        const mcpResponse = await fetch('http://localhost:3001', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'tools/call',
            params: {
              name: 'recommend_services',
              arguments: toolUse.input
            }
          })
        });

        const mcpData = await mcpResponse.json();
        const recommendations = JSON.parse(mcpData.result.content[0].text);

        // Continue conversation with tool result
        const followUpResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            tools: data.content.filter((b: any) => b.type === 'tool_use'),
            messages: [
              {
                role: 'user',
                content: `Eres un asistente experto de Deanny Bruces. El usuario dice: "${message}"`
              },
              {
                role: 'assistant',
                content: data.content
              },
              {
                role: 'user',
                content: [{
                  type: 'tool_result',
                  tool_use_id: toolUse.id,
                  content: JSON.stringify(recommendations)
                }]
              }
            ]
          })
        });

        const followUpData = await followUpResponse.json();
        const aiResponse = followUpData.content.find((b: any) => b.type === 'text')?.text || '';

        // Format recommendations for frontend
        const formattedRecs = recommendations.recommendations.map((rec: any) => {
          const service = SERVICES.find(s => s.id === rec.id);
          return {
            name: service?.name || rec.name,
            icon: service?.icon || '📦',
            reason: rec.description,
            benefits: service?.benefits || []
          };
        });

        return {
          response: aiResponse,
          recommendations: formattedRecs
        };
      }
    }

    // If no tool use, extract text response
    const textBlock = data.content.find((block: any) => block.type === 'text');
    return {
      response: textBlock?.text || 'Lo siento, no pude procesar tu solicitud.',
      recommendations: []
    };

  } catch (error) {
    console.error('Claude AI Error:', error);
    // Fallback to basic AI
    return analyzeWithBasicAI(message);
  }
}

// OpenAI/Claude AI logic (optional - requires API key)
async function analyzeWithExternalAI(message: string, apiKey?: string): Promise<any> {
  if (!apiKey) {
    return analyzeWithBasicAI(message);
  }

  // Use Claude with MCP
  return analyzeWithClaudeAI(message, apiKey);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid message' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment (optional)
    const apiKey = import.meta.env.ANTHROPIC_API_KEY || import.meta.env.OPENAI_API_KEY;

    // Analyze message and get recommendations
    const result = await analyzeWithExternalAI(message, apiKey);

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Chatbot API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Error processing request',
        response: 'Lo siento, hubo un error. Por favor, contacta directamente a través del formulario.',
        recommendations: []
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
