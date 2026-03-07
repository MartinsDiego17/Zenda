import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar perfil de usuario',
    description: 'Actualiza los datos del perfil de un usuario específico según su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario cuyo perfil se desea actualizar',
    example: 'abc123',
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado.' })
  async update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update({ userId: id, updateProfileDto });
  }
}