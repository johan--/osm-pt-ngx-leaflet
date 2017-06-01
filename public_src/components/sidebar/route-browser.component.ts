import {Component, Input, SimpleChanges} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {MapService} from "../../services/map.service";

@Component({
    selector: "route-browser",
    template: require<any>("./route-browser.component.html"),
    styles: [
        require<any>("./route-browser.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class RouteBrowserComponent {
    // private elementRoutes: any = undefined;

    constructor(private storageService: StorageService, private mapService: MapService) { }

    // @Input()
    listOfRelations: object = this.storageService.listOfRelations;

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }

    public exploreRoute($event, rel) {
        // console.log($event);
        // console.log(rel);
        if (this.mapService.showRoute(rel)) this.mapService.drawTooltipFromTo(rel);
    }

    // listOfRelations = this.storageService.listOfRelations;
}
