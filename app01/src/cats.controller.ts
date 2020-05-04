import { Controller, Get, Post, Header, Query, Redirect, Param, Body } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { CreateCatDto } from "./create-cat.dto";

@Controller('cats')
export class CatsController {
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
    findAll(): string {
        return 'This action returns all cats';
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto): string {
        return 'This action adds a new cat';
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