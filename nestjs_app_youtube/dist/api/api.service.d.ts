import { HttpService } from '@nestjs/axios';
export declare class ApiService {
    private httpService;
    logger: any;
    constructor(httpService: HttpService);
    findMe(): Promise<any>;
}
