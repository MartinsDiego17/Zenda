import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private readonly client: SupabaseClient;

    constructor(private configService: ConfigService) {
        this.client = createClient(
            /*             this.configService.get<string>('supabase_url') || "",
                        this.configService.get<string>('supabase_api_key') || "", */
            this.configService.get<string>('https://mgzkcybntwhtnsewnoeb.supabase.co') || "",
            this.configService.get<string>('sb_publishable_lseuzWbPdww6sKitOZsQNA_CaGRvbd-') || "",
        );
    }

    getClient(): SupabaseClient {
        return this.client;
    }
}
