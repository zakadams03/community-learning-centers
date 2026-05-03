const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/search', async (req, res) => {
  const { location } = req.body;
  if (!location) return res.status(400).json({ error: 'Location is required' });
  if (API_KEY === 'PASTE-YOUR-KEY-HERE') return res.status(500).json({ error: 'Open server.js and paste your API key on line 8.' });

  console.log(`Searching for: ${location}`);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        system: `You are a research assistant helping educators find community organizations near schools.

When given a school or location, search for REAL community organizations already operating near that area. Think practically: hospitals, dental clinics, food banks, mental health providers, volunteer organisations, childcare centres, career mentoring programmes, libraries, youth clubs, churches with community programmes, housing assistance, vision care providers.

Categorize each into one of four Community Schools pillars (Maier & Oakes, 2017):
1. INTEGRATED STUDENT SUPPORTS - Hospitals, health clinics, dental centres, vision care, mental health, food banks, clothing banks, social services, housing
2. EXPANDED LEARNING TIME AND OPPORTUNITIES - After-school, tutoring, summer camps, mentoring, internships, youth clubs, libraries, career exposure
3. FAMILY AND COMMUNITY ENGAGEMENT - Parent workshops, adult education, ESL, family resource centres, volunteer orgs, community centres
4. COLLABORATIVE LEADERSHIP AND PRACTICE - Workforce development, collective impact, neighbourhood development, civic groups

Return ONLY valid JSON with no other text. The JSON should have this exact structure:
{ "school_name": "name", "organizations": [{ "name": "Org Name", "description": "What they do", "pillar": 1, "pillar_name": "Integrated Student Supports", "relevance": "How they could partner" }] }
Find 8-12 real organizations. Use web search to find actual organizations.`,
        messages: [{ role: 'user', content: `Find community organizations near: ${location}` }]
      })
    });

    const data = await response.json();

    // Check for API errors
    if (data.error) {
      console.error('API error:', data.error);
      return res.status(500).json({ error: data.error.message || 'API error — check your key is valid.' });
    }

    // Extract all text blocks from the response
    const allText = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    if (!allText) {
      // If no text blocks, log what we got
      const blockTypes = (data.content || []).map(b => b.type).join(', ');
      console.log('Response block types:', blockTypes);
      console.log('Stop reason:', data.stop_reason);

      // If the model stopped to use a tool but didn't return text yet, 
      // it means we need to handle the tool result — but with web_search 
      // the API should handle this automatically. Log for debugging.
      console.log('Full response (first 1000 chars):', JSON.stringify(data).slice(0, 1000));
      return res.status(500).json({ error: 'No text in response. Check your terminal for debug info.' });
    }

    console.log('Got response, parsing JSON...');

    // Try to parse as JSON — the response may have text before/after the JSON
    try {
      // Find JSON object in the text
      const jsonMatch = allText.match(/\{[\s\S]*"organizations"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log(`Found ${parsed.organizations?.length || 0} organizations`);
        return res.json(parsed);
      }
      // Try cleaning markdown fences
      const cleaned = allText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(cleaned);
      console.log(`Found ${parsed.organizations?.length || 0} organizations`);
      return res.json(parsed);
    } catch (parseErr) {
      console.log('Could not parse as JSON, returning raw text');
      return res.json({ raw: allText });
    }

  } catch (err) {
    console.error('Request failed:', err.message);
    return res.status(500).json({ error: 'Request failed: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n  Community Learning Centers`);
  console.log(`  Running at: http://localhost:${PORT}`);
  if (API_KEY === 'PASTE-YOUR-KEY-HERE') {
    console.log(`\n  ⚠ Open server.js and paste your API key on line 8`);
    console.log(`  Get one at: https://console.anthropic.com/settings/keys\n`);
  } else {
    console.log(`  API key loaded ✓\n`);
  }
});
