import {Component} from "@angular/core";
import {StorageService} from "../../services/storage.service";

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

    constructor (private storageService: StorageService) {}
}
