import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
 
  @Injectable()
  export class UserFilterInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const role = request.user?.role; // Récupérer le rôle
 
      return next.handle().pipe(
        map((data) => {
          if (role === 'admin') {
            return {
              id: data.id,
              email: data.email,
              role: data.role,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            };
          } else if (role === 'client') {
            return {
              id: data.id,
              email: data.email,
            };
          }
          return data;
        }),
      );
    }
  }
