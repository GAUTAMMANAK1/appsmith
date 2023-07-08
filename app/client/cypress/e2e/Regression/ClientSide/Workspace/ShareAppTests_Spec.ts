import {
  agHelper,
  locators,
  deployMode,
  homePage,
  assertHelper,
  inviteModal
} from "../../../../support/Objects/ObjectsCore";

import { REPO, CURRENT_REPO } from "../../../../fixtures/REPO";

describe("Create new workspace and share with a user", function () {
  let workspaceId;
  let appid;
  let currentUrl;

  it("1. Create workspace and then share with a user from Application share option within application", function () {
    homePage.NavigateToHome();
    agHelper.Sleep(2000);
    agHelper.GenerateUUID();
    agHelper.GetElement("@guid").then((uid) => {
      workspaceId = "shareApp" + uid;
      appid = "Share" + uid;
      homePage.CreateNewWorkspace(workspaceId);
      homePage.CreateAppInWorkspace(workspaceId, appid);

      agHelper.GetNClick(inviteModal.locators._shareButton, 0, true);
      homePage.InviteUserToApplication(
        Cypress.env("TESTUSERNAME1"),
        "App Viewer",
      );
    });
    homePage.LogOutviaAPI();
  });

  it("2. login as Invited user and then validate viewer privilage", function () {
    homePage.LogintoApp(
      Cypress.env("TESTUSERNAME1"),
      Cypress.env("TESTPASSWORD1"),
      "App Viewer",
    );
    homePage.FilterApplication(appid);
    //agHelper.TypeText(homePage._textInputType, appid, 0, true);
    // // eslint-disable-next-line cypress/no-unnecessary-waiting
    agHelper.Sleep(2000);
    agHelper.GetNAssertContains(homePage._appsContainer, workspaceId);
    if (CURRENT_REPO === REPO.CE) {
      agHelper.AssertElementVisible(locators._spanButton("Share"), 0);
    }
    agHelper.HoverElement(homePage._applicationCard);
    agHelper.AssertElementAbsence(homePage._appEditIcon);
    homePage.LaunchAppFromAppHover();
    agHelper.Sleep(2000); //for CI
    homePage.LogOutviaAPI();
    agHelper.Sleep(2000); //for CI
  });

  it("3. Enable public access to Application", function () {
    homePage.LogintoApp(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    homePage.FilterApplication(appid);
    agHelper.Sleep(2000);
    agHelper
      .GetElement(homePage._applicationCard)
      .first()
      .realHover({ pointer: "mouse" });
    agHelper.GetNClick(homePage._appEditIcon, 0, true);
    agHelper.AssertElementAbsence(locators._loading);
    assertHelper.AssertNetworkStatus("@getPagesForCreateApp");
    agHelper.GetNClick(inviteModal.locators._shareButton, 0, true);
    agHelper.GetNClick(homePage._sharePublicToggle, 0, true);
    agHelper.Sleep(5000);
    agHelper.GetNClick(locators._dialogCloseButton, 0, true);
    deployMode.DeployApp();
    agHelper.Sleep(4000);
    currentUrl = cy.url();
    cy.url().then((url) => {
      currentUrl = url;
      cy.log(currentUrl);
    });
    deployMode.NavigateBacktoEditor();
    homePage.LogOutviaAPI();
  });

  it("4. Open the app without login and validate public access of Application", function () {
    agHelper.VisitNAssert(currentUrl);
    agHelper.Sleep(3000);
    agHelper.GetText(locators._emptyPageTxt).then((text) => {
      const someText = text;
      expect(someText).to.equal("This page seems to be blank");
    });
    // comment toggle should not exist for anonymous users
    agHelper.AssertElementAbsence(homePage._modeSwitchToggle);
  });

  it("5. login as uninvited user and then validate public access of Application", function () {
    homePage.LogintoApp(
      Cypress.env("TESTUSERNAME2"),
      Cypress.env("TESTPASSWORD2"),
    );
    agHelper.VisitNAssert(currentUrl);
    assertHelper.AssertNetworkStatus("@getPagesForViewApp");
    agHelper.GetText(locators._emptyPageTxt).then((text) => {
      const someText = text;
      expect(someText).to.equal("This page seems to be blank");
    });
    homePage.LogOutviaAPI();
  });

  it("6. login as Owner and disable public access", function () {
    homePage.LogintoApp(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    homePage.FilterApplication(appid);
    agHelper.Sleep(3000);
    agHelper
      .GetElement(homePage._applicationCard)
      .first()
      .realHover({ pointer: "mouse" });
    agHelper.GetNClick(homePage._appEditIcon, 0, true);
    agHelper.AssertElementAbsence(locators._loading);
    agHelper.GetNClick(inviteModal.locators._shareButton, 0, true);
    agHelper.GetNClick(homePage._sharePublicToggle, 0, true);
    agHelper.GetNClick(locators._dialogCloseButton, 0, true);
    homePage.LogOutviaAPI();
  });

  it("7. login as uninvited user, validate public access disable feature ", function () {
    homePage.LogintoApp(
      Cypress.env("TESTUSERNAME2"),
      Cypress.env("TESTPASSWORD2"),
    );
    agHelper.VisitNAssert(currentUrl);
    assertHelper.AssertNetworkStatus("@getPagesForViewApp", 404);
    homePage.LogOutviaAPI();
    // visit the app as anonymous user and validate redirection to login page
    agHelper.VisitNAssert(currentUrl);
    assertHelper.AssertNetworkStatus("@getPagesForViewApp", 404);
    agHelper.AssertContains("Sign in to your account", "be.visible");
  });
});
