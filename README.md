# Angular Aria UI (Shadcn-style for Angular)

A modern, accessible Angular component library inspired by shadcn/ui — built with Angular-native patterns, TailwindCSS, and accessibility-first primitives.

---

## ✨ Vision

Bring the **shadcn design language** to Angular without copying React patterns.

* Angular-first APIs (directives + compound components)
* Accessibility by default (ARIA, keyboard, focus)
* Tailwind-based styling system
* Fully installable component library
* Clean, minimal, design-system-ready

---

## 🧱 Core Principles

### 1. Angular Native

* No React mental model
* Prefer directives over wrappers
* Use signals for state
* Composition over abstraction

### 2. Accessibility First

Powered by:

* Angular CDK A11y
* `@angular/aria` (emerging primitives)

Handles:

* ARIA attributes
* Keyboard navigation
* Focus management
* Screen reader support

### 3. Shadcn Aesthetic

* Minimal, clean UI
* Neutral color tokens
* Soft radius, subtle borders
* Tailwind-driven variants

### 4. Developer Ownership

* No hidden magic
* Predictable APIs
* Easy to extend and override

---

## 📦 Package Structure

@your-scope/ui
@your-scope/theme
@your-scope/aria

### @your-scope/ui

Core components:

* button
* input
* label
* checkbox
* switch
* dialog
* popover
* tooltip
* dropdown-menu
* tabs
* accordion
* toast

### @your-scope/theme

Design tokens + Tailwind preset:

* colors
* radius
* spacing
* typography
* dark mode config

### @your-scope/aria

Shared accessibility utilities:

* focus management
* keyboard handlers
* overlay helpers
* role + aria bindings

---

## 🧩 Component API Design

### Directive-first (preferred)

```html
<button uiButton variant="outline" size="sm">
  Save
</button>

<input uiInput placeholder="Email" />
```

### Compound components (for complex UI)

```html
<ui-dialog>
  <button uiDialogTrigger>Open</button>

  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Edit profile</ui-dialog-title>
    </ui-dialog-header>

    <ui-dialog-body>
      ...
    </ui-dialog-body>

    <ui-dialog-footer>
      <button uiButton>Save</button>
    </ui-dialog-footer>
  </ui-dialog-content>
</ui-dialog>
```

---

## 🎨 Styling System

Built on Tailwind + CVA-style variants

```ts
buttonVariants({
  variant: 'outline',
  size: 'sm'
})
```

### Example tokens

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --border: 214 32% 91%;
  --radius: 0.5rem;
}
```

---

## ♿ Accessibility Strategy

Each component must define:

* role
* aria-* attributes
* keyboard interactions
* focus behavior
* screen reader semantics

### Example (Dialog)

* role="dialog"
* aria-modal="true"
* focus trap enabled
* ESC to close
* return focus on close

---

## 🚀 MVP Components

Start with:

* Button
* Input
* Label
* Checkbox
* Switch
* Dialog
* Popover
* Tooltip
* Dropdown Menu
* Tabs
* Accordion
* Toast

---

## ⚠️ Phase 2 (Advanced)

* Select (Listbox)
* Combobox
* Date Picker
* Command Palette
* Data Table (accessible grid)

---

## 🧪 Testing Strategy

Use:

* Playwright (keyboard navigation)
* Unit tests (ARIA correctness)
* Visual regression (optional)

Checklist:

* Tab navigation works
* Focus visible
* Screen reader reads correctly
* Escape closes overlays
* Arrow keys navigate lists

---

## 🧠 Internal Architecture

* State: Angular Signals
* Overlay: Angular CDK Overlay
* Focus: FocusTrap + FocusMonitor
* Events: Signals (prefer minimal RxJS)

---

## 📐 Example: Button Directive

```ts
@Directive({
  selector: '[uiButton]',
  host: {
    '[class]': 'classes',
    '[attr.data-variant]': 'variant',
    '[attr.data-size]': 'size'
  }
})
export class UIButtonDirective {
  @Input() variant: 'default' | 'outline' | 'ghost' = 'default'
  @Input() size: 'sm' | 'md' | 'lg' = 'md'

  classes = computed(() =>
    buttonVariants({ variant: this.variant, size: this.size })
  )
}
```

---

## 🧩 Example: Dialog Behavior

* Trigger click → open dialog
* Trap focus inside dialog
* Set aria-hidden outside
* ESC closes dialog
* Return focus to trigger

---

## 📚 Naming Convention

* uiButton
* uiInput
* uiDialog
* uiTabs
* uiDropdownMenu

Consistent, predictable, Angular-friendly.

---

## 🎯 Positioning

Not a clone of shadcn/ui
Not a heavy UI framework

A **lightweight, accessible Angular UI system with shadcn aesthetics**

---

## 🔥 Future Ideas

* CLI to scaffold components
* Theme generator
* Design token editor
* Figma kit
* Docs site (Storybook + examples)

---

## 🏁 Summary

* Bring modern UI patterns to Angular
* Make accessibility the default
* Provide clean, reusable primitives
* Keep full control in developers’ hands

---
