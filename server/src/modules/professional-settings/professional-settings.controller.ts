import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ProfessionalSettingsService } from './professional-settings.service';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Professional Settings')
@UseGuards(AuthGuard)
@Controller('professional-settings')
export class ProfessionalSettingsController {
  constructor(private readonly professionalSettingsService: ProfessionalSettingsService) { }

  @Get()
  @ApiOperation({
    summary: 'Obtener configuración del profesional',
    description: 'Retorna la configuración actual del profesional, incluyendo preferencias y parámetros del sistema.',
  })
  @ApiResponse({ status: 200, description: 'Configuración obtenida exitosamente.' })
  @ApiResponse({ status: 404, description: 'Configuración no encontrada.' })
  async get() {
    const professionalSettings = await this.professionalSettingsService.get();
    return professionalSettings;
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar configuración del profesional',
    description: 'Actualiza parcialmente la configuración de un profesional según su ID.',
  })
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id', description: 'ID de la configuración a actualizar', example: 'cfg123' })
  @ApiBody({ type: UpdateProfessionalSettingDto, description: 'Campos a actualizar en la configuración' })
  @ApiResponse({ status: 200, description: 'Configuración actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Configuración no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })

  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProfessionalSettingDto,
  ) {
    return this.professionalSettingsService.update(id, dto);
  }
}