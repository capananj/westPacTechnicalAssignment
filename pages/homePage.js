class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://buggy.justtestit.org/");
  }

  async clickRegisterButton() {
    await this.page.click(
      "//a[@class='btn btn-success-outline'][text()='Register']"
    );
  }

  async clickPopularModel() {
    await this.page.click("//a[contains(@href,'/model/')]");
  }

  async clickProfile() {
    await this.page.click("//a[@class='nav-link'][text()='Profile']");
  }
}
module.exports = { HomePage };
