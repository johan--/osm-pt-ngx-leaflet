import {Component, Input} from "@angular/core";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "tag-browser",
    template: require<any>("./tag-browser.component.html"),
    styles: [
        require<any>("./tag-browser.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class TagBrowserComponent {
    public elementTags: any = undefined;

    @Input() tagKey: string = "";
    @Input() tagValue: string = "";

    elementChanges: any = [];

    public updateKey(value: string) { this.tagKey = value; }

    updateValue(value: string) { this.tagValue = value; }

    appendNewTag() {
        console.log(this.tagKey, this.tagValue);
        this.elementChanges.push( {[this.tagKey]: this.tagValue} );
        this.tagKey = this.tagValue = "" ;
        // console.log(this.elementChanges);
    }

    isUnchanged() {
        return !this.tagKey || !this.tagValue;
    }
}
