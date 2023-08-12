import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Request, Response, NextFunction } from 'express';

//@note https://stackoverflow.com/questions/68140035/exclude-users-password-from-query-with-prisma-2
@Injectable()
export class ExcludePasswordMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (body: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const updatedBody = this.excludePasswordFromBody(body);
      return originalJson.call(res, updatedBody);
    }.bind(this);

    await next();
  }

  private excludePasswordFromBody(data: any): any {
    if (data && typeof data === 'object') {
      if (Array.isArray(data))
        return data.map((item: any) => this.excludePasswordFromBody(item));

      const { password, ...updatedData } = data;
      for (const key in updatedData) {
        if (typeof updatedData[key] === 'object') {
          updatedData[key] = this.excludePasswordFromBody(updatedData[key]);
        }
      }

      return {
        ...updatedData,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    }

    return data;
  }
}
