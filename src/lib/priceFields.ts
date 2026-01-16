export const priceFieldMap = {
  INR: {
    price: 'price_inr',
    sale: 'sale_price_inr',
    symbol: '₹',
  },
  USD: {
    price: 'price_usd',
    sale: 'sale_price_usd',
    symbol: '$',
  },
  EUR: {
    price: 'price_euro',
    sale: 'sale_price_euro',
    symbol: '€',
  },
  GBP: {
    price: 'price_pond',
    sale: 'sale_price_pond',
    symbol: '£',
  },
} as const
