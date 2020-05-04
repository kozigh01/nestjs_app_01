import { Controller, Get, HostParam } from "@nestjs/common";

@Controller({ host: 'localhost', path: 'host' })
export class AccountController {
    @Get()
    getInfo(@HostParam('account') account: string) {
        return account;
    }
}