import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
// import { MyToasterService } from './core/common/helpers/taster.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendProvider } from './core/helpers/fake-backend';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DateFormater } from './core/helpers/date-formater';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

// import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule.setLocale('en-US'),
    // PaginationModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      timeOut: 5000,
    }),
    // ToastrModule added
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FakeBackendProvider,
    ToastrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
