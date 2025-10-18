#!/usr/bin/env node

/**
 * MCP Server for Deanny's Service Recommendation System
 * Implements Model Context Protocol for connecting Claude to services data
 */

const SERVICES_DATABASE = [
  {
    id: 'web-development',
    category: 'web',
    name: 'Diseño y Desarrollo Web',
    icon: '💻',
    keywords: ['página web', 'sitio web', 'website', 'landing page', 'web corporativa', 'portfolio', 'inicio', 'crear', 'desarrollo web'],
    benefits: ['Diseño moderno', 'Rápido y seguro', 'Responsive'],
    description: 'Páginas modernas, rápidas y seguras que transmiten tu esencia.',
    pricing: '$500-$5,000',
    timeline: '2-6 semanas',
  },
  {
    id: 'ecommerce',
    category: 'web',
    name: 'E-commerce',
    icon: '🛒',
    keywords: ['tienda online', 'vender', 'ecommerce', 'e-commerce', 'productos', 'carrito', 'pagos', 'shopify', 'woocommerce'],
    benefits: ['Ventas 24/7', 'Integración pagos', 'Gestión inventario'],
    description: 'Tiendas online optimizadas para vender más con experiencia fluida.',
    pricing: '$2,000-$15,000',
    timeline: '4-8 semanas',
  },
  {
    id: 'booking',
    category: 'web',
    name: 'Agendamiento y Pago',
    icon: '📅',
    keywords: ['reservas', 'citas', 'agenda', 'booking', 'calendario', 'agendamiento', 'turnos', 'horarios'],
    benefits: ['Reservas online', 'Pagos integrados', 'Recordatorios automáticos'],
    description: 'Sistemas integrados para reservar citas y pagos online con confianza.',
    pricing: '$1,500-$8,000',
    timeline: '3-6 semanas',
  },
  {
    id: 'seo',
    category: 'seo',
    name: 'SEO',
    icon: '📈',
    keywords: ['seo', 'google', 'posicionamiento', 'tráfico', 'visibilidad', 'búsqueda', 'ranking', 'keywords'],
    benefits: ['Más visibilidad', 'Tráfico orgánico', 'ROI medible'],
    description: 'Optimización para aparecer en Google y atraer clientes constantemente.',
    pricing: '$500/mes - $2,000/mes',
    timeline: '3-6 meses (ongoing)',
  },
  {
    id: 'maintenance',
    category: 'web',
    name: 'Mantenimiento Web',
    icon: '🔧',
    keywords: ['mantenimiento', 'actualización', 'soporte', 'backup', 'seguridad', 'actualizar', 'reparar'],
    benefits: ['Siempre actualizado', 'Backups automáticos', 'Soporte prioritario'],
    description: 'Actualización, seguridad y soporte para que tu web funcione al máximo.',
    pricing: '$100/mes - $500/mes',
    timeline: 'Mensual',
  },
  {
    id: 'branding',
    category: 'web',
    name: 'Branding y Diseño Visual',
    icon: '🎨',
    keywords: ['logo', 'marca', 'identidad', 'branding', 'colores', 'diseño', 'imagen corporativa', 'tipografía'],
    benefits: ['Identidad única', 'Coherencia visual', 'Diferenciación'],
    description: 'Paleta de colores, tipografías y elementos para dar personalidad a tu marca.',
    pricing: '$800-$5,000',
    timeline: '2-4 semanas',
  },
  {
    id: 'performance',
    category: 'web',
    name: 'Optimización de Velocidad',
    icon: '⚡',
    keywords: ['lento', 'velocidad', 'rápido', 'optimización', 'performance', 'carga', 'speed', 'rendimiento'],
    benefits: ['Web 10x más rápida', 'Mejor UX', 'Mejor SEO'],
    description: 'Mejora de tiempos de carga y rendimiento para mejor experiencia.',
    pricing: '$500-$2,500',
    timeline: '1-3 semanas',
  },
  {
    id: 'analytics',
    category: 'seo',
    name: 'Analítica Web y Reportes',
    icon: '📊',
    keywords: ['analítica', 'métricas', 'datos', 'estadísticas', 'reportes', 'google analytics', 'medición', 'kpi'],
    benefits: ['Datos claros', 'Decisiones informadas', 'ROI tracking'],
    description: 'Datos claros y métricas accionables para tomar mejores decisiones.',
    pricing: '$300/mes - $1,500/mes',
    timeline: 'Setup 1 semana + mensual',
  },
  {
    id: 'automation',
    category: 'automation',
    name: 'Automatización Inteligente',
    icon: '🤖',
    keywords: ['automatizar', 'automatización', 'workflow', 'zapier', 'n8n', 'repetitivo', 'proceso', 'ahorro tiempo'],
    benefits: ['Ahorra 20+ h/semana', '95% menos errores', 'Escalable'],
    description: 'Workflows con n8n y Zapier que automatizan tareas y escalan tu negocio.',
    pricing: '$500-$2,500 (one-time) + $13-$49/mes',
    timeline: '1-3 semanas',
  },
  {
    id: 'ai-assistant',
    category: 'ai',
    name: 'AI y Asistentes Virtuales',
    icon: '🧠',
    keywords: ['chatbot', 'ai', 'inteligencia artificial', 'asistente virtual', 'claude', 'gpt', 'automatización ia'],
    benefits: ['Atención 24/7', '80% consultas resueltas', 'Escalable'],
    description: 'Chatbots inteligentes con MCP que atienden clientes 24/7.',
    pricing: '$1,000-$5,000 (setup) + API costs',
    timeline: '2-4 semanas',
  },
  {
    id: 'accessibility',
    category: 'ai',
    name: 'Accesibilidad Web AI',
    icon: '♿',
    keywords: ['accesibilidad', 'wcag', 'ada', 'inclusivo', 'discapacidad', 'normativa', 'cumplimiento'],
    benefits: ['Cumplimiento WCAG', '+16% audiencia', 'Mejor SEO'],
    description: 'Cumplimiento WCAG 2.1 automatizado con IA para expandir tu mercado.',
    pricing: '$800-$3,500',
    timeline: '2-4 semanas',
  },
];

// MCP Tool Handlers
const tools = {
  get_services: ({ category = 'all' }) => {
    if (category === 'all') {
      return { services: SERVICES_DATABASE };
    }
    const filtered = SERVICES_DATABASE.filter(s => s.category === category);
    return { services: filtered };
  },

  recommend_services: ({ user_description, max_recommendations = 3 }) => {
    const description = user_description.toLowerCase();

    // Score each service based on keyword matches
    const scored = SERVICES_DATABASE.map(service => {
      const matches = service.keywords.filter(kw =>
        description.includes(kw.toLowerCase())
      );
      return {
        ...service,
        score: matches.length,
        matchedKeywords: matches
      };
    });

    // Sort by score and take top N
    const recommendations = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, max_recommendations);

    return {
      recommendations: recommendations.map(r => ({
        id: r.id,
        name: r.name,
        icon: r.icon,
        description: r.description,
        benefits: r.benefits,
        pricing: r.pricing,
        timeline: r.timeline,
        matchedKeywords: r.matchedKeywords,
        confidence: Math.min((r.score / 3) * 100, 100) // Convert score to percentage
      })),
      total_services_checked: SERVICES_DATABASE.length
    };
  },

  get_service_details: ({ service_id }) => {
    const service = SERVICES_DATABASE.find(s => s.id === service_id);
    if (!service) {
      return { error: `Service with ID '${service_id}' not found` };
    }
    return { service };
  }
};

// MCP Resource Handlers
const resources = {
  'services://all': () => ({
    contents: [{
      uri: 'services://all',
      mimeType: 'application/json',
      text: JSON.stringify(SERVICES_DATABASE, null, 2)
    }]
  }),

  'templates://automation': () => ({
    contents: [{
      uri: 'templates://automation',
      mimeType: 'application/json',
      text: JSON.stringify({
        n8n: [
          'blog-to-social-media.json',
          'lead-management.json',
          'social-media-scheduler.json'
        ],
        zapier: [
          'contact-form-integration.md'
        ]
      }, null, 2)
    }]
  })
};

// Simple HTTP server for MCP protocol
const http = require('http');

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const request = JSON.parse(body);

      // Handle tool calls
      if (request.method === 'tools/call') {
        const { name, arguments: args } = request.params;

        if (!tools[name]) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            id: request.id,
            error: { code: -32601, message: `Tool '${name}' not found` }
          }));
          return;
        }

        const result = tools[name](args);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          jsonrpc: '2.0',
          id: request.id,
          result: { content: [{ type: 'text', text: JSON.stringify(result) }] }
        }));
        return;
      }

      // Handle resource reads
      if (request.method === 'resources/read') {
        const { uri } = request.params;

        if (!resources[uri]) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            id: request.id,
            error: { code: -32601, message: `Resource '${uri}' not found` }
          }));
          return;
        }

        const result = resources[uri]();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          jsonrpc: '2.0',
          id: request.id,
          result
        }));
        return;
      }

      // Handle tools/list
      if (request.method === 'tools/list') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          jsonrpc: '2.0',
          id: request.id,
          result: {
            tools: Object.keys(tools).map(name => ({ name }))
          }
        }));
        return;
      }

      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        jsonrpc: '2.0',
        id: request.id,
        error: { code: -32600, message: 'Invalid request' }
      }));

    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32603, message: error.message }
      }));
    }
  });
});

const PORT = process.env.MCP_SERVER_PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 MCP Server running on http://localhost:${PORT}`);
  console.log(`📦 Services loaded: ${SERVICES_DATABASE.length}`);
  console.log(`🔧 Tools available: ${Object.keys(tools).length}`);
  console.log(`📚 Resources available: ${Object.keys(resources).length}`);
});
