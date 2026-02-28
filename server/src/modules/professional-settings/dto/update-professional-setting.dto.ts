import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    Min,
} from 'class-validator';

export enum SessionModality {
    Virtual = 'Virtual',
    Presencial = 'Presencial',
    BOTH = 'BOTH',
}

export class UpdateProfessionalSettingDto {
    @IsUUID()
    user_id: string;

    @IsInt()
    @Min(15)
    @Max(180)
    session_duration_minutes: number;

    @IsString()
    work_days: string;

    @IsString()
    work_start_time: string;

    @IsString()
    work_end_time: string;

    @IsInt()
    @Min(1)
    @Max(365)
    reservation_window_days: number;

    @IsBoolean()
    requires_deposit: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    deposit_amount?: number | null;

    @IsEnum(SessionModality)
    session_modalities: SessionModality;

    @IsOptional()
    @IsString()
    office_address?: string | null;
}