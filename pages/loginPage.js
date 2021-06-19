const chai = require("chai");

const { expect } = chai;

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    await this.page.fill("input[name=login]", username);
    await this.page.fill("input[name=password]", password);
    await this.page.click("//button[@type='submit'][text()='Login']");
  }

  async logout() {
    await this.page.click("//a[@class='nav-link'][text()='Logout']");
  }

  async verifyLoginSuccess() {
    await this.page.waitForSelector("//span[contains(text(),'Hi')]", {
      timeout: 60000,
    });
    const visible = await this.page.isVisible("//span[contains(text(),'Hi')]");
    // console.log(visible);
    expect(visible).to.equal(true);
  }
}
module.exports = { LoginPage };
