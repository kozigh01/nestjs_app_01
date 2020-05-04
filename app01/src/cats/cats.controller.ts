import { Controller, Get, Post, Header, Query, Redirect, Param, Body } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interfaces";

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get('async')
    findAllAsync(): Observable<any[]> {
        return of(['one', 'two']);
    }

    @Get('async2')
    async findAllAsync2(): Promise<string[]> {
        return ['three', 'four'];
    }

    @Get()
    @Header('Test-Header', 'testing')
    findAll(): Cat[] {
        return this.catsService.findAll();
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto): Cat {
        this.catsService.create(createCatDto);
        return createCatDto;
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }
    
    @Get('/alt/:id')
    findOneAlt(@Param('id') id): string {
        console.log(id);
        return `This action returns a #${id} cat`;
    }
}