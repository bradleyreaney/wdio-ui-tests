const HomePage = require('../pageObjects/home.page');
const OrderPage = require('../pageObjects/order.page');
const ProductPage = require('../pageObjects/product.page');
const Helper = require('../helper/helper');

const specOptions = {
    name: 'Bradley Reaney',
    city: 'Sheffield',
}

describe('Example using the demo blaze site', () => {
    it('should open the demo blaze store home page', async () => {
        await HomePage.openStorePage();
        await expect(browser).toHaveUrlContaining('index.html');
        await expect(browser).toHaveTitle('STORE');
        await expect(HomePage.productStoreLogo).toHaveTextContaining('PRODUCT STORE');
    })

    it(`should select a ${specOptions.product || 'MacBook air'} from the ${specOptions.category || 'Laptops'} category`, async () => {
        await HomePage.selectCategory(specOptions);
        await HomePage.selectProduct(specOptions);
        await expect(browser).toHaveUrlContaining('prod.html');
        await expect(ProductPage.productName(specOptions).toHaveTextContaining(specOptions.product || 'MacBook air'));
    })

    it('should add the product to the cart', async () => {
        await ProductPage.clickAddToCart();
        await Helper.checkForAlert();
        await expect(await browser.getAlertText()).toBe('Product added');
    })

    it('should open the cart and check for products', async () => {
        await browser.dismissAlert();
        await HomePage.cart.click();
        await expect(browser).toHaveUrlContaining('cart.html');
        await expect(ProductPage.cartSection).toBeDisplayed();
        await expect(ProductPage.productInCart(specOptions)).toHaveTextContaining(specOptions.product || 'MacBook air');
    })

    it('should place the order', async () => {
        await ProductPage.placeOrderButton.click();
        await OrderPage.completeOrderForm(specOptions);
        await OrderPage.orderPurchaseButton.click();
        await expect(OrderPage.orderConfirmation).toBeDisplayed();
        await OrderPage.clickOrderConfirmationOkButton();
        await expect(browser).toHaveUrlContaining('index.html');
        await expect(browser).toHaveTitle('STORE');
        await expect(HomePage.productStoreLogo).toHaveTextContaining('PRODUCT STORE');
    })
})