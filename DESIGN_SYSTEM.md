# Om Tent House And Caterers — Design System & Brand Experience

## SECTION 1 — BRAND PERSONALITY

**Brand Archetype**
The Ruler meets The Caregiver. We represent absolute control, luxury, and authority in execution (The Ruler), while simultaneously providing complete peace of mind, reliability, and protection from failure for the client (The Caregiver).

**Brand Voice**
Confident, refined, commanding, yet profoundly reassuring. We do not boast; we state facts with elegant restraint. We speak like the director of a luxury hotel—polite, precise, and unwavering.

**Brand Tone**
*   **When inspiring (Hero, Gallery):** Visionary, grand, expansive, evocative.
*   **When reassuring (Our Promise, About):** Grounded, factual, empathetic to the client's stress, absolutely secure.
*   **When prompting action (Contact, CTA):** Clear, direct, exclusive, inviting.

**Brand Attributes**
*   Unshakeable Reliability
*   Cinematic Grandeur
*   Premium Craftsmanship
*   Quiet Confidence
*   Flawless Execution

**Emotional Positioning**
*Strategic Anchor:* "The Guardians of Your Milestone." 
We absorb the stress of event logistics. We position ourselves not as a rental company, but as elite event architects who guarantee a flawless, high-end experience so the host can focus entirely on their guests and their joy.

---

## SECTION 2 — VISUAL IDENTITY

*The palette mimics a grand, high-end nighttime wedding reception—dark skies, illuminated tents, and soft golden light.*

**Primary Colors**
*   **Midnight Slate (`#020617`):** The core background. Represents the night sky, infinite depth, and high-end exclusivity. 
*   **Obsidian (`#0F172A`):** Used for elevated surfaces to create depth without resorting to pure black.

**Secondary Colors**
*   **Antique Gold (`#D4AF37`):** The primary brand color for emphasis. Represents royalty, celebration, and premium value. Muted and sophisticated, never a cheap, blinding yellow.
*   **Champagne Glow (`#FDE68A`):** Used for subtle hover states and soft lighting interactions.

**Accent Colors**
*   **Deep Emerald (`#064E3B`):** Used sparingly to represent the complementary floral and natural elements of our decoration.
*   **Warm Crimson (`#7F1D1D`):** A nod to traditional cultural weddings, used highly restrictively in thematic highlights or error states.

**Surface Colors**
*   **Glass Surface (`rgba(15, 23, 42, 0.6)`):** A translucent, dark surface used to hold content above cinematic photography while maintaining legibility.
*   **Solid Surface (`#1E293B`):** For input fields, solid cards, and tight UI components.

**Text Colors**
*   **Pearl White (`#F8FAFC`):** Primary reading text. Deeply legible against the dark backgrounds.
*   **Muted Silver (`#94A3B8`):** Body paragraphs, secondary text, metadata, and captions.
*   **Gold Text (`#FBBF24`):** Exclusive use for key statistics, small overlines, and interactive links.

**Border Colors**
*   **Border Glass (`rgba(255, 255, 255, 0.08)`):** Used to define edges in the glassmorphism system without looking solid.
*   **Border Gold (`rgba(212, 175, 55, 0.3)`):** Used to highlight active elements, premium cards, or interactive boundaries.

---

## SECTION 3 — GLASSMORPHISM SYSTEM

*The glassmorphism system ensures the dark cinematic imagery is always visible, creating a layered, immersive experience that feels modern and expensive.*

*   **Background Strategy:** Deep, heavy background blurs that heavily obscure the image beneath while letting ambient light and color bleed through. The focus must always remain on reading the text.
*   **Overlay Strategy:** All glass panels must have a dark slate tint (60-80% opacity) layered over the blur to ensure Pearl White text maintains HCAG AAA contrast.
*   **Blur Levels:** 
    *   *Ambient Blur (12px):* Used for large hero overlays or sweeping sections.
    *   *Macro Blur (24px):* Used for distinct UI cards, navigation bars, and modals.
*   **Border Styles:** Ultra-thin (1px). The top and left borders should catch a 'specular highlight' (10% Solid White), while the bottom and right fade into the background (0% White) to simulate physical glass catching directional light.
*   **Transparency Levels:** 
    *   Elevated Cards: 60% Slate.
    *   Navigation: 80% Slate.
    *   Inputs: 40% Slate.
*   **Shadow Philosophy:** No harsh, tight drop shadows. We use "Ambient Glows" (diffused, large-spread shadows tinted with the glass color or very faint gold) to lift objects off the background.

---

## SECTION 4 — TYPOGRAPHY SYSTEM

*A delicate interplay between traditional luxury and modern performance.*

*   **Display / Heading Font:** *Playfair Display* (Serif). 
    *   *Purpose:* Royal, timeless, and editorial. Used exclusively for H1, H2, and H3.
    *   *Styling:* Often used in Sentence case or italicized for specific elegant emphasis. High contrast stroke weights convey wealth.
*   **Body Font:** *Inter* (Sans-serif). 
    *   *Purpose:* Modern, highly legible, and crisp. Used for all reading text, UI elements, navigation, and badges.
    *   *Styling:* Light/Regular weights with slightly increased letter spacing to feel airy and uncrowded.
*   **Font Pairing Strategy:** 
    *   We pair grand, sweeping Playfair Display headlines with structured, uppercase Inter sub-headlines (tracking-widest) to create typographic tension. 
*   **Type Scale:** Uses a Golden Ratio scale. 
    *   Headlines are massive and cinematic (Desktop H1: 80px+). 
    *   Body text is restrained and readable (16px to 18px).
*   **Hierarchy Rules:**
    1.  **Overline (Eyebrow):** Inter, 12px, Uppercase, Tracking (Letter-spacing: +0.2em), Gold.
    2.  **Display Heading:** Playfair Display, 64px+, Tight line-height (1.1).
    3.  **Lead Paragraph:** Inter, 20px, Light, Muted Silver, Loose line-height (1.6).
    4.  **Action / UI:** Inter, 14px, Medium, sentence case or uppercase.

---

## SECTION 5 — SPACING SYSTEM

*Luxury is breathing room. The spacing system relies on extreme margins and extensive negative space to frame content rather than cramming it.*

*   **Layout Grid:** 12-column symmetrical grid. The central 8 columns hold primary text to prevent uncomfortable horizontal eye-scanning on wide monitors.
*   **Container Widths:** 
    *   Max-width set to `1440px`. 
    *   Text reading columns capped at `65ch` (characters) for optimal readability.
*   **Section Spacing:** Monumental. Sections must feel like entirely new "rooms" being entered. Vertical gaps of `160px` to `200px` on desktop.
*   **Card Spacing:** Internal padding of `40px` to `64px`. Elements inside cards should not feel pushed to the edges.
*   **Mobile Spacing:** Scaled down predictably but still generous. Section gaps at `80px`. Mobile padding locked at `24px`.
*   **Desktop Spacing:** Scaled up. Margins act as a sophisticated "frame" around the centralized cinematic content.

---

## SECTION 6 — COMPONENT DESIGN LANGUAGE

*   **Buttons:** 
    *   *Primary:* Solid Antique Gold background, Midnight Slate text. Sharp corners (2px max radius). Uppercase tracking. Hover: Slight scale up, glow effect.
    *   *Secondary/Ghost:* Transparent base, thin Border Glass or Border Gold, Pearl White text. Blur backdrop.
*   **Cards:** Sharp, structural rectangles. Background is macro-blurred slate. 1px specular top-border highlight. Content aligned left, generous top/bottom padding.
*   **Badges/Tags:** Pill-shaped (fully rounded). Deep Slate background, faint Gold border, tiny uppercase text. Used to denote "Capacity", "Category", etc.
*   **Navigation:** Fixed, transparent glass bar at the top edge. Shrinks vertically on scroll. Clean, sparse text links. No boxy dropdowns.
*   **Forms:** Bottom-border only inputs (no enclosed boxes). Text inputs look like elegant blank lines floating on the glass. Hovering brightens the bottom border to Gold.
*   **Gallery Cards:** Images extend edge-to-edge. A dark gradient overlay sits at the bottom containing the title. Hovering slowly zooms the image inline.
*   **Stats Cards:** Minimalist. Giant, glowing Gold numbered statistics paired with tiny, wide-tracked silver labels. No borders required.
*   **Testimonial Cards:** Editorial layout. Massive quotation marks in faint gold in the background. Playfair italicized for the quote body. Inter uppercase for the client name.

---

## SECTION 7 — PHOTOGRAPHY DIRECTION

*Imagery cannot look like stock photos of generic parties. It must feel custom, massive in scale, and impeccably managed.*

*   **Hero Imagery:** Cinematic wide shots of a fully illuminated, massive tent setup at dusk/night. The focal point is the golden light radiating from inside the structure against a deep blue/black twilight sky.
*   **Wedding Imagery:** Focus on the architecture of the event—empty, perfectly set banquet tables, towering floral centerpieces, symmetric stage designs. No messy crowds; show the pristine setup *before* the guests arrive.
*   **Catering Imagery:** Macro details. Steam rising from silver chafing dishes. Perfectly arranged buffet lines under warm spotlighting. Uniformed, gloved staff standing at attention.
*   **Lighting Imagery:** Dynamic contrast. Chandeliers hanging from fabric-draped ceilings. Ambient uplighting washing across architectural pillars or tent walls.
*   **Decoration Imagery:** Rich floral cascades, sharp drapery lines, crisp carpets. Show the "texture" of the premium materials.

---

## SECTION 8 — MOTION SYSTEM

*Motion must convey weight, deliberation, and luxury. Nothing should bounce, zip, or flash.*

*   **Hover Interactions:** Extremely smooth fade transitions. CSS transitions set to `0.4s ease-out`. Buttons don't instantly switch colors; they 'breathe' into the new state. 
*   **Scroll Animations:** Elements fade in and gently drift upward (`translateY: 20px` to `0`) as they enter the viewport. Subtle viewport-triggered stagger effects on lists or grids.
*   **Page Transitions (Concept):** The screen does not blink white. Backgrounds fade down, the new background fades up. Content gently cross-fades.
*   **Loading States:** No spinning wheels. Use a glowing, pulsing minimal logo mark or an elegant golden progress line spanning the absolute top of the screen. 
*   **Parallax:** Subtle background parallax on hero banners and section dividers to give the web of a three-dimensional depth, enhancing the glassmorphism.

---

## SECTION 9 — WEBSITE MOOD BOARD

*   **Overall Atmosphere:** "A Royal Vanguard." Standing at the entrance of a 5-star heritage hotel at midnight. The air is calm, the lighting is spectacular, and the service is invisible but flawless.
*   **Visual References:** High-end hospitality websites (Aman Resorts, The Ritz-Carlton), cinematic movie posters (The Great Gatsby), luxury watch campaigns (Rolex, Patek Philippe).
*   **Luxury References:** Black velvet, brushed gold, polished crystal, crisp white table linens, perfectly symmetrical architecture.
*   **Event References:** The specific structural perfection of grand Indian weddings—massive waterproof German tents, royal Rajasthani stage decor themes, endless arrays of pristine buffet stations. 

---

## SECTION 10 — DESIGN TOKENS

*(Conceptual token structures mapped to the identity)*

**Colors**
*   `color-brand-primary`: Gold (`#D4AF37`)
*   `color-brand-secondary`: Champagne (`#FDE68A`)
*   `color-surface-base`: Midnight Slate (`#020617`)
*   `color-surface-elevated`: Obsidian (`#0F172A`)
*   `color-surface-glass`: `rgba(15, 23, 42, 0.6)`
*   `color-text-high-contrast`: Pearl White (`#F8FAFC`)
*   `color-text-medium`: Muted Silver (`#94A3B8`)
*   `color-border-subtle`: `rgba(255, 255, 255, 0.08)`
*   `color-border-focus`: `rgba(212, 175, 55, 0.3)`

**Typography**
*   `font-family-display`: 'Playfair Display', serif
*   `font-family-body`: 'Inter', sans-serif
*   `font-weight-light`: 300
*   `font-weight-regular`: 400
*   `font-weight-medium`: 500
*   `font-weight-bold`: 700
*   `letter-spacing-tight`: `-0.02em`
*   `letter-spacing-wide`: `0.2em`

**Spacing & Sizing**
*   `spacing-macro`: `160px`
*   `spacing-section`: `96px`
*   `spacing-component`: `40px`
*   `spacing-element`: `16px`
*   `container-max-width`: `1440px`

**Effects & Borders**
*   `radius-sharp`: `2px`
*   `radius-pill`: `9999px`
*   `blur-ambient`: `12px`
*   `blur-macro`: `24px`
*   `shadow-glow-gold`: `0 8px 32px rgba(212, 175, 55, 0.15)`
*   `shadow-glass-depth`: `0 24px 48px rgba(0, 0, 0, 0.5)`
*   `transition-deliberate`: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
*   `transition-slow`: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
