# Admin guide — editing the Upsure website

The admin panel lives at **`/admin`** (locally: http://localhost:3000/admin). Log in with your email and password. Everything you publish appears on the public site within a second or two, no rebuild needed.

## The layout of the admin

| Group | What's in it |
|---|---|
| **Site** | Pages (Home, Services, About, Culture, Contact, legal…), Services, Case studies |
| **Blog** | Posts, Categories, Authors |
| **Content** | Testimonials, Team members, Clients (logos), FAQs, Media |
| **Inbox** | Forms, Form submissions (every enquiry), Newsletter subscribers |
| **Settings** | Site settings (contact details, socials, stats, SEO defaults), Header, Footer, CTA band, Redirects |

## Editing a page

1. Open **Site → Pages** and pick the page.
2. The **Layout** tab is a list of *blocks* (Hero, Statement, Service grid, FAQ…). Click a block to expand and edit its text and images. Use the handle on the left to drag blocks into a new order, the **+** between blocks to add one, and the **⋯** menu to duplicate or remove.
3. Click **Save draft** to keep working, or **Publish** to make it live. Unpublished changes are only visible in Preview.
4. **Live Preview** (button at the top right) opens the page beside the editor and updates as you type. Switch between mobile, tablet and desktop widths with the icons above the preview.

### Highlighting words
In any heading field you can wrap words in double square brackets to give them the teal underline: `We design brands [[people love]]`.

### The SEO tab
Every page, service, case study and post has an **SEO** tab. The title and description are auto-generated from the content; click **Generate** to refresh them or type your own. The preview shows how the page looks in Google.

## Adding a case study

1. **Site → Case studies → Create new**.
2. **Overview**: client name, industry, which services were involved, a one-sentence summary for the card, a cover image and up to four headline stats (e.g. `400%` / `Organic traffic increase`).
3. **Story**: intro, the brief (objective), 2–6 sections with an optional image each, optional before/after images, an outcome timeline, a video (upload or YouTube/Vimeo link), and a client testimonial.
4. Publish. It appears on `/work`, on the relevant service pages and in "Similar projects".

## Adding a blog post

1. **Blog → Posts → Create new**. Title, excerpt (shown on cards), cover image, and the article body in the rich-text editor (headings, bold, links, images, quotes, lists).
2. In the sidebar pick a **Category**, add tags and an author, and set the date.
3. Publish. It appears on `/blog`, in its category, and in the "What's happening?" carousel on Home.

## Testimonials, team, clients, FAQs

These are simple lists under **Content**. Tick **Featured** on a testimonial to include it in the Home carousel. **Order** controls sequence (lower first). FAQ **Scope** decides which page's FAQ block shows the question.

## Images

Upload under **Content → Media** or directly from any image field. Always fill in the **Alt** text (what the image shows). Large photos are resized automatically; drag the focal point on the preview so crops keep the important part in view. SVG logos are used as-is.

## Enquiries

Every form on the site (contact, consultation, call-back, project brief) stores its submission under **Inbox → Form submissions** and emails the address in Site settings. Newsletter sign-ups are under **Inbox → Newsletter subscribers** (export as CSV for your email tool).

## Placeholder content

Seeded content that still needs real material has the **Placeholder content** box ticked in its sidebar. In any list view use the filter `Placeholder content = true` to see what is left. Untick it once you have replaced the copy or image.

## Navigation, footer and contact details

- **Settings → Header**: menu items and their dropdowns; the "Start a project" button.
- **Settings → Footer**: description, link columns, newsletter text, legal links.
- **Settings → Site settings**: email, phone, address, hours, social links, headline stats, trust badges and SEO defaults.
- **Settings → CTA band**: the "Ready to move forward?" band shown above the footer.

## Redirects

If you change a page's URL, add the old path under **Settings → Redirects** so links keep working.
