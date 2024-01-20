import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((value) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        typeof value === 'object' && 'meta' in value && 'data' in value
          ? value
          : { data: value },
      ),
    );
  }
}
