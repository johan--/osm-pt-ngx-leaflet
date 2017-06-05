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
    private listOfStops: object[] = this.storageService.listOfStops;
    public listOfStopsForRoute: object[] = this.storageService.listOfStopsForRoute;
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

    private exploreRoutesViaStop($event, stop) {
        this.processingService.filterRelationsByStop(stop);
    }
}
