import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Input validation
  if (!req.query?.seek || typeof req.query.seek !== 'string') {
    return res.status(400).json({msg: "Invalid or missing 'seek' parameter"});
  }

  const seek = req.query.seek.trim();
  
  if (!seek || seek.length > 2000) {
    return res.status(400).json({msg: "Prompt must be between 1 and 2000 characters"});
  }

  const key = process.env.GPT_3_KEY;
  
  if (!key) {
    return res.status(500).json({msg: "API key not configured"});
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "model": "text-davinci-003",
          "prompt": seek,
          "max_tokens": 4000,
          "temperature": 1.0
        })
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({msg: "API request failed", error: data});
    }
    
    return res.status(200).json(data?.choices?.[0]?.text || '- - no answer - -');
  } catch (error) {
    return res.status(500).json({msg: "Internal server error"});
  }
}