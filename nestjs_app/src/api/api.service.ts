import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class ApiService {
	logger: any;
	constructor(private httpService: HttpService) {}

	async findMe() {
		let token = '7229da50527f9fcfd2f3d8c515629c6627c10313389f196f3c12f52f96fd3799';
		const url = `https://api.intra.42.fr/v2/me`;
		const headersRequest = {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		};
		const axios = require('axios');

		try {
			const response = await axios.get(url, { headers: headersRequest });
			console.log(response.data);
			return response.data;
		  } catch (error) {
			console.error(error);
		  }
	}
}
