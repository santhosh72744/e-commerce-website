import { IsString, IsOptional, IsIn, IsArray, ValidateNested, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNavbarItemDto {
  @IsString() title!: string;
  @IsOptional() @IsString() href?: string;
  @IsOptional() @IsIn(['link','dropdown','mega']) type?: 'link'|'dropdown'|'mega';
  @IsOptional() @IsNumber() order?: number;
  @IsOptional() @IsBoolean() visible?: boolean;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateNavbarItemDto) children?: CreateNavbarItemDto[];
}
