import {
  entityExplorer,
  locators,
  agHelper,
  propPane,
  draggableWidgets,
} from "../../../../support/Objects/ObjectsCore";

describe("Dynamic Height Width validation", function () {
  it("1. Validate change with auto height width for JsonForm", function () {
    agHelper.AddDsl("jsonFormDynamicHeightDsl");

    entityExplorer.SelectEntityByName("JSONForm1", "Widgets");
    agHelper
      .GetWidgetCSSHeight(locators._widgetInDeployed(draggableWidgets.JSONFORM))
      .then((initialFormheight: number) => {
        propPane.SelectPropertiesDropDown("height", "Auto Height");
        agHelper.Sleep(5000);
        agHelper
          .GetWidgetCSSHeight(
            locators._widgetInDeployed(draggableWidgets.JSONFORM),
          )
          .then((updatedFormheight: number) => {
            expect(initialFormheight).to.not.equal(updatedFormheight);
            agHelper.GetNClick(propPane._showColumnButton, 0);
            agHelper.GetNClick(propPane._showColumnButton, 1);
            agHelper.GetNClick(propPane._showColumnButton, 2);
            propPane.SelectPropertiesDropDown("height", "Fixed");
            agHelper.Sleep(5000);
            agHelper
              .GetWidgetCSSHeight(
                locators._widgetInDeployed(draggableWidgets.JSONFORM),
              )
              .then((reUpdatedFormheight: number) => {
                expect(updatedFormheight).to.not.equal(reUpdatedFormheight);
                agHelper.GetNClick(propPane._showColumnButton, 2);
                agHelper.GetNClick(propPane._showColumnButton, 1);
                propPane.SelectPropertiesDropDown("height", "Auto Height");
                agHelper.Sleep(5000);
                agHelper
                  .GetWidgetCSSHeight(
                    locators._widgetInDeployed(draggableWidgets.JSONFORM),
                  )
                  .then((currentformheight: number) => {
                    expect(reUpdatedFormheight).to.not.equal(currentformheight);
                  });
              });
          });
      });
  });
});
