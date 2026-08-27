# Keyboard navigation

> Every single-key shortcut, when each stands down for typing, and how to turn them off per site or per page.

---

LLMS index: [llms.txt](/llms.txt)

---

OINK's interactive pages come with a set of single-key shortcuts: WASD moves
through the sidebar tree, J K jump between headings,
Q E page back and forward, and a few more toggle the
theme, the language and the command palette. They are on by default, every
binding stands down for typing, and they can be turned off per site or per page.

Keyboard navigation keeps no second copy of any state: expanding and collapsing
reuses the sidebar's own arrow buttons, section jumps read the right-hand
outline, and switching language and theme reuse the command palette's actions.
Keyboard order and mouse order are therefore the same order.

## Sidebar {#sidebar}

| Key | Behaviour |
| --- | --- |
| W S ↑ ↓ | Move focus to the previous / next visible entry |
| A D ← → | Collapse / expand a group; on a leaf, A goes to the parent and D does nothing |
| Enter Space G | Open the focused page |
| Esc | Leave the tree; focus returns to the body |

The four letter keys need no prior entry into the tree: with focus still in the
body, S takes the current page's sidebar entry as its starting
point, moves down one and takes focus. The focused row is shaded a step darker
than the "current page" shading, so the two are distinguishable.

When the sidebar is in a drawer on a narrow screen, or collapsed on the desktop,
the first press of one of these keys opens it first. On a page with no sidebar
tree they are silent.

The arrow keys act on the tree **only after focus has entered the sidebar**; in
the body they keep native browser scrolling. In a right-to-left language
← → swap with the reading direction, while
A D always mean "collapse / expand".

## Reading {#reading}

| Key | Behaviour |
| --- | --- |
| J K | Jump to the next / previous section along the page outline |
| N | Home page only: jump to the next top-level section (a mnemonic alias for J there) |
| Q E | Previous / next page |
| H | Focused reading: hide / restore the navigation shell |

J K take their target sequence from the same source
as the right-hand outline, so they land where clicking the outline lands. The
jump is a fixed 100 ms ease regardless of distance, and successive presses need
not wait for the previous animation. Once you have read some way into a section,
K returns to that section's start first and only jumps to the
previous section on a second press. On a page with no headings it degrades to a
short scroll.

Q E page in the **sidebar tree's visible order**, not
by date. A section index is itself an entry in the tree, so a blog's section
boundary reads as "last post of the previous section → next section's index →
first post of the next section". A collapsed branch is not in that order:
paging order and focus order are the same order. On a page with no sidebar tree
it falls back to the page-end pager, and without one to `rel=prev/next` in
`<head>`.

H hides only the navbar and footer on the home page, and on a
documentation page hides the left and right columns and the floating buttons too.
The state is kept in the tab's session and restored before the first frame, so
paging through with Q E neither loses it nor
flickers. While the shell is hidden, WASD will not send focus into an invisible
sidebar.

## Appearance, language and routing {#appearance}

| Key | Behaviour |
| --- | --- |
| L Y | Cycle the language (the two keys are equivalent) |
| T | Toggle light and dark |
| R | Cycle among same-origin top-level navbar entries |

These three work on any interactive page, not only inside the documentation
shell. L on a single-language site, T with the
light/dark menu off, and R with only one top-level entry are all
silent. R cycles only same-origin top-level menu items; external
links and navbar utility controls take no part.

## Search and commands {#search}

| Key | Behaviour |
| --- | --- |
| F or \/ | Open the command palette in full search mode |
| C or the backslash key | Open the command palette in command-only mode |
| ⌘ + K or Ctrl + K | Open the palette; press again to close |

\/ and backslash belong to search itself and keep working with
keyboard navigation off; F C are aliases keyboard
navigation adds, pointing at the same palette instance. Backslash is awkward on
some non-US layouts, and typing a `>` prefix in the palette reaches command-only
mode just as well. What the palette holds is in
[Command palette](/docs/customize/panel/).

## Keys deliberately left free {#reserved}

\? is reserved and unbound. The cheatsheet hangs off the question
mark button in the footer's bottom bar, opens on hover, keyboard focus or
touch, and lists the keys actually available on the current page: a
single-language site never sees the language row.

G G, Shift + G and the digits are
likewise reserved, as possible future jump sequences.

## When shortcuts stand down {#stand-down}
Every binding is a bare single key, and all of them are disabled wherever they
could collide with typing or an overlay:

- Focus is in an input, textarea, select or `contenteditable` region;
- An input method is composing (a hard requirement on a Chinese site);
- A modifier is held: ⌘ + C is still copy, Shift + ↓ still belongs to the browser;
- The command palette or another dialog is open, and the keyboard belongs to that overlay.

The comment section lives in an iframe, where key events do not bubble to the
page, so no extra isolation is needed.

## Focus order and accessibility {#a11y}

- **Skip link**: the first Tab after landing on a page reveals "skip to main content", stepping past the navbar and sidebar in one move.
- **Real focus**: navigating the tree moves actual DOM focus rather than a virtual cursor. A screen reader therefore announces the link name and the "current page" marker, Enter is the link's native behaviour, and the Tab order is not rewritten.
- **High contrast**: the focused row's background drops out under `forced-colors` and degrades to a system highlight outline.
- **Reduced motion**: with `prefers-reduced-motion` on, section jumps and paging scroll become instant positioning rather than an ease.
- The key caps in the cheatsheet share their styling with the [Kbd](/docs/components/kbd/) component used in the body.

## Turning it off {#disable}

Site-wide:

```yaml {title="hugo.yml"}
params:
  ui:
    keyboard_nav: false
```

For one page (interaction-heavy demonstration pages often need this), or for a
whole section by cascade:

```yaml {title="content/docs/playground.md"}
---
title: Interactive playground
keyboard_nav: false
---
```

The key accepts a boolean only; `"false"` or any other value fails the build
with `params.ui.keyboard_nav must be a boolean`. The full definition is in
[Configuration](/docs/customize/config/).

Turned off, the runtime never enters the JavaScript bundle rather than loading
and then checking. \/, backslash and ⌘ + K belong to
search and keep working; the arrows on the footer's collapsible link grid are
unaffected.

## Verify {#verify}

1. After a build, confirm the cheatsheet button is in the page:

   ```bash
   grep -c 'td-shell-keyboard__trigger' public/docs/customize/keyboard/index.html
   ```

   With keyboard navigation off and local search not enabled, the button is not
   generated at all.

2. Open a documentation page, leave the cursor in the body and press S repeatedly: the sidebar should step down from the current page's entry while the body stays put.

3. Press E several times and check the paging order matches the sidebar top to bottom; collapse a group and page again — the collapsed pages should be skipped.

4. Click into the search box and press J: the page should **not** scroll, and the character should type normally. The same holds while typing with a Chinese input method.

5. Turn on "reduce motion" in the system and press J: it should position instantly with no glide.

## Related {#related}

- [Command palette](/docs/customize/panel/) — the dialog F C open
- [Search](/docs/customize/search/) — where the palette's page results come from
- [Layouts and page types](/docs/customize/layout/) — which pages have a sidebar and outline, and so which keys apply
- [Kbd](/docs/components/kbd/) — writing key caps in your own documentation
- [Configuration](/docs/customize/config/) — the full definition of `ui.keyboard_nav`

---

Backlinks:

- [Highlights](/docs/about/features/)
- [Kbd](/docs/components/kbd/)
- [Customization](/docs/customize/)
- [Configuration](/docs/customize/config/)
- [Command palette](/docs/customize/panel/)
- [Search](/docs/customize/search/)
- [Page parameters](/docs/write/frontmatter/)
