import { Injectable } from '@nestjs/common';
import { createImageURL } from './multer.options';

@Injectable()
export class FileService {
	uploadFiles(file:  Express.Multer.File): string {
		return createImageURL(file);
		// http://localhost:8080/public/파일이름 형식으로 저장이 됩니다.
	}
}
