const chai = require("chai");

const { expect } = chai;
const faker = require("faker");
const { chromium } = require("playwright");
const { launchBrowser } = require("../pages/common-playwright");
const { HomePage } = require("../pages/homePage");
const { RegistrationPage } = require("../pages/registrationPage");
const { LoginPage } = require("../pages/loginPage");
const { ModelPage } = require("../pages/modelPage");
const { ProfilePage } = require("../pages/profilePage");

const registration = async (homePage, registrationPage) => {
  await homePage.navigate();
  await homePage.clickRegisterButton();
  // Register
  const username = faker.internet.userName();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const password = "YuJia@123456";
  const confirmPassword = "YuJia@123456";
  await registrationPage.fillRegisterForm(
    username,
    firstName,
    lastName,
    password,
    confirmPassword
  );
  await registrationPage.verifyRegistrationSuccess();
  // await page.screenshot({ path: './Screenshot/afterClickRegisterButton.png' });
  return { username, password };
};

const login = async (loginPage, username, password) => {
  await loginPage.login(username, password);
  await loginPage.verifyLoginSuccess();
};

describe("Buggy cars rating registration", function test() {
  let page;
  this.timeout(60000);
  before(async () => {
    page = await launchBrowser(chromium);
  });
  after(async () => {
    await page.close();
    await page.context().browser().close();
  });

  it("Register a new user and login", async () => {
    try {
      const homePage = new HomePage(page);
      const registrationPage = new RegistrationPage(page);
      const loginPage = new LoginPage(page);
      // Register
      const user = await registration(homePage, registrationPage);
      // Login
      await login(loginPage, user.username, user.password);
    } catch (e) {
      console.log(e);
    }
  });

  // TODO test case for input invalid string into register form and check warning message
});

describe("Buggy cars rating votes", function test() {
  let page;
  this.timeout(60000);
  let homePage;
  let registrationPage;
  let loginPage;
  before(async () => {
    page = await launchBrowser(chromium);
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
  });
  after(async () => {
    await page.close();
    await page.context().browser().close();
  });

  it("Votes are counted", async () => {
    try {
      // Register
      const user = await registration(homePage, registrationPage);
      // Login
      await login(loginPage, user.username, user.password);
      // Click the most popular model
      await homePage.navigate();
      await homePage.clickPopularModel();
      const modelPage = new ModelPage(page);
      const numberBeforeVote = await modelPage.getVotes();
      // console.log(numberBeforeVote);
      const numberAfterVote = await modelPage.commentAndVote();
      // console.log(numberAfterVote);
      expect(numberAfterVote - numberBeforeVote).to.equal(1);
    } catch (e) {
      console.log(e);
    }
  });

  // TODO test case for vote Popular Make

  // TODO test case for vote car from List of all registered models.
});

describe("Buggy cars rating update user profile", function test() {
  let page;
  this.timeout(60000);
  let homePage;
  let registrationPage;
  let loginPage;
  let profilePage;
  before(async () => {
    page = await launchBrowser(chromium);
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
  });
  after(async () => {
    await page.close();
    await page.context().browser().close();
  });

  it("Update user profile", async () => {
    try {
      // Register
      const user = await registration(homePage, registrationPage);
      // Login
      await login(loginPage, user.username, user.password);
      // Click the Profile link
      await homePage.clickProfile();

      const newPassword = await profilePage.updateProfile(user.password);
      // logout and user new password login again
      await loginPage.logout();
      await login(loginPage, user.username, newPassword);
    } catch (e) {
      console.log(e);
    }
  });

  // TODO test case for invalid input
});
