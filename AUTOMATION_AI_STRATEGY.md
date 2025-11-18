# Automation & AI Implementation Strategy
## n8n, Zapier, MCP & AI Accessibility

**Date:** October 2025
**Author:** Deanny Bruces
**Purpose:** Strategic roadmap for implementing automation and AI services

---

## Executive Summary

This document outlines the implementation strategy for four cutting-edge technologies that will differentiate your personal brand and create new revenue streams:

1. **n8n** - Self-hosted workflow automation
2. **Zapier** - Cloud-based automation platform
3. **MCP** (Model Context Protocol) - AI integration standard
4. **AI Web Accessibility** - Automated WCAG compliance

---

## 1. n8n Workflow Automation

### Overview
n8n is an open-source workflow automation platform with 400+ integrations and native AI capabilities. Fair-code license allows commercial use while maintaining control over data.

### Key Features for 2025
- **400+ Integrations:** Connect with virtually any service
- **AI Nodes:** OpenAI, Hugging Face, Cohere, custom LLM endpoints
- **Self-Hosted:** Full data control, no cloud dependencies
- **Custom Code:** JavaScript/Python integration for advanced workflows
- **Cost:** Community Edition is FREE (self-hosted)

### Implementation for Your Brand

#### Quick Wins (Week 1-2)
1. **Blog-to-Social Automation**
   - Auto-post new blog articles to LinkedIn, Twitter, Instagram
   - Generate social media summaries using AI
   - Schedule posts at optimal times

2. **Lead Management**
   - Contact form → Email → CRM → Slack notification
   - Automatic lead scoring and categorization
   - Follow-up email sequences

3. **Portfolio Updates**
   - New project → Update all platforms automatically
   - Generate project descriptions with AI
   - Create social media announcements

4. **Analytics Automation**
   - Weekly website traffic reports via email
   - Monthly performance dashboards
   - Automated competitor analysis

#### Technical Setup
```bash
# Docker installation
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Recommended Hosting:**
- DigitalOcean Droplet ($6-12/month)
- Railway.app (Free tier available)
- Your own VPS

### Service Offerings for Clients

#### Package 1: Starter Automation ($500 - $800)
**Includes:**
- 3-5 basic workflows
- Email + CRM + Calendar integration
- Social media auto-posting
- 2 hours training
- 1 month support

**Examples:**
- Contact form to Google Sheets + Email notifications
- New customer → Welcome email sequence
- Daily social media posts from RSS feed

#### Package 2: Business Automation ($1,200 - $2,500)
**Includes:**
- 10-15 advanced workflows
- E-commerce integrations
- Payment processing automation
- AI content generation
- Custom dashboard
- 3 months support

**Examples:**
- Order fulfillment automation
- Inventory management
- Customer support ticketing
- Invoice generation and tracking

#### Package 3: Enterprise Automation ($3,000 - $8,000)
**Includes:**
- Unlimited workflows
- Full-stack integration
- Custom nodes development
- AI/ML pipelines
- Dedicated server setup
- 12 months support

**Examples:**
- Multi-platform data synchronization
- Advanced analytics pipelines
- Custom API integrations
- Complex approval workflows

#### Maintenance Plans
- **Basic:** $100/month - Monitoring + updates + 2 hours support
- **Pro:** $250/month - Everything + 5 hours support + monthly optimization
- **Enterprise:** $500/month - Everything + unlimited support + dedicated Slack channel

---

## 2. Zapier Integration

### Overview
Cloud-based automation platform with 7,000+ app integrations. No technical knowledge required for basic automations. Enterprise-grade reliability.

### Key Advantages
- **Zero Setup:** No servers to maintain
- **Massive App Library:** 7,000+ pre-built integrations
- **User-Friendly:** Perfect for non-technical clients
- **Templates:** 1,000+ pre-built workflow templates
- **Reliability:** 99.9% uptime SLA

### Implementation for Your Brand

#### Immediate Automations
1. **Contact Form → Multiple Destinations**
   - Formulario.astro → Zapier → Gmail + Google Sheets + Slack
   - Auto-response email to prospect
   - CRM contact creation

2. **Blog Publishing Workflow**
   - New blog post → Twitter + LinkedIn + Facebook
   - Email to subscribers
   - Add to content calendar

3. **Client Onboarding**
   - New client form → Create folder in Google Drive
   - Generate welcome email
   - Add to project management tool (Trello/Asana)
   - Schedule kickoff meeting

4. **Social Proof Collection**
   - Project completion → Request testimonial
   - Auto-post to portfolio
   - Share on social media

#### Integration with Your Site

**Add Zapier Webhooks to Forms:**
```javascript
// In Formulario.astro
const zapierWebhookUrl = import.meta.env.ZAPIER_WEBHOOK_URL;

async function handleSubmit(formData) {
  await fetch(zapierWebhookUrl, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Service Offerings for Clients

#### Package 1: Essential Zaps ($300 - $600)
**Includes:**
- 5-10 Zaps setup
- Common business workflows
- 1 hour training
- Documentation
- 1 month support

**Popular Workflows:**
- Lead capture automation
- Email marketing integration
- Calendar booking system
- Social media posting

#### Package 2: Growth Automation ($800 - $1,500)
**Includes:**
- 15-20 Zaps
- Multi-step workflows
- Error handling
- Custom filters and paths
- 2 hours training
- 3 months support

**Advanced Workflows:**
- E-commerce order processing
- Customer journey automation
- Analytics tracking
- Team collaboration tools

#### Package 3: Zapier Management Service
**Monthly Retainer:** $150 - $400/month
- Unlimited Zap updates
- Monthly optimization review
- New workflow creation (up to 5/month)
- Priority support
- Monthly performance report

**Client Benefits:**
- Save 10-20 hours/week on manual tasks
- Reduce human error
- Scale operations without hiring
- Better customer experience

---

## 3. Model Context Protocol (MCP)

### Overview
MCP is Anthropic's open standard for connecting AI assistants to data sources and tools. Think "USB-C for AI applications" - standardized connections for AI models.

### Key Capabilities
- **Standardized AI Integration:** Connect Claude (or other LLMs) to your data
- **Pre-built Servers:** GitHub, Google Drive, Slack, Postgres, Puppeteer
- **Custom Servers:** Build your own with Python/TypeScript SDKs
- **Real-time Data Access:** AI can query live databases and APIs
- **Tool Use:** AI can execute actions (not just read data)

### Implementation for Your Brand

#### Phase 1: Portfolio AI Assistant (Month 1-2)
**Goal:** Add intelligent chatbot to your portfolio

**Features:**
- Answer questions about your services
- Recommend projects based on visitor needs
- Provide instant quotes
- Schedule consultations
- Search blog posts intelligently

**Technical Implementation:**
```typescript
// MCP Server for Portfolio Data
import { MCPServer } from '@modelcontextprotocol/sdk';

const portfolioServer = new MCPServer({
  name: 'deanny-portfolio',
  version: '1.0.0'
});

// Tool: Search projects
portfolioServer.addTool({
  name: 'search_projects',
  description: 'Search through portfolio projects',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      category: { type: 'string', enum: ['web', 'ecommerce', 'branding'] }
    }
  },
  handler: async ({ query, category }) => {
    // Query your content/projects directory
    return searchProjects(query, category);
  }
});

// Tool: Get service pricing
portfolioServer.addTool({
  name: 'get_pricing',
  description: 'Get pricing for services',
  inputSchema: {
    type: 'object',
    properties: {
      service: { type: 'string' },
      scope: { type: 'string', enum: ['small', 'medium', 'large'] }
    }
  },
  handler: async ({ service, scope }) => {
    return calculatePricing(service, scope);
  }
});
```

**UI Integration:**
- Add chat widget to website
- Use Claude API with MCP
- Maintain conversation context
- Escalate to human when needed

#### Phase 2: Client MCP Servers (Month 3+)
**Custom AI Assistants for Clients:**

1. **E-commerce Assistant**
   - Answer product questions
   - Process orders
   - Handle returns
   - Provide recommendations

2. **Customer Support AI**
   - Access knowledge base
   - Check order status
   - Escalate complex issues
   - Generate support tickets

3. **Content Generation AI**
   - Access brand guidelines
   - Generate marketing copy
   - Create social media posts
   - Write blog articles

### Service Offerings for Clients

#### Package 1: AI Chatbot Basic ($1,500 - $3,000)
**Includes:**
- Custom MCP server setup
- 1-3 data sources connected
- Basic Q&A capabilities
- Website widget integration
- 1 month support

**Use Cases:**
- FAQ assistant
- Product finder
- Appointment scheduler
- Basic customer service

#### Package 2: AI Assistant Pro ($4,000 - $8,000)
**Includes:**
- Advanced MCP server
- 5-10 data sources (CRM, database, APIs)
- Action capabilities (create records, send emails)
- Multi-language support
- Analytics dashboard
- 3 months support

**Use Cases:**
- Full customer service automation
- Sales assistant
- Internal tool for employees
- Data analysis assistant

#### Package 3: Enterprise AI Platform ($10,000 - $25,000)
**Includes:**
- Multiple MCP servers
- Complete business integration
- Custom AI workflows
- Team training
- Ongoing optimization
- 12 months support

**Use Cases:**
- Company-wide AI assistant
- Department-specific tools
- Complex business processes
- Multi-location coordination

#### Maintenance & Scaling
- **Monitoring:** $200/month - Usage tracking, error monitoring
- **Optimization:** $400/month - Monthly improvements, new features
- **Enterprise Support:** $800/month - Priority support, SLA guarantees

---

## 4. AI-Driven Web Accessibility

### Overview
AI-powered tools can automatically identify and fix many WCAG 2.1 AA compliance issues. **Critical deadline:** European Accessibility Act (EAA) takes effect June 2025.

### Key Capabilities
- **Automated Alt Text Generation:** AI describes images accurately
- **Color Contrast Analysis:** Automatically fix contrast issues
- **Keyboard Navigation Testing:** AI simulates keyboard-only usage
- **Screen Reader Optimization:** Test and fix screen reader issues
- **ARIA Attributes:** Auto-generate proper ARIA labels
- **Real-time Monitoring:** Continuous compliance checking

### Important Limitation
**AI alone is not sufficient.** Automated tools catch 30-40% of accessibility issues. Manual testing and expert review required for full compliance.

**Best Approach:** AI automation + manual audits + user testing

### Implementation for Your Brand

#### Phase 1: Make Your Portfolio Accessible (Week 1-2)

**Quick Wins:**
1. **Add AI Alt Text Generation**
```javascript
// Use OpenAI Vision API for images
import OpenAI from 'openai';

async function generateAltText(imageUrl) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [{
      role: "user",
      content: [
        { type: "text", text: "Generate a concise, descriptive alt text for this image for screen readers." },
        { type: "image_url", image_url: { url: imageUrl } }
      ]
    }]
  });

  return response.choices[0].message.content;
}
```

2. **Automated Contrast Checker**
```javascript
// Check all colors on page load
import tinycolor from 'tinycolor2';

function checkContrast(foreground, background) {
  const contrast = tinycolor.readability(foreground, background);
  const wcagAA = tinycolor.isReadable(foreground, background, {
    level: "AA",
    size: "normal"
  });

  if (!wcagAA) {
    console.warn(`Low contrast: ${contrast.toFixed(2)}:1`);
    // Suggest better colors
    return adjustColorForContrast(foreground, background);
  }
}
```

3. **Keyboard Navigation Audit**
- Ensure all interactive elements are keyboard accessible
- Add visible focus indicators
- Implement skip links

4. **Add ARIA Labels**
```astro
<!-- Services.astro - Already has good ARIA! -->
<section aria-labelledby="services-title">
  <h2 id="services-title">Servicios</h2>
  <!-- Good practice: associate labels with content -->
</section>
```

#### Phase 2: Accessibility Audit Tool (Week 3-4)
**Build a tool for your portfolio:**

1. **Accessibility Scanner Page**
   - Input any URL
   - Run automated tests
   - Generate PDF report
   - Provide recommendations

2. **Real-time Accessibility Widget**
   - Add to client sites
   - Users can adjust:
     - Font size
     - Contrast
     - Line spacing
     - Dyslexia-friendly font
   - Voice navigation

**Popular Solutions to Integrate:**
- accessiBe
- AudioEye
- UserWay
- Custom solution with Playwright + Axe-core

### Service Offerings for Clients

#### Package 1: Accessibility Audit ($500 - $1,200)
**Includes:**
- Automated accessibility scan
- Manual expert review
- WCAG 2.1 AA compliance report
- Prioritized remediation list
- Cost estimate for fixes

**Deliverables:**
- 20-30 page PDF report
- Spreadsheet of issues
- Video walkthroughs
- Recommendations

#### Package 2: Accessibility Remediation ($1,500 - $5,000)
**Includes:**
- Everything in Audit package
- Fix all identified issues
- Implement AI alt text generation
- Add accessibility widget
- Keyboard navigation improvements
- ARIA attributes
- Color contrast fixes
- Retesting and certification

**Timeline:** 2-6 weeks depending on site size

#### Package 3: Ongoing Accessibility Monitoring ($150 - $500/month)
**Includes:**
- Monthly automated scans
- Quarterly manual audits
- Immediate issue notifications
- Regular updates for new content
- Compliance documentation
- Support for legal inquiries

**Perfect for:**
- Government agencies
- Educational institutions
- Healthcare providers
- E-commerce sites
- Financial services

#### Package 4: Accessibility Consulting ($200/hour)
**Services:**
- Staff training
- Process development
- Accessible design systems
- Developer education
- Testing methodology
- Vendor evaluation

### Legal & Market Opportunity

**Why This Matters:**
- **US:** ADA lawsuits increased 400% (2017-2023)
- **EU:** EAA mandatory June 2025
- **Settlement costs:** $10,000 - $100,000+ per lawsuit
- **Market size:** $6.6B by 2026 (growing 25% annually)

**Your Positioning:**
- "Stay ahead of June 2025 EAA deadline"
- "Avoid costly ADA lawsuits"
- "Expand your market - 16% of population has disabilities"
- "Accessibility improves SEO"

---

## Implementation Roadmap

### Month 1: Foundation & Your Portfolio

**Week 1-2: Research & Setup**
- [ ] Set up n8n on DigitalOcean droplet
- [ ] Create Zapier account and test webhooks
- [ ] Study MCP documentation and examples
- [ ] Audit your portfolio for accessibility issues

**Week 3-4: Quick Wins**
- [ ] Build 3-5 n8n workflows for your brand
- [ ] Add Zapier to contact form
- [ ] Implement AI alt text generation
- [ ] Fix accessibility issues on portfolio

### Month 2: Service Pages & Documentation

**Week 1-2: Create Service Offerings**
- [ ] Add 3 new service cards to Services.astro:
  - Automatización Inteligente
  - AI y Asistentes Virtuales
  - Accesibilidad Web AI
- [ ] Build dedicated landing pages for each service
- [ ] Create pricing calculators
- [ ] Design case study templates

**Week 3-4: Build Templates & Demos**
- [ ] Create 10 n8n workflow templates for clients
- [ ] Build 5 common Zapier workflows
- [ ] Develop accessibility widget demo
- [ ] Record tutorial videos

### Month 3: Marketing & First Clients

**Week 1-2: Content Marketing**
- [ ] Write blog post: "How I Automated My Business"
- [ ] Create LinkedIn posts showcasing workflows
- [ ] Build "Free Automation Audit" lead magnet
- [ ] Start email campaign to existing contacts

**Week 3-4: Launch Services**
- [ ] Offer pilot programs (50% discount)
- [ ] Create client onboarding process
- [ ] Set up project management system
- [ ] Build feedback collection system

### Month 4+: Scale & Optimize

- [ ] Refine pricing based on pilot data
- [ ] Develop case studies from first clients
- [ ] Create productized services (fixed scope/price)
- [ ] Build affiliate/referral program
- [ ] Explore partnerships with agencies

---

## Technical Requirements

### Tools & Services Needed

**Development:**
- Node.js 18+ / Python 3.9+
- Docker (for n8n)
- Git & GitHub
- VS Code with MCP extension

**Hosting & Infrastructure:**
- DigitalOcean / Railway / Vercel
- Domain & SSL certificates
- CDN (Cloudflare)

**APIs & Services:**
- OpenAI API ($20-200/month depending on usage)
- Anthropic Claude API ($10-500/month)
- Zapier (Free tier, then $19.99-$799/month)
- n8n Cloud (optional: €20-€120/month) or self-host (FREE)

**Testing & Monitoring:**
- Axe DevTools
- WAVE browser extension
- Lighthouse CI
- Sentry or LogRocket

**Estimated Monthly Costs:**
- **Minimal Setup:** $20-50 (APIs only, self-host everything)
- **Recommended Setup:** $100-200 (some hosted services, higher API limits)
- **Professional Setup:** $300-500 (all managed services, high reliability)

---

## ROI & Business Case

### Time Savings (Your Brand)
- **Social Media Management:** 10 hours/week → 1 hour/week
- **Lead Follow-up:** 5 hours/week → Automated
- **Reporting:** 3 hours/week → Automated
- **Content Distribution:** 4 hours/week → Automated

**Total:** 20+ hours/week saved = $4,000-8,000/month value

### Revenue Potential (Client Services)

**Conservative Year 1 Projections:**

**Automation Services (n8n/Zapier):**
- 3 projects/month × $1,500 avg = $4,500/month
- 10 maintenance clients × $150 avg = $1,500/month
- **Subtotal:** $6,000/month = $72,000/year

**AI/MCP Services:**
- 1 project/month × $5,000 avg = $5,000/month
- 3 monitoring clients × $300 avg = $900/month
- **Subtotal:** $5,900/month = $70,800/year

**Accessibility Services:**
- 2 audits/month × $800 avg = $1,600/month
- 1 remediation/month × $3,000 avg = $3,000/month
- 5 monitoring clients × $250 avg = $1,250/month
- **Subtotal:** $5,850/month = $70,200/year

**Total Conservative Projection:** $213,000/year
**Less 30% expenses:** $149,100/year net

### Competitive Advantages

1. **Full-Stack Offering:** Most competitors specialize in one area
2. **Local Market:** Few developers in Latin America offer these services
3. **Cost Effective:** Lower prices than US/EU agencies
4. **Bilingual:** Serve both Spanish and English markets
5. **Modern Tech:** Using cutting-edge tools (MCP is brand new)

---

## Marketing & Positioning

### Target Markets

**Primary:**
1. **Small Businesses (50-500 employees)**
   - Too big for manual processes
   - Too small for enterprise solutions
   - Budget: $500-5,000/project

2. **Digital Agencies**
   - White-label automation services
   - Expand service offerings
   - Recurring partnership revenue

3. **E-commerce Brands**
   - High transaction volume
   - Customer service bottlenecks
   - Accessibility compliance needs

**Secondary:**
4. **SaaS Companies**
   - Need integration support
   - AI features for competitive advantage
   - Accessibility for market expansion

5. **Government & Education**
   - Accessibility is mandatory
   - Budget available
   - Long-term contracts

### Messaging Framework

**Problem → Solution → Result:**

**Automation:**
- **Problem:** "Spending 20 hours/week on repetitive tasks"
- **Solution:** "n8n workflows automate your entire workflow"
- **Result:** "Save 20 hours and $8,000/month"

**AI Assistants:**
- **Problem:** "Can't afford 24/7 customer service team"
- **Solution:** "AI assistant powered by MCP handles 80% of inquiries"
- **Result:** "Reduce support costs by 60%, increase satisfaction"

**Accessibility:**
- **Problem:** "Risk of ADA lawsuit, losing 16% of potential customers"
- **Solution:** "AI-powered accessibility compliance in 2-4 weeks"
- **Result:** "Legal protection + expanded market + better SEO"

### Content Strategy

**Blog Topics:**
1. "How I Saved 20 Hours Per Week with n8n Automation"
2. "Building an AI Assistant for My Portfolio with MCP"
3. "Web Accessibility: The $6.6B Market You're Missing"
4. "n8n vs Zapier: Which Automation Tool is Right for You?"
5. "10 Business Workflows Every Small Business Should Automate"
6. "AI Accessibility Tools: The Future of WCAG Compliance"
7. "From Manual to Automated: A Digital Agency's Journey"

**Social Media:**
- Weekly automation tip on LinkedIn
- Time-lapse videos of building workflows
- Before/after accessibility comparisons
- Client success stories (with permission)
- Free templates and resources

**Lead Magnets:**
1. "15 Must-Have Business Automations" (PDF checklist)
2. "Free 30-Minute Automation Audit" (Calendly booking)
3. "Website Accessibility Checklist" (PDF + video)
4. "n8n Workflow Templates Pack" (Download)

---

## Risk Mitigation

### Technical Risks

**Risk:** OpenAI/Anthropic API costs spiral
**Mitigation:**
- Set monthly spending limits
- Use caching aggressively
- Offer tiered plans based on usage
- Consider open-source alternatives (Llama, Mistral)

**Risk:** n8n self-hosted server goes down
**Mitigation:**
- Use managed n8n Cloud for critical clients
- Implement monitoring and alerts
- Automated backups daily
- Document recovery procedures

**Risk:** Accessibility tools give false positives/negatives
**Mitigation:**
- Always include manual testing
- Partner with certified accessibility auditor
- Clear disclaimer in contracts
- Maintain E&O insurance

### Business Risks

**Risk:** Services are too complex for clients to understand
**Mitigation:**
- Create simple, jargon-free explanations
- Video demos and case studies
- Free consultation calls
- Trial periods or money-back guarantee

**Risk:** Overcommitting and unable to deliver
**Mitigation:**
- Start with 3 pilot clients max
- Template everything possible
- Hire contractor for overflow
- Clear capacity planning

**Risk:** Clients don't see value/ROI
**Mitigation:**
- Track metrics religiously (time saved, cost saved)
- Monthly reporting
- Regular optimization sessions
- Success stories and testimonials

---

## Next Steps

### Immediate Actions (This Week)

1. **Set up n8n locally** - Install and test workflows
2. **Create Zapier account** - Experiment with integrations
3. **Study MCP examples** - Review GitHub repos and docs
4. **Audit portfolio accessibility** - Use Lighthouse and WAVE

### This Month

1. **Build first 5 automation workflows** for your brand
2. **Create service pages** with pricing and descriptions
3. **Design case study template** for future clients
4. **Write first blog post** about automation

### This Quarter

1. **Launch pilot program** - 3 clients at 50% discount
2. **Create video tutorials** for common workflows
3. **Build MCP portfolio assistant** (beta version)
4. **Establish partnerships** with 2-3 complementary agencies

---

## Conclusion

These four technologies represent a massive opportunity to:

1. **Differentiate your brand** - Few competitors offer all four
2. **Increase recurring revenue** - Maintenance and monitoring contracts
3. **Scale your business** - Automation allows serving more clients
4. **Help clients succeed** - Real, measurable ROI

**Key Success Factors:**
- Start small and iterate
- Document everything
- Focus on client outcomes
- Build in public (content marketing)
- Continuously learn and improve

**The market is ready.** EAA compliance deadline is June 2025. AI adoption is accelerating. Businesses are desperate to automate.

**You have the technical skills.** Your Astro portfolio proves your development capabilities. Now it's time to expand into these high-value services.

---

## Resources

### Official Documentation
- [n8n Docs](https://docs.n8n.io/)
- [Zapier Platform](https://platform.zapier.com/)
- [MCP Specification](https://github.com/modelcontextprotocol)
- [Claude MCP Docs](https://docs.claude.com/en/docs/mcp)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Learning Resources
- [Anthropic MCP Course (Free)](https://anthropic.skilljar.com/introduction-to-model-context-protocol)
- [n8n Academy](https://docs.n8n.io/courses/)
- [Zapier University](https://zapier.com/university)
- [Web Accessibility Course (Udemy)](https://www.udacity.com/course/web-accessibility--ud891)

### Communities
- [n8n Community Forum](https://community.n8n.io/)
- [MCP GitHub Discussions](https://github.com/modelcontextprotocol/discussions)
- [A11y Slack](https://web-a11y.slack.com/)
- [Indie Hackers - Automation](https://www.indiehackers.com/)

### Tools
- [n8n Templates](https://n8n.io/workflows/)
- [Zapier Zap Templates](https://zapier.com/apps)
- [MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Axe DevTools](https://www.deque.com/axe/devtools/)

---

**Document Version:** 1.0
**Last Updated:** October 16, 2025
**Next Review:** November 2025
