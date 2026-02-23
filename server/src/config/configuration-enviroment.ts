import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  supabase_url: process.env.SUPABASE_URL,
  supabase_api_key: process.env.SUPABASE_API_KEY,
  mp_access_token: process.env.TEST_MP_ACCESS_TOKEN,
}));
