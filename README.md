# jquery.fullBleed

Scales an image to take up the entire browser window.

## Usage

```javascript
$('img').fullBleed();
```

## Progressive Enhancement

For modern browsers, the img elements are converted to divs with a background image so they can take advantage of the CSS3 “background-size: cover“ property.

IE 7/8 leave the img elements in place and use javascript to do the scaling.

## Options

### Alignment

The alignment of the image can be changed with the `align` property:

```javascript
$('img').fullBleed({ align: 'top left' });
```

Possible values for `align` are:

- top left
- top center
- top right
- center left
- center center (this is the default)
- center right
- bottom left
- bottom center
- bottom right

### Element Class

An optional class can be added to the targeted elements, which can be useful when referencing the images in CSS, because the img elements are converted to divs for modern browsers.

```javascript
$('img').fullBleed({ className: 'img' });
```