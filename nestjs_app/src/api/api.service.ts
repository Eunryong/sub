import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class ApiService {
	logger: any;
	constructor(private httpService: HttpService) {}

	async findMe() {
		let token = 'b7fd1fedb10ce877317552adf64948932d251574da672cf73c64011617f34e48';
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
