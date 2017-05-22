import {Injectable} from "@angular/core";

@Injectable()
export class OverpassService {
    // TODO
    // https://wiki.openstreetmap.org/wiki/Sandbox_for_editing
    // https://wiki.openstreetmap.org/wiki/API_v0.6#Changesets_2

    public testApiUrl: string = "http://api06.dev.openstreetmap.org/";
    public prodApiUrl: string = "http://api.openstreetmap.org/";

    requestData() {

    }

    /* PUT /api/0.6/changeset/create */
    createChangeSet() {

    }

    /* Update: PUT /api/0.6/changeset/#id */
    updateChangeSet() {

    }

    /* Close: PUT /api/0.6/changeset/#id/close */
    closeChangeSet() {

    }

}
