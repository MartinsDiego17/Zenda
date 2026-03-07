import { IsString, IsOptional, IsBoolean, IsDateString, IsEmail, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

type UserRole = "USER" | "ADMIN";

export class UpdateProfileDto {

    @ApiPropertyOptional({ example: 'abc123' })
    @IsOptional()
    @IsString()
    id?: string;

    @ApiPropertyOptional({ example: 'nahuel@gmail.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'Nahuel García' })
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    role?: UserRole;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiPropertyOptional({ example: '2005-04-26' })
    @IsOptional()
    @IsDateString()
    birth_date?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    is_profile_complete?: boolean;

    @ApiPropertyOptional({ example: '2024-01-01T00:00:00.000Z' })
    @IsOptional()
    @IsString()
    created_at?: string;
}