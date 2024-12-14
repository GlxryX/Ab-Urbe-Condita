# Ab Urbe Condita

[![Netlify Status](https://api.netlify.com/api/v1/badges/75a7c2cf-f78d-410d-a6e4-46a338c68725/deploy-status)](https://app.netlify.com/sites/ab-urbe-condita/deploys)

This is the source code for the web app at https://ab-urbe-condita.netlify.app/.

## Usage

### Prerequisites

```bash
npm install
```

### Development

```bash
npm run dev
```

Then visit http://localhost:3000/ to preview the website.

### Static build

To build a static version of the website to the `out` folder, run:

```bash
npm run build
```

Then run said build with:

```bash
npm start
```

### I was played a card that doesn't make sense - what gives?

There are some cards that unfortunately don't quite make sense or have bad data. These need to be removed from the game and, ideally, to have their underlying wikidata entry fixed.

Please report any bad cards here: https://github.com/tom-james-watson/wikitrivia/discussions/2.
