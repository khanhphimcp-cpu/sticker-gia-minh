const crypto = require('crypto');

// Base64 encoded Service Account Key for Google Analytics Data API
const DEFAULT_B64_KEY = `ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAic3RpY2tlci1naWEtbWluaCIsCiAgInByaXZhdGVfa2V5X2lkIjogImNiNmZmODA3NmI0Y2RkZWI4NjVjYTg1NDA3MGJjNmJlNzkwMWE5NWUiLAogICJwcml2YXRlX2tleSI6ICItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ3N6cURnYnN6akp3Q2pcbk9VdHF0a3ZmQnpyZFZQVjhRNk0zWHBVKzFWSStXY0tmVWJqd3h1a1l1YzVMcHJrUUxJa05XQjlOakU1V1NoZnVcbmhteHlWM1pEMUZFVjlXM0d0dW1VSFE3ZmVqOGhLK2c2OWtpa0FyK2ZESUNpaXB6ZU5WQngyVDJSRFhhMHhyZ3pcbjlwYzV5RmlxSjAyNXFndmNJYUFldi8wZm1hU0tkQTIrTmVZL0hRT3RjVE5tZ0tqUnBrcDVUdHcxVW9WM3Z3bitcblRNZVlNV25IZ2dmK2M2aG1oU2pzb24zY2IwNHRRQUV2a0oxVlhSeHBCQ3UwRVoza1JyU1g1UUFTRzkrZTVWam1cbmJsR0p1ZW9nL0NvOE1TMStFM2F2Rk9zVU83ZytDeHpDVUlNanZLVktyUGREQXRmM2l5NHV5N0lwMXR2cGx5c0RcbnpHUkZsV0pEQWdNQkFBRUNnZ0VBRGxSaUZjcEtWaW5GVFVPeWc4cFRGMDczckNQZjZXcUliYzU3ak1iT3Q1bmtcbjRDWThNa2NrVENjWU9zQzhCdUhTaVpjOW5VWWR0dDBWQi9RQXFTaWtoM0pqT1BGdHBYVkVnRUk2bWdCK25LY1JcbjdsVys1MDdOQ2dqVTMrV2pwVytCV0xkOWVmcEdWaTVHVnhURExJajNCVUVXR21mRjdQNmkwdm56cVB1cUg4cmxcbitJL0FGMmhCbGloV1dBYks5M3ZBQXptL3FtODBHNXNqS2pZTUZkbzZXYWlhUkV0MUI2UDhkSW8xVXZ2MHUrVG5cbldLUFNnVmh5QlRTZ203Z3hVTVlaOHlRQXR5MHk0RHBzWFBKbU5LZDBTMmtHYmtWcmErb2YyT1pTamppeE90d3Ncbm96QWJiNVNycExiTXRUV3owR25JMEZPWVJiNE9WOGZHZSt6SktnSnhGUUtCZ1FEVUV2NmMwRmVBOFJvTXh4M2FcbklMNHRRM2RUc052SUtWcmpQVXlLQ0pCaTZUa0ovYmtWNnIwS0ZFdzdTZWxReHFQb3piY0hqL28vR3pWTU1NVHJcbitqZFV0V3liZFlOYkpNdms1NnlkR1dYQndmbTd1REVIQm5hTmRjTXNDOUIyellsbzJKbUxzWnpyY2Q1bDhrM0lcblYwNXc3S2J4dU9aRE03ZUF6UWlGRHMvOXZRS0JnUURRbVlwbUl2d0RYU3BhUWZlcUFYTFJ1UythbVFJbUpvMFpcbkFZYmJVMFZaSHhzWEtadE5RWWlwNE9jU1dZNzZGajFhVkVaOUFqbjdmZmV0RWJBdW9WVGtwSTBVVzMrcWx1b2JcbldNL1VYOXVGUDNUb2FjVHpzYjE1Q2V3WHRXM2xXQW9UZVpENEtzYTFNRlZYeGpmeDk0dGZjTTZLMFhJS2dQZXpcblJjRjlKZURmL3dLQmdFZ3Rnc3lhTi8zaGtRMGlRNjIya1NOVW4rc3krVXBoa05aZ1NZbDlLcThQVTJOc0lDOHVcbmFsSmc0Q1VabmJmcE0yWUxoYXlrT3ZaNWF5VllQOTFVbHJwVTJQYjhBczNsY3lPZ0dlYUorMUQ3bE9SbjV2L09cbkdsRkE4RUV3Y0MzTy9HSmJ2YjZHbjdLZVdhUDIyTFJEeXFXeVZZdFZjOEVSZS9YeFVtSCt6Wms5QW9HQVJpQlhcbjlwNHNPclZIVjdCMW9pRjZpQ2JKYWgrbUtVMHNnZ3VSV29wVDlmSVBHV3BUVzFWOHJCOS9qeHVzaFVhVXVaazdcbldTczJjdVdXTGdpVVFoamFnVU1RYXBlWUE3RllZbmtvNVN5VWorY1ZWa3k0ZVhSM1RnbVg1U0NKSVdESGdtU0xcbjUrSDVpMUFFWU0yeVlSWG5OTjZua09ONGd5OTRGanlOSDVWc1UrRUNnWUJONXh0NFFnSUk5dDY0U3ZtcXJxaElcbjM5UjJMREtULytRbUxIa0s5NVF4YlcwRnB1QStXUThWZGtXemdLa3luVlR6ZnI1WjR4VEYvSUdWcWtpSFBOa0VcbllMU3BjY0FGWDQxUlpDVVp4Vkh0bkVrMEVUVzNzRmN4enI2bjZRZ05lWlVzcUQyQm1sVDJ2OGV2NWtBVVRSTzhcblZOSFZ4RHhOZXNQQWs4N0hCZXpvVWc9PVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwKICAiY2xpZW50X2VtYWlsIjogIndlYnNpdGUtY291bnRlckBzdGlja2VyLWdpYS1taW5oLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjExMDMxNDI3MTEwMjUzMzExMjUzMCIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwKICAiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS9jZXJ0cyIsCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvd2Vic2l0ZS1jb3VudGVyJTQwc3RpY2tlci1naWEtbWluaC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgInVuaXZlcnNlX2RvbWFpbiI6ICJnb29nbGVhcGlzLmNvbSIKfQo=`;

const PROPERTY_ID = process.env.GA_PROPERTY_ID || '545087048';

function getKey() {
  if (process.env.GA_SERVICE_KEY) {
    try {
      return JSON.parse(process.env.GA_SERVICE_KEY);
    } catch (e) {
      return JSON.parse(Buffer.from(process.env.GA_SERVICE_KEY, 'base64').toString('utf8'));
    }
  }
  return JSON.parse(Buffer.from(DEFAULT_B64_KEY, 'base64').toString('utf8'));
}

function createJWT(email, privateKey, scopes) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: email,
    scope: scopes,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };
  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(b64Header + '.' + b64Payload);
  const signature = sign.sign(privateKey, 'base64url');
  return b64Header + '.' + b64Payload + '.' + signature;
}

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiresAt > now + 60) return cachedToken;
  const jwt = createJWT(key.client_email, key.private_key, 'https://www.googleapis.com/auth/analytics.readonly');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to obtain access token');
  }
  cachedToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in || 3600);
  return cachedToken;
}

let cachedStats = null;
let statsCachedAt = 0;
const CACHE_TTL_MS = 30 * 1000; // 30s cache

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const now = Date.now();
  if (cachedStats && (now - statsCachedAt < CACHE_TTL_MS)) {
    return res.status(200).json(cachedStats);
  }

  try {
    const key = getKey();
    const token = await getAccessToken(key);
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    };

    const rtPromise = fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runRealtimeReport`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ metrics: [{ name: 'activeUsers' }] })
    }).then(r => r.json());

    const batchPromise = fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:batchRunReports`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        requests: [
          {
            dateRanges: [{ startDate: 'today', endDate: 'today' }],
            metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }]
          },
          {
            dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
            metrics: [{ name: 'screenPageViews' }]
          },
          {
            dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
            metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }]
          }
        ]
      })
    }).then(r => r.json());

    const [rtData, batchData] = await Promise.all([rtPromise, batchPromise]);

    const rawOnline = parseInt(rtData.rows?.[0]?.metricValues?.[0]?.value || '0', 10);
    const todayViews = parseInt(batchData.reports?.[0]?.rows?.[0]?.metricValues?.[0]?.value || '0', 10);
    const monthViews = parseInt(batchData.reports?.[1]?.rows?.[0]?.metricValues?.[0]?.value || '0', 10);
    const totalViews = parseInt(batchData.reports?.[2]?.rows?.[0]?.metricValues?.[0]?.value || '0', 10);

    const result = {
      success: true,
      online: Math.max(1, rawOnline),
      today: todayViews,
      month: monthViews,
      total: totalViews,
      updatedAt: new Date().toISOString()
    };

    cachedStats = result;
    statsCachedAt = now;

    return res.status(200).json(result);
  } catch (error) {
    console.error('GA4 counter error:', error);
    return res.status(200).json({
      success: false,
      online: cachedStats ? cachedStats.online : 1,
      today: cachedStats ? cachedStats.today : 30,
      month: cachedStats ? cachedStats.month : 221,
      total: cachedStats ? cachedStats.total : 1682,
      error: error.message
    });
  }
};
