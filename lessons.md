# Lessons learned during in this project:

1. In React, we prefer to use `useRef` instead of `document.getElementById()` because the latter accesses the DOM element **_before_** rendering, which will render them `null`
