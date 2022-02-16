const Helper = require('../helper/helper');

class ProductPage {

    get addToCart() {
        return $('[class="btn btn-success btn-lg"]');
    }
    get cartSection() {
        return $('#tbodyid');
    }
    get placeOrderButton() {
        return $('button=Place Order');
    }

    productName(specOptions) {
        return $(`h2=${specOptions.product || 'MacBook air'}`);
    }

    productInCart(specOptions) {
        return this.cartSection.$('.success').$(`td=${specOptions.product || 'MacBook air'}`);
    }

    async clickAddToCart() {
        await Helper.waitForElementToExist(
            this.addToCart,
            2000,
            'Add to cart button did not exist after 2s'
        );
        await this.addToCart.click();
    }
}

module.exports = new ProductPage();