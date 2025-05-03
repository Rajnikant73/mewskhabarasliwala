// pages/api/nepse.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get('https://nepalstock.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(data);
    const index = $('#changeIndex').text().trim();
    const change = $('#pointChange').text().trim();
    const percent = $('#percentChange').text().trim();

    res.status(200).json({
      index: index || 'N/A',
      change: change || 'N/A',
      percent: percent || 'N/A'
    });
  } catch (error) {
    console.error('Failed to fetch NEPSE:', error);
    res.status(500).json({ error: 'Failed to fetch NEPSE data' });
  }
}