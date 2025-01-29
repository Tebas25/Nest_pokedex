import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { off } from 'process';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    }catch(error){
      this.handleExceptions(error);
    }   
  }

  findAll(pagination : paginationDto) {

    const { limit = 10, offset = 0} = pagination
    return this.pokemonModel.find().limit(limit).skip(offset)
      .sort({
        no : 1
      })
      .select('-__v')
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });

    if( !pokemon && isValidObjectId(term)) pokemon = await this.pokemonModel.findById(term);

    if(!pokemon) pokemon = await this.pokemonModel.findOne({name : term.toLowerCase().trim()})

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    try{
      const pokemon = await this.findOne(term);
      return { ...pokemon?.toJSON(), ...updatePokemonDto};
    }catch (error){
      this.handleExceptions(error);
    }    
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon?.deleteOne();
    //return { id }
    //const result = await this.pokemonModel.findById(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({_id : id})
    if (deletedCount == 0) throw new BadRequestException(`Pokemon with "${id}" not found`)
    return;
  }

  private handleExceptions(error: any){
    if(error.code == 11000){
      throw new BadRequestException(`Pokemon existe en la DB ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemo - Chaeck server logs`)
  }
}
