const chai = require("chai");

const { expect } = chai;

class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  async fillRegisterForm(
    username,
    firstName,
    lastName,
    password,
    confirmPassword
  ) {
    await this.page.fill("#username", username);
    await this.page.fill("#firstName", firstName);
    await this.page.fill("#lastName", lastName);
    await this.page.fill("#password", password);
    await this.page.fill("#confirmPassword", confirmPassword);
    await this.page.press(
      "//button[@type='submit'][text()='Register']",
      "Enter"
    );
  }

  async verifyRegistrationSuccess() {
    await this.page.waitForSelector("text=Registration is successful", {
      timeout: 60000,
    });
    const visible = await this.page.isVisible(
      "//div[contains(text(),'Registration is successful')]"
    );
    expect(visible).to.equal(true);
  }
}
module.exports = { RegistrationPage };
