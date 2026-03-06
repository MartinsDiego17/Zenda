import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from 'src/modules/supabase/supabase.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    const { data, error } = await this.supabaseService
      .getClient()
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error || !data) {
      throw new ForbiddenException('No se pudo verificar el rol del usuario');
    }

    if (data.role !== 'ADMIN') {
      throw new ForbiddenException('No tenés permisos para acceder a este recurso');
    }

    return true;
  }
}