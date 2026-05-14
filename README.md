# @fcstudio/fc-ui

> Flying Cat UI — a theme-aware React component library. Swap one provider and the entire interface reskins.

`@fcstudio/fc-ui` ships a curated set of accessible React components and three production-ready visual presets — **Dashboard**, **Glass** (Apple-style), and **8-bit** — driven by a single CSS-variable bag. There is no per-component theme prop, no runtime style engine, no global stylesheet to bolt on. Wrap your tree in `<FcProvider>`, pick a theme, and every component picks up the new look in the same render.

## Why fc-ui

- **One source of truth for theming.** Every component reads from `--fc-*` CSS variables. Switch themes by changing one attribute on the root.
- **Three opinionated presets out of the box.** Dashboard for product UI, Glass for marketing-grade visuals, 8-bit for playful surfaces — including fonts, radii, shadows, and motion.
- **Bring your own theme.** Add an entry to the exported `THEMES` map and it shows up in the switcher automatically.
- **Distinct themes, identical API.** The same `<FcButton>` adapts to each preset without prop or className gymnastics.
- **Light footprint.** ESM + CJS dual build, tree-shakeable exports, only `react`, `react-dom`, and `lucide-react` as peer dependencies.

## Installation

```bash
npm install @fcstudio/fc-ui react react-dom lucide-react
```

Peer requirements: React 18+, React DOM 18+, `lucide-react` 0.300+.

## Quick start

```jsx
import {
  FcProvider,
  FcToastProvider,
  FcCard,
  FcTitle,
  FcEm,
  FcButton,
  useToast,
} from '@fcstudio/fc-ui';

function SaveButton() {
  const toast = useToast();
  return (
    <FcButton onClick={() => toast({ message: 'Saved!', tone: 'success' })}>
      Save
    </FcButton>
  );
}

export default function App() {
  return (
    <FcProvider defaultTheme="glass">
      <FcToastProvider>
        <FcCard>
          <FcTitle>
            Hello, <FcEm>world</FcEm>
          </FcTitle>
          <SaveButton />
        </FcCard>
      </FcToastProvider>
    </FcProvider>
  );
}
```

That's it — no CSS import required. `<FcProvider>` injects the active theme's variables and the base keyframes on its own root.

## Switching themes at runtime

`useFc()` exposes the active theme key and a setter. Every built-in or registered theme works the same way.

```jsx
import { useFc, THEMES } from '@fcstudio/fc-ui';

function ThemeSwitcher() {
  const { theme, setTheme } = useFc();
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {Object.entries(THEMES).map(([key, { name }]) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </select>
  );
}
```

There's also a ready-made `<FcThemeSwitcher />` that renders the same dropdown styled for the current theme.

## Adding a custom theme

A theme is just a flat bag of CSS variables. Register a new entry and the switcher picks it up.

```jsx
import { THEMES } from '@fcstudio/fc-ui';

THEMES.midnight = {
  name: 'Midnight',
  mascot: '🌙',
  vars: {
    '--fc-bg': '#0a0a0f',
    '--fc-surface': '#15151c',
    '--fc-ink': '#e4e4e7',
    '--fc-accent': '#a78bfa',
    // …rest of the --fc-* tokens (see THEMES.dashboard for the full list)
  },
};
```

Spread an existing theme's `vars` to inherit defaults and override only what you need:

```jsx
THEMES.midnight.vars = { ...THEMES.dashboard.vars, '--fc-bg': '#0a0a0f' /* … */ };
```

## What's included

Components are exported flat — no subpaths.

| Category    | Exports                                                                          |
| ----------- | -------------------------------------------------------------------------------- |
| Core        | `FcProvider`, `useFc`, `THEMES`, `FONTS_URL`                                     |
| Layout      | `HolyGrail` (5-slot compound layout)                                             |
| Skeleton    | `Sk.Box`, `Sk.Circle`, `Sk.Text`                                                 |
| Typography  | `FcTitle`, `FcEm`, `FcSubtitle`, `FcText`, `FcCaption`, `FcEyebrow`, `FcLabel`   |
| Buttons     | `FcButton`, `FcIconButton`, `FcSwitch`, `FcSegmented`                            |
| Tags        | `FcTag`, `FcBadge`, `FcKbd`, `FcChip`, `FcDot`                                   |
| Form        | `FcInput`, `FcTextarea`, `FcCheckbox`, `FcRadio`, `FcSelect`, `FcSlider`         |
| Display     | `FcAvatar`, `FcAvatarGroup`, `FcProgress`, `FcSpinner`, `FcMetric`               |
| Disclosure  | `FcAccordion`, `FcAccordionItem`, `FcTabs`                                       |
| Feedback    | `FcAlert`, `FcToastProvider`, `useToast`, `FcEmpty`, `FcTooltip`, `FcModal`      |
| Container   | `FcCard`, `FcPanel`, `FcDivider`, `FcSection`, `FcRow`                           |
| Navigation  | `FcNavGroup`, `FcNavItem`, `FcBreadcrumb`, `FcLogo`, `FcThemeSwitcher`, `FcDotNavigation`, `FcDialNav` |

## How theming works

`<FcProvider theme="glass">` sets `data-fc-theme="glass"` on its root and inlines the matching theme's `--fc-*` variables. Components reference those variables directly via `var(--fc-*)`, so a theme swap is a one-frame restyle.

Theme-specific treatments (Glass backdrop blur, 8-bit scanlines, press effects) live inside the provider's scoped global stylesheet and are gated by the same `data-fc-theme` attribute. Components opt into them via lightweight markers like `data-fc-slot`, `data-fc-glass`, `data-fc-sk`, and `data-fc-mascot`.

The implication: building a custom component that fits the system means consuming `--fc-*` tokens — never hardcoded colors, radii, or fonts.

## TypeScript

Components are authored in JSX and consumed without types in the current release. A `.d.ts` build is on the roadmap.

## Compatibility

- React 18+ (uses `useId`, automatic batching paths)
- Modern evergreen browsers (CSS custom properties, `backdrop-filter` for the Glass preset)
- ESM and CJS consumers (dual `exports` map)

## License

MIT © Hyun

## Contributing

This repository ships an [`llms.txt`](./llms.txt) summary for LLM tooling. When you change `README.md` or the public API under `src/` (exports, component files, theme keys, provider/hook signatures), update `llms.txt` in the same commit. See [`CLAUDE.md`](./CLAUDE.md) for the exact triggers.
