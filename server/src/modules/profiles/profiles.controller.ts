import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Profiles')
@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Get()
  @UseGuards(RolesGuard) 
  @ApiOperation({
    summary: 'Obtener todos los perfiles',
    description: 'Retorna una lista con todos los perfiles registrados en el sistema.',
  })
  @ApiResponse({ status: 200, description: 'Lista de perfiles obtenida exitosamente.' })
  @ApiResponse({ status: 403, description: 'No tenés permisos para acceder a este recurso.' })
  async findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un perfil por ID',
    description: 'Busca y retorna un perfil específico según el ID de usuario proporcionado.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario cuyo perfil se desea obtener',
    example: 'abc123',
  })
  @ApiResponse({ status: 200, description: 'Perfil encontrado exitosamente.' }) 
  @ApiResponse({ status: 404, description: 'Perfil no encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.profilesService.findOne({ userId: id });
  }
}