# jquery.fullBleed

Scales an image to take up the entire browser window.

## Usage

```javascript
$('img').fullBleed();
```

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
