import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // P2002: Unique constraint failed
    if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      const target = exception.meta?.target as string[];
      message = \`Unique constraint failed on \${target ? target.join(', ') : 'fields'}\`;
    }
    
    // P2025: Record to update not found
    if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = 'Record not found';
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
    });
  }
}
