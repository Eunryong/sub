import { ApiService } from './api.service';
export declare class ApiController {
    private apiService;
    constructor(apiService: ApiService);
    findMe(): Promise<any>;
}
