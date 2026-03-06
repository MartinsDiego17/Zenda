// src/common/guards/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/modules/supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly supabaseService: SupabaseService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();


        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token no proporcionado');
        }

        const token = authHeader.split(' ')[1];

        const { data, error } = await this.supabaseService.getClient().auth.getUser(token);
        if (error || !data.user) {
            throw new UnauthorizedException('Token inválido o expirado');
        }

        request.user = data.user;
        return true;
    }
}