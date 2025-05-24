import { PartialType } from '@nestjs/mapped-types';
import { CreateUnificacionDto } from './create-unificacion.dto';

export class UpdateUnificacionDto extends PartialType(CreateUnificacionDto) {
  id: number;
}
