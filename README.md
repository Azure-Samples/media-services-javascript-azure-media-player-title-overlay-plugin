---
page_type: sample
languages:
- javascript
- html
products:
- azure
description: "This plugin overlays text over the player in a configurable position when the viewer hovers over it."
urlFragment: media-services-js-sample-overlay
---


# Media Services: Title Overlay Plugin for Azure Media Player


## Information

Attributions:  Southworks 2016

## Introduction

This plugin overlays text over the player in a configurable position when the viewer hovers over it. If mouse is inactive or located outside the context of the player, the text disappears. 

### Getting Started

Include the plugin CSS/javascript *after* the AMP script in the `<head>` of your html page:

```html
<link href="amp-titleOverlay.css" rel="stylesheet">
<script src="amp-titleOverlay.js"></script>
```

See `example.html` for how to enable the plugin 

### Options

Currently supported JSON options: 

```json
"name": "your chosen overlay text",
"horizontal Position": "left", [or center or right] 
"verticalPosition": "top" [or center of bottom]
```
