import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  AfterViewInit,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RootLayout } from '../root/root.component';
import { RmeService } from '@app/_service/rme.service';
import { Router } from '@angular/router';
import { pagesToggleService } from '@app/@pages/services/toggler.service';
import { Observable } from 'rxjs';
import { ProfessionalService } from '@app/_service/professional.service';
import { AuthService } from '@app/_service/auth.service';

@Component({
  selector: 'condensed-layout',
  templateUrl: './condensed.component.html',
  styleUrls: ['./condensed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CondensedComponent extends RootLayout implements OnInit {
  menuLinks = [
    {
      label: 'Nueva Receta',
      // details: '234 New Emails',
      routerLink: 'rme/new',
      iconType: 'pg',
      iconName: 'plus',
      thumbNailClass: 'bg-primary'
    },
    {
      label: 'Mis Recetas',
      // details: '12 New Updates',
      routerLink: 'rme/list',
      iconType: 'fa',
      iconName: 'files-o'
      // thumbNailClass: 'bg-success'
    }
    // ,{
    //   label: 'Social',
    //   routerLink: 'social',
    //   iconType: 'pg',
    //   iconName: 'social'
    // },
    // {
    //   label: 'Builder',
    //   routerLink: 'builder/condensed-builder',
    //   iconType: 'pg',
    //   iconName: 'layouts'
    // },
    // {
    //   label: 'Layouts',
    //   iconType: 'pg',
    //   iconName: 'layouts2',
    //   toggle: 'close',
    //   submenu: [
    //     {
    //       label: 'Default',
    //       routerLink: 'layouts/default',
    //       iconType: 'letter',
    //       iconName: 'dl'
    //     },
    //     {
    //       label: 'Secondary',
    //       routerLink: 'layouts/secondary',
    //       iconType: 'letter',
    //       iconName: 'sl'
    //     },
    //     {
    //       label: 'Boxed',
    //       routerLink: 'layouts/boxed',
    //       iconType: 'letter',
    //       iconName: 'bl'
    //     }
    //   ]
    // },
    // {
    //   label: 'UI Elements',
    //   iconType: 'letter',
    //   iconName: 'Ui',
    //   toggle: 'close',
    //   submenu: [
    //     {
    //       label: 'Color',
    //       routerLink: 'ui/color',
    //       iconType: 'letter',
    //       iconName: 'c'
    //     },
    //     {
    //       label: 'Typography',
    //       routerLink: 'ui/typography',
    //       iconType: 'letter',
    //       iconName: 't'
    //     },
    //     {
    //       label: 'Icons',
    //       routerLink: 'ui/icons',
    //       iconType: 'letter',
    //       iconName: 'i'
    //     },
    //     {
    //       label: 'Buttons',
    //       routerLink: 'ui/buttons',
    //       iconType: 'letter',
    //       iconName: 'b'
    //     },
    //     {
    //       label: 'Notifications',
    //       routerLink: 'ui/notifications',
    //       iconType: 'letter',
    //       iconName: 'n'
    //     },
    //     {
    //       label: 'Modals',
    //       routerLink: 'ui/modal',
    //       iconType: 'letter',
    //       iconName: 'm'
    //     },
    //     {
    //       label: 'Progress & Activity',
    //       routerLink: 'ui/progress',
    //       iconType: 'letter',
    //       iconName: 'pa'
    //     },
    //     {
    //       label: 'Tabs & Accordians',
    //       routerLink: 'ui/tabs',
    //       iconType: 'letter',
    //       iconName: 'a'
    //     },
    //     {
    //       label: 'Sliders',
    //       routerLink: 'ui/sliders',
    //       iconType: 'letter',
    //       iconName: 's'
    //     },
    //     {
    //       label: 'Treeview',
    //       routerLink: 'ui/tree',
    //       iconType: 'letter',
    //       iconName: 'tv'
    //     }
    //   ]
    // },
    // {
    //   label: 'Forms',
    //   iconType: 'pg',
    //   iconName: 'form',
    //   toggle: 'close',
    //   submenu: [
    //     {
    //       label: 'Form Elements',
    //       routerLink: 'forms/elements',
    //       iconType: 'letter',
    //       iconName: 'fe'
    //     },
    //     {
    //       label: 'Form Layouts',
    //       routerLink: 'forms/layouts',
    //       iconType: 'letter',
    //       iconName: 'fl'
    //     },
    //     {
    //       label: 'Form Wizard',
    //       routerLink: 'forms/wizard',
    //       iconType: 'letter',
    //       iconName: 'fq'
    //     }
    //   ]
    // },
    // {
    //   label: 'Cards',
    //   routerLink: 'cards',
    //   iconType: 'pg',
    //   iconName: 'grid'
    // },
    // {
    //   label: 'Views',
    //   routerLink: 'views',
    //   iconType: 'pg',
    //   iconName: 'ui'
    // },
    // {
    //   label: 'Tables',
    //   iconType: 'pg',
    //   iconName: 'tables',
    //   toggle: 'close',
    //   submenu: [
    //     {
    //       label: 'Basic Tables',
    //       routerLink: 'tables/basic',
    //       iconType: 'letter',
    //       iconName: 'bt'
    //     },
    //     {
    //       label: 'Advance Tables',
    //       routerLink: 'tables/advance',
    //       iconType: 'letter',
    //       iconName: 'dt'
    //     }
    //   ]
    // },
    // {
    //   label: 'Maps',
    //   iconType: 'pg',
    //   iconName: 'map',
    //   toggle: 'close',
    //   submenu: [
    //     {
    //       label: 'Google Maps',
    //       routerLink: 'maps/google',
    //       iconType: 'letter',
    //       iconName: 'gm'
    //     }
    //   ]
    // },
    // {
    //   label: 'Charts',
    //   routerLink: 'charts',
    //   iconType: 'pg',
    //   iconName: 'charts'
    // },
    // {
    //   label: 'Extra',
    //   iconType: 'pg',
    //   iconName: 'bag',
    //   toggle: 'close',
    //   submenu: [
    //     {
    //       label: 'Invoice',
    //       routerLink: 'extra/invoice',
    //       iconType: 'letter',
    //       iconName: 'in'
    //     },
    //     {
    //       label: '404 Page',
    //       routerLink: 'session/error/404',
    //       iconType: 'letter',
    //       iconName: 'pg'
    //     },
    //     {
    //       label: '500 Page',
    //       routerLink: 'session/error/500',
    //       iconType: 'letter',
    //       iconName: 'pg'
    //     },
    //     {
    //       label: 'Login',
    //       routerLink: 'session/login',
    //       iconType: 'letter',
    //       iconName: 'l'
    //     },
    //     {
    //       label: 'Register',
    //       routerLink: 'session/register',
    //       iconType: 'letter',
    //       iconName: 're'
    //     },
    //     {
    //       label: 'Lockscreen',
    //       routerLink: 'session/lock',
    //       iconType: 'letter',
    //       iconName: 'ls'
    //     },
    //     {
    //       label: 'Gallery',
    //       routerLink: 'extra/gallery',
    //       iconType: 'letter',
    //       iconName: 'gl'
    //     },
    //     {
    //       label: 'Timeline',
    //       routerLink: 'extra/timeline',
    //       iconType: 'letter',
    //       iconName: 't'
    //     }
    //   ]
    // },
    // {
    //   label: 'Docs',
    //   externalLink: 'https://docs.pages.revox.io/v/angular/',
    //   target: '_blank',
    //   iconType: 'pg',
    //   iconName: 'note'
    // },
    // {
    //   label: 'Changelog',
    //   externalLink: 'http://changelog.pages.revox.io/',
    //   target: '_blank',
    //   iconType: 'letter',
    //   iconName: 'Cl'
    // }
  ];

  professional: any;
  // professional: Observable<any>;
  urlProfile: any;

  constructor(
    private apiRme: RmeService,
    private apiPro: ProfessionalService,
    private auth: AuthService,
    toggler: pagesToggleService,
    router: Router,
    private sanitizer: DomSanitizer
  ) {
    super(toggler, router);
  }

  ngOnInit() {
    this.apiPro.getById$(this.auth.getProfessional()).subscribe(res => {
      this.professional = res;
      const url = `https://proxy.prod.ucchristus.procloudhub.com/AWAPatients/Physicians(${
        res.id
      })/GetPicture`;
      this.urlProfile = this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }
}
