import * as ROUTES from '@/lib/definitions/routes/main'

export const pricingFrequencies = [
  { id: '1', value: '1', label: 'Monthly', priceSuffix: '/month' },
  { id: '2', value: '2', label: 'Annually', priceSuffix: '/year' }
]

export const pricingTiers = [
  {
    name: 'Free Forever',
    id: '0',
    href: ROUTES.REGISTER.path,
    price: { 1: '$0', 2: '$0' },
    discountPrice: { 1: '', 2: '' },
    description: `Get all goodies for free, no credit card required.`,
    features: [
      `Multi-platform compatibility`,
      `Real-time notification system`,
      `Advanced user permissions`
    ],
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: `Sign up`
  },
  {
    name: 'Pro',
    id: '1',
    href: ROUTES.DASHBOARD.path,
    price: { 1: '$3.99', 2: '$39.99' },
    discountPrice: { 1: '', 2: '' },
    description: `When you grow, need more power and flexibility.`,
    features: [
      `All in the free plan plus`,
      `Customizable templates`,
      `Integration with third-party apps`
    ],
    featured: true,
    highlighted: true,
    soldOut: false,
    cta: `Get started`
  },
  {
    name: 'Scaler',
    id: '2',
    href: ROUTES.DASHBOARD.path,
    price: { 1: '$9.99', 2: '$99.99' },
    discountPrice: { 1: '', 2: '' },
    description: `When you grow, need more power and flexibility.`,
    features: [`All in the pro plan plus`, `Priority support`, `Enterprise-grade security`],
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: `Get started`
  }
]
