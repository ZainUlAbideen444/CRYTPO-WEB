// api/index.js — Central API client with JWT auth
const BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('cw_token');

const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

const req = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(),
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const authAPI = {
  register: (b) => req('POST', '/auth/register', b),
  login:    (b) => req('POST', '/auth/login', b),
  me:       ()  => req('GET',  '/auth/me'),
};

export const marketAPI = {
  getAll: () => req('GET', '/market'),
};

export const tradeAPI = {
  buy:  (b) => req('POST', '/trade/buy', b),
  sell: (b) => req('POST', '/trade/sell', b),
};

export const portfolioAPI = {
  getHoldings:     () => req('GET', '/portfolio'),
  getDashboard:    () => req('GET', '/portfolio/dashboard'),
  getTransactions: (p=1) => req('GET', `/portfolio/transactions?page=${p}&limit=50`),
};
