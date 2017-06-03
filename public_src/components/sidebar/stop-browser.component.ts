import {Component, Input, ElementRef} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {MapService} from "../../services/map.service";
import {RouteBrowserComponent} from "./route-browser.component";

@Component({
    selector: "stop-browser",
    template: require<any>("./stop-browser.component.html"),
    styles: [
        require<any>("./stop-browser.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class StopBrowserComponent {
    private listOfStops: any = this.storageService.listOfStops;
    el: ElementRef;

    constructor (el: ElementRef,
                 private storageService: StorageService,
                 private mapService: MapService) {
        this.el = el;
    }

    // this._elementRef.nativeElement.querySelector("");

    // @Input("routeTableBody") private _routeTableBody: RouteBrowserComponent;

    public exploreRoutesViaStop($event, rel) {
        // let parentDiv = elementRef.nativeElement.querySelector("routeTableBody");

        const hostElem = this.el.nativeElement;
        console.dir(hostElem.children, hostElem.parentNode);
        // console.log($event);
        // console.log(rel);
        // if (this.mapService.showRoute(rel)) this.mapService.drawTooltipFromTo(rel);

    }

}
