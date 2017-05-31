import {Injectable} from "@angular/core";
import {MapService} from "./map.service";

@Injectable()
export class StorageService {
    public localJsonStorage: any;
    public localGeojsonStorage: any;
    public listOfStops: any = [];
    public listOfRelations: any = [];

    constructor() { }
}
