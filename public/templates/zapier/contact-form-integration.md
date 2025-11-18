# Zapier Template: Contact Form to CRM Integration

## Overview
Automatically capture form submissions and distribute them to your CRM, email, and team communication tools.

## What This Zap Does
1. Triggers when someone submits your contact form
2. Sends auto-reply email to the prospect
3. Adds contact to Google Sheets for tracking
4. Creates contact in your CRM (HubSpot/Salesforce)
5. Notifies your sales team via Slack

## Time Saved
- **10-15 minutes per lead** (manual data entry eliminated)
- **Zero missed leads** (instant notifications)
- **100% data accuracy** (no typos from manual entry)

## Prerequisites
- Zapier account (Free tier works for up to 100 tasks/month)
- Gmail or business email account
- Google Sheets access
- Slack workspace (optional)
- CRM account (HubSpot, Salesforce, or Pipedrive)

## Step-by-Step Setup

### Step 1: Create the Trigger
1. Go to [Zapier.com](https://zapier.com) and click "Create Zap"
2. Search for your form tool (e.g., "Typeform", "Google Forms", "Webflow Forms")
3. Select trigger event: "New Form Submission"
4. Connect your form tool account
5. Select your specific form
6. Test the trigger to ensure it works

### Step 2: Send Auto-Reply Email
1. Click the "+" button to add an action
2. Search for "Gmail" or "Email by Zapier"
3. Choose action: "Send Email"
4. Configure the email:

**To:** `{{Email}}` (from form)
**Subject:** ¡Gracias por contactarnos!
**Body:**
```
Hola {{Name}},

Gracias por tu interés. Hemos recibido tu mensaje y te responderemos dentro de las próximas 24 horas.

Tu consulta:
{{Message}}

Mientras tanto, puedes:
- Explorar nuestro blog: [LINK]
- Agendar una llamada: [CALENDAR_LINK]

Saludos,
{{Your Name}}
{{Your Company}}
```

5. Test the action

### Step 3: Add to Google Sheets
1. Click "+" to add another action
2. Search for "Google Sheets"
3. Choose action: "Create Spreadsheet Row"
4. Select your spreadsheet and worksheet
5. Map the fields:
   - **Timestamp:** `{{Zap Meta Timestamp}}`
   - **Name:** `{{Name}}`
   - **Email:** `{{Email}}`
   - **Phone:** `{{Phone}}`
   - **Company:** `{{Company}}`
   - **Message:** `{{Message}}`
   - **Source:** `{{Form Name}}`
   - **Status:** "New"

6. Test the action

### Step 4: Create CRM Contact
1. Click "+" to add action
2. Search for your CRM (e.g., "HubSpot")
3. Choose action: "Create or Update Contact"
4. Map the fields:
   - **Email:** `{{Email}}`
   - **First Name:** `{{First Name}}`
   - **Last Name:** `{{Last Name}}`
   - **Phone:** `{{Phone}}`
   - **Company:** `{{Company}}`
   - **Lead Status:** "New"
   - **Lifecycle Stage:** "Lead"

5. Test the action

### Step 5: Notify Slack (Optional)
1. Click "+" to add action
2. Search for "Slack"
3. Choose action: "Send Channel Message"
4. Select your Slack channel (e.g., #leads)
5. Configure the message:

```
🎯 *New Lead Captured!*

*Name:* {{Name}}
*Email:* {{Email}}
*Phone:* {{Phone}}
*Company:* {{Company}}

*Message:*
{{Message}}

*Source:* {{Form Name}}
*Time:* {{Zap Meta Timestamp}}
```

6. Test the action

### Step 6: Turn On Your Zap
1. Review all steps
2. Give your Zap a descriptive name (e.g., "Contact Form → CRM + Sheets + Slack")
3. Click "Publish" or "Turn On"

## Customization Ideas

### Add Lead Scoring
Use "Formatter by Zapier" to calculate a lead score based on:
- Company provided: +20 points
- Phone provided: +15 points
- Long message (>100 chars): +15 points
- Specific keywords mentioned: +20 points

### Add Conditional Logic
Use "Paths by Zapier" to:
- Send high-value leads directly to sales rep via SMS
- Send low-value leads to nurture email sequence
- Route leads by industry to specialized team members

### Add Follow-up Sequence
Connect to email marketing tool (Mailchimp, ConvertKit):
- Day 1: Welcome email
- Day 3: Educational content
- Day 7: Case study
- Day 14: Book a call

## Troubleshooting

**Problem:** Emails not sending
- **Solution:** Check Gmail permissions, ensure "Less secure app access" is enabled or use App Password

**Problem:** Duplicate entries in CRM
- **Solution:** Use "Find or Create" action instead of "Create" action

**Problem:** Zap not triggering
- **Solution:** Check that form is properly connected, test trigger again

## Cost Estimate

**Zapier Pricing:**
- Free: 100 tasks/month (perfect for testing)
- Starter ($19.99/mo): 750 tasks/month
- Professional ($49/mo): 2,000 tasks/month

**Example:** 50 form submissions/month
- 50 triggers
- 50 emails
- 50 sheet entries
- 50 CRM updates
- 50 Slack messages
= **250 tasks/month** (Starter plan needed)

## Support

Need help setting this up? Book a free 30-minute consultation:
[📅 Schedule Call](https://calendar.app.google/7zL3cZ713aYB9tCW6)

Or email: [your-email@example.com]

---

**Created by:** Deanny Bruces
**Last Updated:** October 2025
**Difficulty:** Beginner
**Estimated Setup Time:** 20-30 minutes
