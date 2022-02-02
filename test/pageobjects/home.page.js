class HomePage {

    get productStoreLogo() {
        return $('.navbar-brand');
    }
    get categoriesSection() {
        return $('.list-group');
    }
    get cart() {
        return $('#cartur');
    }

    openStorePage() {
        return browser.url('/index.html');
    }

    product(name) {
        return $(`*=${name}`);
    }

    async selectCategory(specOptions) {
        await this.categoriesSection.waitForExist({
            timeout: 2000,
            timeoutMsg: 'Categories section did not exist after 2s'
        });
        await this.categoriesSection.$(`*=${specOptions.category || 'Laptops'}`).click();
    }

    async selectProduct(specOptions) {
        await this.product(specOptions.product || 'MacBook air').waitForExist({
            timeout: 2000,
            timeoutMsg: `The product '${specOptions.product || 'MacBook air'}' did not exist after 2s`
        });
        await this.product(specOptions.product || 'MacBook air').click();
    }
}

module.exports = new HomePage();