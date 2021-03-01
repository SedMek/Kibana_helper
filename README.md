# Kibana_helper

A chrome extensions for Kibana

## Usage

This extension uses your clipboard data (only the most recent item in the clipboard) since I did not manage to get the data from the page otherwise.

An alert will popup asking you to allow the extension to use yoour clipboard, you should approve it.

### date formatting

You need to copy text containing the epoch millis date. You can copy more text without impacting the result since the extension maches directly the epochmillis format in the copied text. (doesnt work for dates prior to "2001/11/09").

### Geojson url generation

You need to copy text containing the coordinates of youor area of interest. You can copy more text without impacting the result since the extension maches directly the coordinates in the copied text.
