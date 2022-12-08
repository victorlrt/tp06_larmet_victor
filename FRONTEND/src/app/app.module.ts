import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './main/app.component';
import { HeaderComponent } from './header/header.component';
import {FooterComponent } from  './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreState } from './core/state/store-state';
import { HeadersInterceptor } from './headers.interceptor';
import { ClientService } from './client/client.service';
import { CatalogueService } from './catalogue/catalogue.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'formClient',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule)
  },
  {
    path: 'catalogue',
    loadChildren: () =>
      import('./catalogue/catalogue.module').then((m) => m.CatalogueModule)
  },
  {
    path: 'store',
    loadChildren: () =>
      import('./store/store.module').then((m) => m.StoreModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([StoreState]),
    FormsModule
  ],
  providers: [ LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
      deps: [ClientService, CatalogueService, LoginService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
