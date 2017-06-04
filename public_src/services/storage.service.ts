import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {
    public localJsonStorage: any;
    public localGeojsonStorage: any;
    public listOfStops: any = [];
    public listOfRelations: any = [];

    // filtering of sidebar
    public listOfStopsForRoute: any = [];
    public listOfRelationsForStop: any = [];

    constructor() { }
}
