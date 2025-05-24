import { Controller, Post, Body} from '@nestjs/common';
import { AmigosService } from './amigos.service';
import { CreateAmigoDto } from './dto/create-amigo.dto';
// import { UpdateAmigoDto } from './dto/update-amigo.dto';

@Controller('amigos')
export class AmigosController {
  constructor(private readonly amigosService: AmigosService) {}

  @Post()
  create(@Body() createAmigoDto: CreateAmigoDto) {
    return this.amigosService.create(createAmigoDto);
  }

  // @Get()
  // findAll() {
  //   return this.amigosService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.amigosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAmigoDto: UpdateAmigoDto) {
  //   return this.amigosService.update(+id, updateAmigoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.amigosService.remove(+id);
  // }
}
