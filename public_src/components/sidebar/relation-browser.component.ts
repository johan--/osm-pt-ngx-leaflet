import {Component} from "@angular/core";
import {StorageService} from "../../services/storage.service";

@Component({
    selector: "relation-browser",
    template: require<any>("./relation-browser.component.html"),
    styles: [
        require<any>("./relation-browser.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class RelationBrowserComponent {
    private elementRelations: any = undefined;
    // listOfRelations = this.storageService.listOfRelations;

    constructor(storageService: StorageService) { }
}
