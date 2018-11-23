import { Component, OnInit, OnChanges, SecurityContext, Input  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
        // the fade-in/fade-out animation.
        // the trigger name does not matter, but it must match the name of the [@...] attribute in the template.
        trigger('simpleFadeAnimation', [

          // the "in" style determines the "resting" state of the element when it is visible.
          // the style name "in" must match the value of the [@simpleFadeAnimation]="'in'" attribute in the template
          state('in', style({opacity: 1})),

          // fade in when created. this could also be written as transition('void => *')
          transition(':enter', [
            // the styles start from this point when the element appears
            style({opacity: 0}),
            // and animate toward the "in" state above
            animate(600 )
          ]),

          // fade out when destroyed. this could also be written as transition('void => *')
          transition(':leave',
            // fading out uses a different syntax, with the "style" being passed into animate()
            animate(800, style({opacity: 0})))
        ])
    ]
})
export class AlertComponent implements OnInit, OnChanges {
    dismissible = false;
    @Input() alerts: any = [];

    constructor(sanitizer: DomSanitizer) {
        this.alerts = this.alerts.map((alert: any) => ({
          type: alert.type,
          msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
        }));
    }

    ngOnInit() {}

    onClosed(dismissedAlert: any): void {
       this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }

    ngOnChanges() {
        setTimeout(()=>{
            this.alerts = [];
        }, 4000);
    }

}
