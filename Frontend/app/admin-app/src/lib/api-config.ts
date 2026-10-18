import { setApiBaseUrl } from '@packages/api-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
setApiBaseUrl(API_URL);