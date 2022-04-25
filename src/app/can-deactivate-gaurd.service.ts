import { FormGroup } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface canComponentDeactivate {
  canDeactivate(): Promise<boolean> | Observable<boolean> | boolean;
}

export class CanDeactivateGaurd
  implements CanDeactivate<canComponentDeactivate>
{
  canDeactivate(
    component: canComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate();
  }
}
