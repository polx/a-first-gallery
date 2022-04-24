# My Cabri 3D Gallery

A script to produce a gallery of cabri 3d pictures.

To use:

- fork the project into your own project
- Adjust at least title and player URL in [the gallery configuration](src/_data/galleryConfig.json)
- install necessary software: run `npm install`
- add your `.cg3` files inside the base directory
- for those for which you have picture, add the `.png` file with the same name
- build: `npm run start`
- your site is produced inside `_site`

This can be used online too. E.g. on github, bitbucket or gitlab: 
on these services it is possible to modify the configuration online and upload
the `.cg3` files.

## Files

Any CG3 or PNG file inside the root and subfolders is yours to manage except for:

- the files `.eleventy.js`, `package.json`, `package-lock.json`
- the directories `src` and `.github`


## Credits

Thanks to the eleventy team!
This project originally started with the 
[gallery of Raymond Camden](https://www.raymondcamden.com/2021/04/07/building-a-simple-image-gallery-with-eleventy)
and got considerably helped by 
[Ben Meyers' data cascade explanations](https://benmyers.dev/blog/eleventy-data-cascade/).
