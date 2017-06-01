import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";

@Injectable()
export class ProcessingService {
    constructor(private storageService: StorageService) { }

    // private createStopsList() {

        // for (let obj in ) {
        //     console.log(obj.id, obj.type);
        // }
    // }

    // private createRoutesList() {
    //     this.storageService.localJsonStorage
    // }

    public createLists() {
        this.storageService.localJsonStorage.elements.forEach( (element) => {
            switch (element.type) {
                case "node":
                    // console.log(element);
                    if (element.tags && element.tags.bus === "yes") {
                        this.storageService.listOfStops.push(element);
                    }
                    break;
                case "relation":
                    // console.log(element.id, element.type);
                    this.storageService.listOfRelations.push(element);
                    break;
            }
        });
        console.log("Total # of nodes: ", this.storageService.listOfStops.length,
            "Total # of relations: ", this.storageService.listOfRelations.length);
        // this.createStopsList();
        // this.createRoutesList();
    }
}
