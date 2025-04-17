# Moderní Web Builder

Tento projekt je moderní web builder postavený na Reactu a Tailwind CSS, který umožňuje vytvářet webové stránky pomocí drag-and-drop rozhraní. Obsahuje podporu pro text, obrázky, formuláře, více šablon a e-shop s online platbami přes Stripe.

## Funkce

- **Drag-and-drop**: Přetahujte prvky (text, obrázky, formuláře, produkty) po plátně.
- **Podpora obrázků**: Přidávejte obrázky přes URL.
- **Formuláře**: Vytvářejte jednoduché kontaktní formuláře.
- **Více šablon**: Portfolio, blog a e-shop šablony.
- **E-shop s platbami**: Integrace Stripe pro zpracování plateb.
- **Ukládání a export**: Uložte design do localStorage nebo exportujte jako HTML.

## Instalace

1. Naklonujte repozitář:

   ```bash
   git clone https://github.com/kolikkulda/modern-web-builder.git
   cd modern-web-builder
   ```

2. Nainstalujte závislosti:

   ```bash
   npm install
   ```

3. Spusťte projekt:

   ```bash
   npm start
   ```

## Nasazení na GitHub Pages

1. Nainstalujte `gh-pages`:

   ```bash
   npm install gh-pages
   ```

2. Upravte `package.json` a přidejte:

   ```json
   "homepage": "https://kolikkulda.github.io/modern-web-builder"
   ```

3. Nasazení:

   ```bash
   npm run deploy
   ```

## Konfigurace Stripe

1. Zaregistrujte se na Stripe.
2. Získejte veřejný klíč (`pk_test_...`) a nahraďte ho v `src/App.jsx`.
3. Pro produkční prostředí nastavte backend pro zpracování plateb (např. Node.js s `@stripe/stripe-js`).

## Rozšíření

- Přidejte další šablony v `loadTemplate`.
- Rozšiřte formuláře o další typy polí.
- Implementujte backend pro ukládání formulářů a zpracování plateb.

## Licence

MIT
