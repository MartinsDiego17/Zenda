import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalSettingDto } from './create-professional-setting.dto';

export class UpdateProfessionalSettingDto extends PartialType(CreateProfessionalSettingDto) {}
