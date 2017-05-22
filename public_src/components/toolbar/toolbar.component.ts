///<reference path="../../services/map.service.ts"/>
import {Component} from "@angular/core";
import {MapService} from "../../services/map.service";
import {OverpassService} from "../../services/overpass.service";
import {Map, MouseEvent, Marker} from "leaflet";

@Component({
    selector: "toolbar",
    template: require<any>("./toolbar.component.html"),
    styles: [
        require<any>("./toolbar.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class ToolbarComponent {
    editing: boolean;
    removing: boolean;
    airportLayerAdded: boolean;
    markerCount: number;
    downloading: boolean;
    uploading: boolean;

    constructor(private mapService: MapService) {
        this.editing = false;
        this.removing = false;
        this.markerCount = 0;
    }

    private overpassService: OverpassService;
    // constructor(private overpassService: OverpassService) {
    //     this.downloading = false;
    //     this.uploading = false;
    // }

    ngOnInit() {
        this.mapService.disableMouseEvent("add-marker");
        this.mapService.disableMouseEvent("remove-marker");
        this.mapService.disableMouseEvent("toggle-layer");
        this.mapService.disableMouseEvent("download-data");
        this.mapService.disableMouseEvent("upload-data");
    }

    Initialize() {
        this.mapService.map.on("click", (e: MouseEvent) => {
            if (this.editing) {
                let marker = L.marker(e.latlng, {
                    icon: L.icon({
                        iconUrl: require<any>("../../../node_modules/leaflet/dist/images/marker-icon.png"),
                        shadowUrl: require<any>("../../../node_modules/leaflet/dist/images/marker-shadow.png")
                    }),
                    draggable: true
                })
                .bindPopup("Marker #" + (this.markerCount + 1).toString(), {
                    offset: L.point(12, 6)
                })
                .addTo(this.mapService.map)
                .openPopup();

                this.markerCount += 1;

                marker.on("click", (event: MouseEvent) => {
                    if (this.removing) {
                        this.mapService.map.removeLayer(marker);
                        this.markerCount -= 1;
                    }
                });
            }
        });
    }

    toggleEditing() {
        this.editing = !this.editing;

        if (this.editing && this.removing) {
            this.removing = false;
        }
    }

    toggleRemoving() {
        this.removing = !this.removing;

        if (this.editing && this.removing) {
            this.editing = false;
        }
    }

    toggleAirPortLayer() {
        this.airportLayerAdded = !this.airportLayerAdded;
        this.mapService.toggleAirPortLayer();
    }

    downloadData() {
        this.downloading = !this.downloading;
        this.overpassService.requestData();
    }

    uploadData() {
        // TODO
        this.uploading = !this.uploading;
        this.overpassService.createChangeSet();
        this.overpassService.updateChangeSet();
        this.overpassService.closeChangeSet();
    }
}
