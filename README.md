# fc-ui

Flying Cat UI — theme-aware React component library with **Dashboard**, **Glass** (Apple-style), and **8-bit** presets.

Switching themes reskins every component in real time. All components read from CSS variables, no per-component theme prop.

## Folder structure

```
fc-ui/
├── src/
│   ├── core/
│   │   ├── FcProvider.jsx     # theme context + global CSS
│   │   ├── themes.js          # Dashboard / Glass / 8-bit presets
│   │   └── index.js
│   ├── layout/
│   │   └── HolyGrail.jsx      # 5-slot compound layout
│   ├── skeleton/
│   │   └── Sk.jsx             # Sk.Box / Circle / Text
│   ├── components/
│   │   ├── typography/        # FcTitle FcEm FcSubtitle FcText FcCaption FcEyebrow FcLabel
│   │   ├── buttons/           # FcButton FcIconButton FcSwitch FcSegmented
│   │   ├── tags/              # FcTag FcBadge FcKbd FcChip FcDot
│   │   ├── form/              # FcInput FcTextarea FcCheckbox FcRadio FcSelect FcSlider
│   │   ├── display/           # FcAvatar FcAvatarGroup FcProgress FcSpinner FcMetric
│   │   ├── disclosure/        # FcAccordion FcAccordionItem FcTabs
│   │   ├── feedback/          # FcAlert FcToastProvider useToast FcEmpty FcTooltip FcModal
│   │   ├── container/         # FcCard FcPanel FcDivider FcSection FcRow
│   │   └── nav/               # FcNavGroup FcNavItem FcBreadcrumb FcLogo FcThemeSwitcher
│   │                          # FcDotNavigation FcDialNav
│   └── index.js               # barrel — re-exports everything
├── examples/
│   ├── index.html
│   ├── main.jsx
│   └── App.jsx                # full interactive showcase
├── package.json
├── vite.config.js             # dev server for examples
├── tsup.config.ts             # library build
└── README.md
```

## Setup

```bash
cd ~/work/fc-ui
npm install
```

## Run the playground

```bash
npm run dev          # http://localhost:5173
```

The Vite dev server has an alias from `'fc-ui'` → `./src/index.js`, so the example app imports the library exactly as a consumer would.

## Build the library

```bash
npm run build        # outputs dist/index.js (ESM) + dist/index.cjs (CJS)
```

## Use in your own project

Either:

1. **Local linking** for now:
   ```bash
   cd ~/work/fc-ui && npm link
   cd ~/work/your-project && npm link fc-ui
   ```
2. **GitHub install**:
   ```bash
   npm install github:YOUR_USERNAME/fc-ui
   ```
3. **Publish to npm** later (`npm publish` after the API stabilizes).

## Usage example

```jsx
import { FcProvider, FcToastProvider, FcCard, FcButton, FcTitle, FcEm, useToast } from 'fc-ui';

function MyButton() {
  const toast = useToast();
  return <FcButton onClick={() => toast({ message: 'Hello!' })}>Click me</FcButton>;
}

export default function App() {
  return (
    <FcProvider defaultTheme="glass">
      <FcToastProvider>
        <FcCard>
          <FcTitle>Hello, <FcEm>world</FcEm></FcTitle>
          <MyButton />
        </FcCard>
      </FcToastProvider>
    </FcProvider>
  );
}
```

## Switching themes at runtime

```jsx
import { useFc } from 'fc-ui';

function ThemeToggle() {
  const { theme, setTheme } = useFc();
  return (
    <button onClick={() => setTheme(theme === 'glass' ? 'cute' : 'glass')}>
      Toggle
    </button>
  );
}
```

## Adding a custom theme

```jsx
import { THEMES } from 'fc-ui';

THEMES.midnight = {
  name: 'Midnight',
  mascot: '🌙',
  vars: {
    '--fc-bg': '#0a0a0f',
    '--fc-surface': '#15151c',
    '--fc-ink': '#e4e4e7',
    // ...all other --fc-* tokens (see src/core/themes.js for the full list)
  },
};
```

The `<FcThemeSwitcher />` automatically picks up new themes.

## Contributing

This repo ships an [`llms.txt`](./llms.txt) summary for LLM tooling. When you change `README.md` or the public API under `src/` (exports, component files, theme keys, provider/hook signatures), update `llms.txt` in the same commit. See [`CLAUDE.md`](./CLAUDE.md) for the exact triggers.

## License

MIT
