import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.options';
import { FileService } from './file.service'

@Controller('file')
export class FileController {
	constructor(private fileService: FileService) {}

	@Post('/upload')
	@UseInterceptors(FileInterceptor('file', multerOptions))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.fileService.uploadFiles(file);
	}

}
