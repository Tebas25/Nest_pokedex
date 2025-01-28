import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    @IsInt({message: `Tiene que ingresar un número válido`})
    @IsPositive()
    @Min(1)
    no: number;
    @IsString({message: `Tiene que ingresar un nombre válido`})
    @MinLength(1)
    name: string;
}
