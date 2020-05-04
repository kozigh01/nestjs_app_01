import { Controller, Get, Post, Header, Query, Redirect, Param, Body, HttpException, HttpStatus, ForbiddenException, UseFilters } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interfaces";
import { MyForbiddenException } from "src/exceptions/forbidden.exception";
import { HttpExceptionFilter } from "src/exceptions/http-exception.filter";

@Controller('cats')
@UseFilters(HttpExceptionFilter)  // controller scoped exception filter
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
    @UseFilters(HttpExceptionFilter)  // function scoped exception filter
    // @UseFilters(new HttpExceptionFilter())
    findAll(): Cat[] {
        throw new MyForbiddenException();
        // throw new Error('helllppp!');
        // throw new HttpException('Testing', HttpStatus.I_AM_A_TEAPOT);
        // throw new HttpException(
        //     {
        //         prop1: 'somehting goes here',
        //         error: "I'm an error",
        //         status: HttpStatus.NO_CONTENT
        //     },
        //     HttpStatus.NOT_FOUND
        // );

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