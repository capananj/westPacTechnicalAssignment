const faker = require("faker");

class ModelPage {
  constructor(page) {
    this.page = page;
  }

  async getVotes() {
    const votes = await this.page.innerText("div:nth-child(1) > h4 > strong");
    return votes;
  }

  async commentAndVote() {
    await this.page.fill("#comment", faker.lorem.words(10));
    await this.page.click("//button[@class='btn btn-success'][text()='Vote!']");
    await this.page.waitForSelector("text=Thank you for your vote!", {
      timeout: 60000,
    });
    const votes = await this.page.innerText("div:nth-child(1) > h4 > strong");
    return votes;
  }
}
module.exports = { ModelPage };
