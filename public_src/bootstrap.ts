/// <reference path="./typings/require.d.ts"/>
/// <reference path="./typings/leaflet.vectorgrid.d.ts"/>

import "leaflet";
import "leaflet.vectorgrid";
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import "reflect-metadata";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "leaflet/dist/leaflet.css";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {JsonpModule, HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from "./components/app/app.component";
import {NavigatorComponent} from "./components/navigator/navigator.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {RelationBrowserComponent} from "./components/sidebar/relation-browser.component";
import {TagBrowserComponent} from "./components/sidebar/tag-browser.component";
import {StopBrowserComponent} from "./components/sidebar/stop-browser.component";

import {NgbdModalComponent} from "./components/modal/modal.component";

import {MapService} from "./services/map.service";
import {GeocodingService} from "./services/geocoding.service";

@NgModule({
    imports: [HttpModule, FormsModule, BrowserModule, ReactiveFormsModule, JsonpModule, NgbModule.forRoot()],
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavigatorComponent,
        ToolbarComponent,
        RelationBrowserComponent,
        TagBrowserComponent,
        StopBrowserComponent,
        NgbdModalComponent
    ],
    providers: [
        MapService,
        GeocodingService
    ]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
