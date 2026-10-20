# VenueSense Optimize

A **venue management dashboard** for monitoring crowd capacity, analysing attendance and handling bookings in one place. Built with React, TypeScript and Supabase, and scaffolded with [Lovable](https://lovable.dev).

## Features

- **Capacity overview**: see how full a venue is at a glance
- **Capacity controls**: adjust capacity settings
- **Venue heatmap**: visualise which areas are busiest
- **Analytics overview**: charts for attendance and usage trends
- **Booking system**: manage venue bookings
- Sidebar navigation, responsive layout and light/dark theme support

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | React 18, TypeScript, Vite |
| UI | Tailwind CSS, shadcn/ui (Radix UI), Lucide icons |
| Charts | Recharts |
| Data and state | Supabase, TanStack React Query, React Hook Form, Zod |
| Routing | React Router |

## Project structure

```
src/
  pages/                 Index, Dashboard, NotFound
  components/
    dashboard/           CapacityOverview, CapacityControls, VenueHeatmap,
                         AnalyticsOverview, BookingSystem
    layout/              Sidebar and DashboardHeader
    ui/                  shadcn/ui components
  integrations/supabase/ Supabase client and generated types
supabase/                Supabase project config
```

## Getting started

Requires Node.js 18+.

```bash
git clone https://github.com/tanaytejush/venue-sense-optimize.git
cd venue-sense-optimize
npm install
npm run dev
```

The app runs at the URL shown in the terminal (Vite default: <http://localhost:5173>).

To connect your own backend, create a Supabase project and update the URL and public key in `src/integrations/supabase/client.ts`.

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint the code |
| `npm run preview` | Preview the production build |

## Editing with Lovable

The project is linked to a [Lovable project](https://lovable.dev/projects/1fbc23d3-ccae-47e0-b372-f2c8a9f6c768). Prompting there pushes changes straight to this repository, and you can also edit the code locally or in GitHub Codespaces.


---

<sub>Made by [tanaytejush](https://github.com/tanaytejush)</sub>
