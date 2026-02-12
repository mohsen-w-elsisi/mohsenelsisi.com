---
title: procedural terrain generation
favourite: false
description: 2D terrain generation using perling noise
tools:
  - typescript
  - firebase
links:
  - platform: blog post
    url: https://mohsenelsisi.com/blog/procedural-terrain-generation/
  - platform: github
    url: https://github.com/mohsen-w-elsisi/procedural-terrain-gen
  - platform: website
    url: https://mohsen-procedural-gen.web.app/
---
This project was an exploration in how procedural terrain generation is done in video games. It uses a function (not developed by me) to generate Perlin noise which is used as a height map for a 2D terrain map. 

The project is written in Typescript and the map is rendered using an HTML canvas. The demo is hosted on Firebase hosting. 

Initially, this project was supposed to be a 3D render done with ThreeJS, however due to performance problems (each pixel in the height map was its own cube rendered with WebGL on an older laptop) the project was not feasible. 