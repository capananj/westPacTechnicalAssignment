const chai = require("chai");

const { expect } = chai;
const faker = require("faker");
const { getRandItem } = require("./common-playwright");

class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async updateProfile(currentPassword) {
    // Basic
    await this.page.fill("#firstName", faker.name.firstName());
    await this.page.fill("#lastName", faker.name.lastName());
    // Additional Info
    // await this.page.click("#gender");
    await this.page.fill("#gender", getRandItem(["Male", "Female"]));
    await this.page.fill(
      "#age",
      `${faker.datatype.number({ min: 15, max: 100, precision: 1 })}`
    );
    await this.page.fill(
      "#address",
      `${faker.address.streetAddress()}, ${faker.address.city()}`
    );
    await this.page.fill("#phone", faker.phone.phoneNumber());
    await this.page.selectOption(
      "#hobby",
      getRandItem([
        "Hiking",
        "Reading",
        "Working",
        "Learning",
        "Video Games",
        "Biking",
        "Movies",
        "Reading Comics",
        "Drawing",
        "Jogging",
        "Knitting",
        "Bird-watching",
        "Other",
      ])
    );
    // Change Password
    const newPassword = "123@QAWxs";
    // console.log(newPassword);
    await this.page.fill("#currentPassword", currentPassword);
    await this.page.fill("#newPassword", newPassword);
    await this.page.fill("#newPasswordConfirmation", newPassword);
    await this.page.press("//button[@type='submit'][text()='Save']", "Enter");
    return newPassword;
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
module.exports = { ProfilePage };
