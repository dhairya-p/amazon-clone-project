import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';


// Save data, generate HTML and make it interactive
export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    if (cart || cart.length > 0) {
        cart.forEach((cartItem) => {
            const matchingProduct = getProduct(cartItem.productId);
            productPriceCents += matchingProduct.priceCents * cartItem.quantity;

            const matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
            shippingPriceCents += matchingDeliveryOption.priceCents;
        });
    }
    let priceBeforeTaxCents = productPriceCents + shippingPriceCents;
    let taxCents = 0.1 * priceBeforeTaxCents;
    let totalCents = priceBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(priceBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

}