// Angular Core
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Routing
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

// Layouts
import {
  CondensedComponent,
  BlankComponent,
  RootLayout
  // CorporateLayout,
  // SimplyWhiteLayout,
  // ExecutiveLayout,
  // CasualLayout
} from './@pages/layouts';

// Layout Service - Required
import { pagesToggleService } from './@pages/services/toggler.service';

// Shared Layout Components
import { SidebarComponent } from './@pages/components/sidebar/sidebar.component';
import { QuickviewComponent } from './@pages/components/quickview/quickview.component';
import { QuickviewService } from './@pages/components/quickview/quickview.service';
import { SearchOverlayComponent } from './@pages/components/search-overlay/search-overlay.component';
import { HeaderComponent } from './@pages/components/header/header.component';
import { HorizontalMenuComponent } from './@pages/components/horizontal-menu/horizontal-menu.component';
import { SharedModule } from './@pages/components/shared.module';
import { pgListViewModule } from './@pages/components/list-view/list-view.module';
import { pgCardModule } from './@pages/components/card/card.module';
import { pgCardSocialModule } from './@pages/components/card-social/card-social.module';

// Basic Bootstrap Modules
import {
  BsDropdownModule,
  AccordionModule,
  AlertModule,
  ButtonsModule,
  CollapseModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
  TypeaheadModule
} from 'ngx-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faWindowClose, faFileAlt, faFolder } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faChevronLeft, faNotesMedical, faPlus, faQuestion, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
library.add(
  faTrashAlt,
  faTimes,
  faChevronLeft,
  faWindowClose,
  faNotesMedical,
  faFileAlt,
  faPlus,
  faFolder,
  faQuestion,
  faCheck,
  faPaperPlane
);
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

// Pages Globaly required Components - Optional
import { pgTabsModule } from './@pages/components/tabs/tabs.module';
import { pgSwitchModule } from './@pages/components/switch/switch.module';
import { ProgressModule } from './@pages/components/progress/progress.module';

// Thirdparty Components / Plugins - Optional
import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Sample Blank Pages - Optional
// import { BlankCorporateComponent } from './@pages/layouts/blank-corporate/blank-corporate.component';
// import { BlankSimplywhiteComponent } from './@pages/layouts/blank-simplywhite/blank-simplywhite.component';
// import { BlankCasualComponent } from './@pages/layouts/blank-casual/blank-casual.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthInterceptorService } from './_service/auth-interceptor.service';
import { FloatingHelpComponent } from './floating-help/floating-help.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Hammer Config Overide
// https://github.com/angular/angular/issues/10541
// export class AppHammerConfig extends HammerGestureConfig {
//   overrides = <any>{
//     pinch: { enable: false },
//     rotate: { enable: false }
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    CondensedComponent,
    // CorporateLayout,
    // SimplyWhiteLayout,
    // ExecutiveLayout,
    // CasualLayout,
    SidebarComponent,
    QuickviewComponent,
    SearchOverlayComponent,
    HeaderComponent,
    HorizontalMenuComponent,
    BlankComponent,
    RootLayout,
    // BlankCorporateComponent,
    // BlankSimplywhiteComponent,
    // BlankCasualComponent,
    FloatingHelpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    ProgressModule,
    pgListViewModule,
    pgCardModule,
    pgCardSocialModule,
    RouterModule.forRoot(AppRoutes),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    pgTabsModule,
    PerfectScrollbarModule,
    pgSwitchModule,
    QuillModule,
    BsDatepickerModule.forRoot(),
    NgxExtendedPdfViewerModule
  ],
  providers: [
    QuickviewService,
    pagesToggleService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
    // {
    //   provide: HAMMER_GESTURE_CONFIG,
    //   useClass: AppHammerConfig
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
