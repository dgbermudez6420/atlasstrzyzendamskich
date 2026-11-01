# Atlas Strzyżeń Damskich — portable landing

## Package

`dist/index.html` and the complete `dist/assets/` directory form a buildless, portable page. Upload both together, preserving relative paths. No framework, build step or third-party font service is required. The official Impultienda embed is always available for live prices and checkout; the two explicitly authorized UTMify scripts load only after marketing consent.

The existing German main-product landing was the visual reference, not the FinishAtlas upsell. The Polish edition adds eight new Polish gallery cards and new Polish mockups. This delivery does not include or imply a complete translation of the underlying product PDFs.

## Impultienda external landing integration

Host `index.html` and its entire `assets/` directory together on external HTTPS hosting. You do not need to upload the fifteen existing landing images into Impultienda individually. The ZIP contains all of them.

The official store script is included exactly once immediately before `</body>`:

```html
<script src="https://wizualnyatlaskobiecychfryzur.impultienda.ar/embed/upsells.js"></script>
```

It retrieves the live main price in the visitor's currency from `/embed/upsells.json`. The offer uses `data-main-price`, `data-main-original-price` and `data-main-savings`; no fallback price or currency is hardcoded. Currency is displayed only when the ready event supplies a valid three-letter code.

The purchase anchor has `data-checkout` and a real fallback URL:

```html
<a href="https://wizualnyatlaskobiecychfryzur.impultienda.ar/checkout" data-checkout>Przejdź do bezpiecznej płatności →</a>
```

The two paid optional extras are offered only in Impultienda's normal checkout, not on this sales landing. All upsell markup, selection controls, extra counts and cart-total UI have been removed. The five included bonus guides remain unchanged. Because the landing contains none of the official script's upsell selectors, the script does not add `bumps=0`; new checkout visits show both optional cards with no extras pre-added.

To migrate visitors from the earlier landing picker, `commerce.js` removes only the two known former selections (`8facfc72-9954-4b34-a95a-8418e37bf989` and `5bc2de96-6bf5-4e7e-9e8a-ae209809851e`) from this external origin's `impultienda_upsells` sessionStorage array before the embed starts. Unrelated selections, attribution and all other keys are preserved. Checkout-origin storage is not touched. No store settings, orders, prices or payment state are changed.

The official script continues to carry permitted UTM/click identifiers to checkout. Our helper handles price presentation/loading/failure and the narrowly scoped legacy-selection cleanup, not order submission. If loading fails, the page offers the real checkout link without displaying raw tokens or zero prices. The checkout owns optional-extra selection and totals.

This external-hosting ZIP is different from a standalone HTML intended for pasting inside Impultienda. Do not paste this external SDK version over a native platform template without reviewing the platform's own integration contract.

## Deliberate removals and retained constraints

- No inherited Hotmart URL/widget or separate Meta initializer is included. The two UTMify scripts from the German main landing are now explicitly authorized and integrated as described below.
- A Polish marketing consent panel gates UTMify exactly like the German reference. Review the actual host and checkout integrations against your consent/privacy requirements before public sale; this page does not control checkout-domain storage or server-side credentials.
- The reference's 7-day guarantee duration is retained. The seller must supply the applicable guarantee terms and contact route on the real platform before sales begin.
- Tax treatment, actual price history, seller identity/legal notice and product delivery details must be verified on the destination platform. The page does not invent these details.
- The original absolute loss-of-money promise and ungrounded time-limited urgency were softened to a confidence-focused headline and an informational top strip.

## Authorized German UTMify integration

`assets/utmify.js` is a byte-identical copy of the current public German main landing's consent loader. Its SHA256 is `b74af7801135772026e0a05681c638b7845e41fc942ccd84700c8c744d3467c4`.

- Public UTMify loader ID: `6adcf30e0a3295fab49502f5`.
- Pixel script: `https://cdn.utmify.com.br/scripts/pixel/pixel.js`.
- URL attribution script: `https://cdn.utmify.com.br/scripts/utms/latest.js` with `data-utmify-prevent-subids=""`.
- Both scripts have `async` and `defer` set, and are injected once per document only after acceptance. There is no additional hardcoded Meta pixel script/ID on the landing.
- Polish acceptance/refusal buttons have equal prominence. The footer reopens settings. Refusal persists, and withdrawing a previously accepted choice reloads without the marketing scripts; cross-tab withdrawal behaves the same way.
- The original consent storage key is retained (`schnittatlas_marketing_consent_v1`), scoped by the browser to the current hosting origin. No German visitor's separate-origin choice is imported.

The always-on Impultienda embed remains responsible for live prices and checkout attribution; the consent loader gates the two requested UTMify marketing scripts, not the external checkout's own code. In browser tests UTMify's generated `xcod`/`sck` values and original UTMs survived the real checkout handoff without reintroducing landing extras or `bumps=0`.

The vendor pixel itself routes localhost/127.0.0.1 to `http://localhost:3001/tracking/v1`, so event delivery is not verifiable in the managed local preview. The public production host uses its normal vendor endpoint. Installation and consent behavior were verified; Meta/UTMify dashboard receipt and purchase-event deduplication were not claimed. No purchase event was manually fired, and no order/payment was submitted.

## Interactions

Automatic eight-card gallery with hover/focus pause, manual keyboard pause control, reduced-motion support, non-interactive gallery images without enlargement, reveal effects, anchor CTAs and native FAQ accordions.

## Private preview

The Sites preview remains owner-private, but its purchase link reaches the real external checkout. No order or payment was submitted during testing. Customers need public external hosting (or an explicit change to Site access); do not change the audience or overwrite the existing German landing without the owner's direction. The checkout's language, product name, legal content, payment methods and purchase flow are controlled in Impultienda, not by this landing.
