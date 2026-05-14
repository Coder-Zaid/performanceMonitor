import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  @IsUUID()
  kpiId: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
