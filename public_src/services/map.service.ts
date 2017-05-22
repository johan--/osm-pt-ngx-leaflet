import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Location} from "../core/location.class";
import {Map} from "leaflet";

@Injectable()
export class MapService {
    public map: Map;
    public baseMaps: any;
    private vtLayer: any;
    private ptLayer: any;
    private body: string = `[out:json][timeout:25];
        (
          node["route"="bus"]({{bbox}});
          way["route"="bus"]({{bbox}});
          relation["route"="bus"]({{bbox}});
        );
        out body;
        >;
        out skel qt;`;

    constructor(private http: Http) {
        this.baseMaps = {
            Empty: L.tileLayer("", {
                attribution: ''
            }),
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            }),
            EsriImagery: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                attribution: '&copy; ESRI https://leaflet-extras.github.io/leaflet-providers/preview/'
                })
        };
    }

    disableMouseEvent(elementId: string) {
        let element = <HTMLElement>document.getElementById(elementId);

        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }

    toggleAirPortLayer() {
      if (this.vtLayer) {
          this.map.removeLayer(this.vtLayer);
          delete this.vtLayer;
      } else {
          this.http.get("https://rawgit.com/haoliangyu/angular2-leaflet-starter/master/public/data/airports.geojson")
              .map(res => res.json())
              .subscribe(result => {
                  this.vtLayer = L.vectorGrid.slicer(result);
                  this.vtLayer.addTo(this.map);
              });
      }
    }

    requestData() {
        let headers = new Headers();
        headers.append("Content-Type", "application/X-www-form-urlencoded");
        let options = new RequestOptions({headers: headers});

        if (this.ptLayer) {
            this.map.removeLayer(this.ptLayer);
            delete this.ptLayer;
        } else {
            this.http.post("http://overpass-api.de/api/interpreter", this.body, options)
                .map(res => res.json())
                .subscribe(result => {
                    console.log("done");
                    console.dir(result);
                    return result;
                });
        }
    }
}