import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ManageProductsService extends ApiService {
  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config',
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url, file, {
          headers: { 'Content-Type': file.type },
          reportProgress: true,
          observe: 'events',
          responseType: 'text',
        }),
      ),
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'import');
    const authorization_token = localStorage.getItem('authorization_token');
    return this.http.get(url, {
      params: {
        name: fileName,
      },
      headers: {
        Authorization: `Basic ${authorization_token}`,
      },
      responseType: 'text',
    });
  }
}
