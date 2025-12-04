import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-3WMHKOPI.js";
import "./chunk-TXDUYLVM.js";

// node_modules/highcharts-angular/fesm2020/highcharts-angular.mjs
var HighchartsChartComponent = class {
  constructor(el, _zone) {
    this.el = el;
    this._zone = _zone;
    this.updateChange = new EventEmitter(true);
    this.chartInstance = new EventEmitter();
  }
  ngOnChanges(changes) {
    const update = changes.update && changes.update.currentValue;
    if (changes.options || update) {
      this.wrappedUpdateOrCreateChart();
      if (update) {
        this.updateChange.emit(false);
      }
    }
  }
  wrappedUpdateOrCreateChart() {
    if (this.runOutsideAngular) {
      this._zone.runOutsideAngular(() => {
        this.updateOrCreateChart();
      });
    } else {
      this.updateOrCreateChart();
    }
  }
  updateOrCreateChart() {
    if (this.chart && this.chart.update) {
      this.chart.update(this.options, true, this.oneToOne || false);
    } else {
      this.chart = this.Highcharts[this.constructorType || "chart"](this.el.nativeElement, this.options, this.callbackFunction || null);
      this.chartInstance.emit(this.chart);
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
};
HighchartsChartComponent.ɵfac = function HighchartsChartComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || HighchartsChartComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
HighchartsChartComponent.ɵcmp = ɵɵdefineComponent({
  type: HighchartsChartComponent,
  selectors: [["highcharts-chart"]],
  inputs: {
    Highcharts: "Highcharts",
    constructorType: "constructorType",
    callbackFunction: "callbackFunction",
    oneToOne: "oneToOne",
    runOutsideAngular: "runOutsideAngular",
    options: "options",
    update: "update"
  },
  outputs: {
    updateChange: "updateChange",
    chartInstance: "chartInstance"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 0,
  vars: 0,
  template: function HighchartsChartComponent_Template(rf, ctx) {
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HighchartsChartComponent, [{
    type: Component,
    args: [{
      selector: "highcharts-chart",
      template: ""
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    Highcharts: [{
      type: Input
    }],
    constructorType: [{
      type: Input
    }],
    callbackFunction: [{
      type: Input
    }],
    oneToOne: [{
      type: Input
    }],
    runOutsideAngular: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    update: [{
      type: Input
    }],
    updateChange: [{
      type: Output
    }],
    chartInstance: [{
      type: Output
    }]
  });
})();
var HighchartsChartModule = class {
};
HighchartsChartModule.ɵfac = function HighchartsChartModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || HighchartsChartModule)();
};
HighchartsChartModule.ɵmod = ɵɵdefineNgModule({
  type: HighchartsChartModule,
  declarations: [HighchartsChartComponent],
  exports: [HighchartsChartComponent]
});
HighchartsChartModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HighchartsChartModule, [{
    type: NgModule,
    args: [{
      declarations: [HighchartsChartComponent],
      exports: [HighchartsChartComponent]
    }]
  }], null, null);
})();
export {
  HighchartsChartComponent,
  HighchartsChartModule
};
//# sourceMappingURL=highcharts-angular.js.map
