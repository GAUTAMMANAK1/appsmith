import homePage from "../../../locators/HomePage";
import reconnectDatasourceModal from "../../../locators/ReconnectLocators";
import * as _ from "../../../support/Objects/ObjectsCore";
describe("Import, Export and Fork application and validate data binding", function () {
  let workspaceId;
  let newWorkspaceName;
  let appName;
  it("1. Import application from json and validate data on pageload", function () {
    // import application
    cy.get(homePage.homeIcon).click();
    cy.get(homePage.optionsIcon).first().click();
    cy.get(homePage.workspaceImportAppOption).click({ force: true });
    cy.get(homePage.workspaceImportAppModal).should("be.visible");
    cy.xpath(homePage.uploadLogo).selectFile(
      "cypress/fixtures/forkedApp.json",
      { force: true },
    );

    cy.get(homePage.importAppProgressWrapper).should("be.visible");
    cy.wait("@importNewApplication").then((interception) => {
      cy.wait(100);
      // should check reconnect modal openning
      const { isPartialImport } = interception.response.body.data;
      if (isPartialImport) {
        // should reconnect button
        cy.get(reconnectDatasourceModal.Modal).should("be.visible");
        cy.get(reconnectDatasourceModal.SkipToAppBtn).click({ force: true });
        cy.wait(2000);
      } else {
        cy.get(homePage.toastMessage).should(
          "contain",
          "Application imported successfully",
        );
      }
      const uuid = () => Cypress._.random(0, 1e4);
      const name = uuid();
      appName = `app${name}`;
      cy.get(homePage.applicationName).click({ force: true });
      cy.get(homePage.applicationEditMenu).eq(1).click({
        force: true,
      });
      cy.wait(2000);
      cy.get(homePage.applicationName).clear().type(appName);
      cy.get("body").click(0, 0);
      cy.wait("@updateApplication").should(
        "have.nested.property",
        "response.body.responseMeta.status",
        200,
      );
      cy.wait(2000);
      cy.wrap(appName).as("appname");
      cy.wait(3000);
      // validating data binding for the imported application
      cy.xpath("//input[@value='Submit']").should("be.visible");
      cy.xpath("//span[text()='schema_name']").should("be.visible");
      cy.xpath("//span[text()='id']").should("be.visible");
      cy.xpath("//span[text()='title']").should("be.visible");
      cy.xpath("//span[text()='due']").should("be.visible");
    });
  });

  it("2. Fork application and validate data binding for the widgets", function () {
    // fork application
    cy.get(homePage.homeIcon).click();
    cy.get(homePage.searchInput).type(`${appName}`);
    cy.wait(3000);
    // cy.get(homePage.applicationCard).first().trigger("mouseover");
    cy.get(homePage.appMoreIcon).first().click({ force: true });
    cy.get(homePage.forkAppFromMenu).click({ force: true });
    cy.get(homePage.forkAppWorkspaceButton).click({ force: true });
    cy.wait(4000);
    _.dataSources.skipReconnectModal();
    // validating data binding for the forked application
    cy.xpath("//input[@value='Submit']").should("be.visible");
    cy.xpath("//span[text()='schema_name']").should("be.visible");
    cy.xpath("//span[text()='id']").should("be.visible");
    cy.xpath("//span[text()='title']").should("be.visible");
    cy.xpath("//span[text()='due']").should("be.visible");
  });

  it("3. Export and import application and validate data binding for the widgets", function () {
    cy.NavigateToHome();
    cy.get(homePage.searchInput).clear().type(`${appName}`);
    cy.wait(2000);
    //cy.get(homePage.applicationCard).first().trigger("mouseover");
    cy.get(homePage.appMoreIcon).first().click({ force: true });
    // export application
    cy.get(homePage.exportAppFromMenu).click({ force: true });
    cy.get(homePage.searchInput).clear();
    cy.get(`a[id=t--export-app-link]`).then((anchor) => {
      const url = anchor.prop("href");
      cy.request(url).then(({ body, headers }) => {
        expect(headers).to.have.property("content-type", "application/json");
        expect(headers)
          .to.have.property("content-disposition")
          .that.includes("attachment;")
          .and.includes(`filename*=UTF-8''${appName}.json`);
        cy.writeFile("cypress/fixtures/exportedApp.json", body, "utf-8");
        _.agHelper.GenerateUUID();
        cy.get("@guid").then((uid) => {
          newWorkspaceName = uid;
          _.homePage.CreateNewWorkspace(newWorkspaceName);
          cy.get(homePage.workspaceImportAppOption).click({ force: true });

          cy.get(homePage.workspaceImportAppModal).should("be.visible");
          cy.xpath(homePage.uploadLogo).selectFile(
            "cypress/fixtures/exportedApp.json",
            { force: true },
          );

          // import exported application in new workspace
          // cy.get(homePage.workspaceImportAppButton).click({ force: true });
          cy.wait("@importNewApplication").then((interception) => {
            const { isPartialImport } = interception.response.body.data;
            if (isPartialImport) {
              _.dataSources.skipReconnectModal();
            } else {
              cy.get(homePage.toastMessage).should(
                "contain",
                "Application imported successfully",
              );
            }
            const importedApp = interception.response.body.data.application;
            const appSlug = importedApp.slug;
            cy.wait("@getPagesForCreateApp").then((interception) => {
              const pages = interception.response.body.data.pages;
              let defaultPage = pages.find((eachPage) => !!eachPage.isDefault);
              // validating data binding for imported application
              cy.xpath("//input[@value='Submit']").should("be.visible");
              cy.xpath("//span[text()='schema_name']").should("be.visible");
              // cy.xpath("//span[text()='information_schema']").should(
              //   "be.visible",
              // );
              cy.xpath("//span[text()='id']").should("be.visible");
              cy.xpath("//span[text()='title']").should("be.visible");
              cy.xpath("//span[text()='due']").should("be.visible");

              cy.url().should(
                "include",
                `/${appSlug}/${defaultPage.slug}-${defaultPage.id}/edit`,
              );
            });
          });
        });
      });
    });
  });
});
