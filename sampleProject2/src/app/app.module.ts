import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {AngularFireModule} from '@angular/fire/compat';
// import { environment } from 'src/environments/environment';
import { LoginComponent } from './Component/login/login.component';
import { FormsModule } from '@angular/forms';
// import { RegisterComponent } from './Component/register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Component/admin-dashboard/admin-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';
import { SearchBookComponent } from './search-book/search-book.component';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CartComponent } from './Component/cart/cart.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        // RegisterComponent,
        UserDashboardComponent,
        AdminDashboardComponent,
        SearchBookComponent,
        MessageComponent,
        NavbarComponent,
        DashboardComponent,
        CartComponent,
        RegisterComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // AngularFireModule.initializeApp(environment.firebase),
        FormsModule,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
        
    ]
})
export class AppModule { }
