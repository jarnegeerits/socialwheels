import { Injectable } from '@angular/core';
// Soort van TODO lijst voor opdrachten
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  taskId: number;
  tastTitle: string = '';
  taskPrice = 0;
  complete: boolean = false;
  constructor(values: Object = {}) {
    Object.assign(this, values);
   }
}
