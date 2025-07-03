# Lessons learned during in this project:

1. In React, we prefer to use `useRef` instead of `document.getElementById()` because the latter accesses the DOM element **_before_** rendering, which will render them `null`

2. If you want a particular state to persist _*even after page refresh*_ Simpy save it to `localStorage`

   - instead of `const [item, setItem] = useState(value)`, you simply do this:

   - Load from `localStorage`:

   ```
      const [item, setItem] = useState(() =>{
        // loading from storage:
        const stored = localStorage.getItem("valueName")
        return stored ? JSON.parse(stored) : "empty state of valueName" // <- could be an empty array [], string "", etc.
        });
   ```

   - Saving state to storage:

   ```
   useEffect(()=> {
    localStorage.setItem(JSON.stringfy(item));
   }, [item]);
   ```

3. When making updatable elements, **_always_** let React do the updates. For example, instead of `element.classList.toggle()`, add or remove the class based on a React state.
