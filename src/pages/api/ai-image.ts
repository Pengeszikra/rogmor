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
  
  if (!seek || seek.length > 1000) {
    return res.status(400).json({msg: "Prompt must be between 1 and 1000 characters"});
  }

  // Validate 'n' parameter
  const n = req.query.n ? parseInt(req.query.n as string, 10) : 1;
  if (isNaN(n) || n < 1 || n > 10) {
    return res.status(400).json({msg: "Parameter 'n' must be between 1 and 10"});
  }

  // Validate 'size' parameter
  const validSizes = ["256x256", "512x512", "1024x1024"];
  const size = (req.query.size as string) || "256x256";
  if (!validSizes.includes(size)) {
    return res.status(400).json({msg: `Size must be one of: ${validSizes.join(', ')}`});
  }

  const key = process.env.GPT_3_KEY;
  
  if (!key) {
    return res.status(500).json({msg: "API key not configured"});
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "prompt": seek,
          "n": n,
          "size": size,
        })
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({msg: "API request failed", error: data});
    }
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({msg: "Internal server error"});
  }
}