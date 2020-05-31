import {
  NgModule,
  Component,
  Pipe,
  PipeTransform,
  enableProdMode
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule
} from "devextreme-angular";
import DataSource from "devextreme/data/data_source";
import { Service } from "./app.service";

@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Service]
})
export class AppComponent {
  dataSource: DataSource;
  collapsed = false;
  contentReady = e => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(["EnviroCare"]);
    }
  };
  customizeTooltip = pointsInfo => {
    return { text: parseInt(pointsInfo.originalValue) + "%" };
  };

  constructor(service: Service) {
    this.dataSource = service.getDataSource();
  }
}

@NgModule({
  imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
