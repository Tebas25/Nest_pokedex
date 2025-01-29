import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { AxiosAdapter } from 'src/common/httpAdapters/axios.adapter';

@Module({
  controllers: [SeedController],
  providers: [SeedService, AxiosAdapter],
  imports: [PokemonModule]
})
export class SeedModule {}
