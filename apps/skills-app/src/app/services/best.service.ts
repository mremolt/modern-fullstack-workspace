import { injectable } from 'inversify';

@injectable()
export class BestService {
  public getData(): string {
    return 'best data ever';
  }
}
