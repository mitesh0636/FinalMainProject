import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Auth/auth.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input('appHasRole') targetRole: string = ''; 
  private sub?: Subscription;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.currentUser.subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    const userRole = this.authService.getRole(); 

    if (userRole === this.targetRole) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}