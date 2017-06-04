import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ProcessingService {
    // Observable boolean sources
    private showRelationsForStopSource = new Subject<boolean>();
    private showStopsForRouteSource = new Subject<boolean>();
    // Observable boolean streams
    showRelationsForStop$ = this.showRelationsForStopSource.asObservable();
    showStopsForRoute$ = this.showStopsForRouteSource.asObservable();

    constructor(private storageService: StorageService) { }

    public createLists() {
        this.storageService.localJsonStorage.elements.forEach( (element) => {
            switch (element.type) {
                case "node":
                    if (element.tags && element.tags.bus === "yes") {
                        this.storageService.listOfStops.push(element);
                    }
                    break;
                case "relation":
                    this.storageService.listOfRelations.push(element);
                    break;
            }
        });
        console.log(
            "Total # of nodes: ", this.storageService.listOfStops.length,
            "Total # of relations: ", this.storageService.listOfRelations.length);
    }

    // Service message commands
    activateFilteredRouteView(data: boolean) {
        this.showRelationsForStopSource.next(data);
    }

    activateFilteredStopView(data: boolean) {
        this.showStopsForRouteSource.next(data);
    }

    /**
     *
     * @param stop
     * {
     *    "type": "node",
     *    "id": 447767772,
     *    "lat": 49.6769377,
     *    "lon": 18.3665044,
     *    "timestamp": "2017-04-20T01:22:48Z",
     *    "version": 3,
     *    "changeset": 47956115,
     *    "user": "dkocich",
     *    "uid": 1784758,
     *    "tags": {
     *      "bench": "yes",
     *      "bus": "yes",
     *      "name": "Frýdek-Místek, Frýdek, U Gustlíčka",
     *      "public_transport": "platform",
     *      "shelter": "yes"
     *    }
     *  }
     */
    public filterRelationsByStop(stop): void {
        this.activateFilteredRouteView(true);
    }

    /**
     *
     * @param rel
     *  {
     *    "type": "relation",
     *    "id": 7157492,
     *    "timestamp": "2017-05-15T22:23:20Z",
     *    "version": 5,
     *    "changeset": 48714598,
     *    "user": "dkocich",
     *    "uid": 1784758,
     *    "members": [
     *      {
     *        "type": "node",
     *        "ref": 2184049214,
     *        "role": "stop"
     *      },
     *      {
     *        "type": "node",
     *        "ref": 2162278060,
     *        "role": "platform"
     *      },
     *      {
     *        "type": "way",
     *        "ref": 387730713,
     *        "role": ""
     *      }
     *    ],
     *    "tags": {
     *      "complete": "no",
     *      "from": "Řepiště, U kříže",
     *      "name": "Bus 11: Řepiště, U kříže -> Místek,Riviéra",
     *      "operator": "ČSAD Frýdek-Místek",
     *      "public_transport:version": "2",
     *      "route": "bus",
     *      "to": "Místek,Riviéra",
     *      "type": "route"
     *    }
     *  }
     */
    public filterStopsByRelation(rel): void {
        this.storageService.listOfStopsForRoute = rel.members;
        this.activateFilteredStopView(true);
    }
}
