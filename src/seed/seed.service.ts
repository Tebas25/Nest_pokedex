import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/httpAdapters/axios.adapter';


@Injectable()
export class SeedService  {

  

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){}

  async executeSeed(){
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
    const pokemonToInsert :  {name: string, no: number}[] = [];
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no =  +segments[segments.length -2];
      pokemonToInsert.push({name, no});
    })

    try{
      const pokemondb = this.pokemonModel.insertMany (pokemonToInsert);
    } catch(error){
      this.handleExceptions(error);
    }

  }

  private handleExceptions(error: any){
      if(error.code == 11000){
        throw new BadRequestException(`Pokemon existe en la DB ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemo - Chaeck server logs`)
    }

}
