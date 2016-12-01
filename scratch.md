The html picture element can be used to select an image based on:

1. media query

2. dpi

3. viewport size

among others.

A `picture` element needs an img fallback within it and src elements which can define a variety of options for loading responsive images within the browser.

Responsive Images from Google:

1. set `width` and `max-width` on the image:

img, embed, video, object {
  max-width: 100%;
}

The width of the image can be set to `50%` which is relative to the parent but can overflow, to avoid this use the `max-width` of `100%`.

---

When you have multiple images based on the `dpi` of the image:

```
<img srcset="photo@2x.png 2x" src="photo.png" />
```

Load a 2x image on a `2x display`.
if a browser has no support for srcset, the default image specified using src is used.

The picture element can be used to load different images based on width of the window.

---

```
<img src="lighthouse.jpg" sizes="50vw" srcset = lighthouse-100.jpg 100w lighthouse-200.jpg 200w lighthouse-400.jpg 400w lighthouse-800.jpg 800w lighthouse-1000.jpg 1000w lighthouse-1400.jpg 1400w lighthouse 1800.jpg 1800w/>
```

800px viewport width means:

size= 400px

100.jpg 0.25x
200.jpg 0.5x
400.jpg 1x
800.jpg 2x
1000.jpg 2.5x
1400.jpg 3.5x
1800.jpg 4.5x

---

sizes accepts media queries and a size can be specified for each media query, an image is loaded based on viewport width, dpi and possibly the connectivity of the user.
