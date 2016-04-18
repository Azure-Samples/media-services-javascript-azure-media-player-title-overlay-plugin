---
services: media-services
platforms: javascript
author: 
---
# Media Services: Title Overlay Plugin for Azure Media Player


##Information
Attributions: 

#Introduction
This plugin overlays text over the player in a configurable position when the viewer hovers over it. If mouse is inactive or located outside the context of the player, the text disappears. 

## Getting Started
Include the plugin CSS/javascript*after* the AMP script in the `<head>` of your html page:

```<link href="amp-titleOverlay" rel="stylesheet">```<br />
```<script src="amp-titleOverlay"></script>```

See example.html for how to enable the plugin 
## Options
Currently supported JSON options: 
"name": "your chosen overlay text",
"horizontal Position": "left", [or center or right] 
"verticalPosition": "top" [or center of bottom]


##To-Do
 