import {Component} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {MapService} from "../../services/map.service";
import {ProcessingService} from "../../services/processing.service";

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
    private listOfStopsForRoute: object = this.storageService.listOfStopsForRoute;

    private filteredView: boolean;

    constructor(private storageService: StorageService,
                private processingService: ProcessingService,
                private mapService: MapService) {
    }

    ngOnInit() {
        this.processingService.showStopsForRoute$.subscribe(
            data => {
                this.filteredView = data;
            }
        );
    }

    private cancelFilter() {
        this.processingService.activateFilteredStopView(false);
    }

    public exploreRoutesViaStop($event, stop) {
        this.processingService.filterRelationsByStop(stop);
        // let parentDiv = elementRef.nativeElement.querySelector("routeTableBody");
        // const hostElem = this.el.nativeElement;
        // console.dir(hostElem.children, hostElem.parentNode);
        // if (this.mapService.showRoute(rel)) this.mapService.drawTooltipFromTo(rel);

    }

}
