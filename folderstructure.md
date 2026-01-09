The follow Folder structure of the CMS Admin Dashboard

src/
├── app/
│   ├── (auth)/
│   ├── (root)/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │
│   │   ├── inventory/
│   │   │   ├── activity/
│   │   │   │   ├── page.tsx        # route entry (thin)
│   │   │   │   ├── layout.tsx
│   │   │   │   │
│   │   │   │   ├── _view/           # page composition
│   │   │   │   │   └── activity.view.tsx
│   │   │   │   │
│   │   │   │   └── _widgets/        # route-specific UI
│   │   │   │       ├── activity-table.tsx
│   │   │   │       ├── activity-columns.tsx
│   │   │   │       └── activity-filters.tsx
│   │   │   │
│   │   │   ├── batch/
│   │   │   ├── products/
│   │   │   └── stock/
│   │   │
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── settings/
│   │   └── teams/
│   │
│   ├── error.tsx
│   ├── loading.tsx
│   └── not-found.tsx
│
├── features/              # 🔥 business logic
│   ├── inventory/
│   │   ├── activity/
│   │   │   ├── activity.api.ts
│   │   │   ├── activity.schema.ts
│   │   │   ├── activity.hooks.ts
│   │   │   └── activity.types.ts
│   │   └── products/
│   │
│   ├── orders/
│   └── auth/
│
├── components/             # reusable UI
│   ├── ui/
│   ├── layout/
│   └── common/
│
├── services/               # axios / fetch
├── hooks/                  # shared hooks
├── lib/                    # utils
├── store/                  # zustand
├── constants/
├── types/
└── assets/
src/
├── app/
│   ├── (auth)/
│   ├── (root)/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │
│   │   ├── inventory/
│   │   │   ├── activity/
│   │   │   │   ├── page.tsx        # route entry (thin)
│   │   │   │   ├── layout.tsx
│   │   │   │   │
│   │   │   │   ├── _view/           # page composition
│   │   │   │   │   └── activity.view.tsx
│   │   │   │   │
│   │   │   │   └── _widgets/        # route-specific UI
│   │   │   │       ├── activity-table.tsx
│   │   │   │       ├── activity-columns.tsx
│   │   │   │       └── activity-filters.tsx
│   │   │   │
│   │   │   ├── batch/
│   │   │   ├── products/
│   │   │   └── stock/
│   │   │
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── settings/
│   │   └── teams/
│   │
│   ├── error.tsx
│   ├── loading.tsx
│   └── not-found.tsx
│
├── features/              # 🔥 business logic
│   ├── inventory/
│   │   ├── activity/
│   │   │   ├── activity.api.ts
│   │   │   ├── activity.schema.ts
│   │   │   ├── activity.hooks.ts
│   │   │   └── activity.types.ts
│   │   └── products/
│   │
│   ├── orders/
│   └── auth/
│
├── components/             # reusable UI
│   ├── ui/
│   ├── layout/
│   └── common/
│
├── services/               # axios / fetch
├── hooks/                  # shared hooks
├── lib/                    # utils
├── store/                  # zustand
├── constants/
├── types/
└── assets/


Recommended Industry-Level Folder Structure (Next.js App Router)

🔹 Root level (clean & minimal)

cms-admin-dashboard/
├── public/
├── src/
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md

src/ – Real Application Code Only

src/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── store/
├── styles/
└── types/

app/ – Routing + Layouts ONLY

No business logic
No API calls
No complex components

src/app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   └── layout.tsx
│
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx          // dashboard home
│   ├── users/
│   │   └── page.tsx
│   ├── roles/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── analytics/
│       └── page.tsx
│
├── api/
│   ├── auth/
│   │   └── route.ts
│   └── users/
│       └── route.ts
│
├── favicon.ico
├── globals.css
├── layout.tsx            // root layout
└── page.tsx              // landing / redirec


features/ – Business Logic (🔥 Most Important)

This is where real CMS logic lives.

src/features/
├── auth/
│   ├── auth.api.ts
│   ├── auth.schema.ts
│   ├── auth.hooks.ts
│   └── auth.types.ts
│
├── users/
│   ├── users.api.ts
│   ├── users.columns.ts
│   ├── users.form.tsx
│   ├── users.hooks.ts
│   └── users.types.ts
│
├── roles/
│   ├── roles.api.ts
│   ├── roles.permissions.ts
│   └── roles.types.ts
│
├── analytics/
│   └── analytics.api.ts
