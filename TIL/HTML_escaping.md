
## HTML 문자 escaping / unescaping

```jsx
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

function escapeHtml(string) {
  let escaping = String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
  
  console.log(escaping);
}

var a = "&&&&&&&"
escapeHtml(a); // "&amp;&amp;&amp;&amp;&amp;&amp;&amp;"

function unEscapeHtml(string) {
  let unEscaping = string
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x60;/g, "`")
    .replace(/&#x3D;/g, "=")
    .replace(/_style_/g, "style");
  
  console.log(unEscaping)
}

unEscapeHtml(a); // "&&&&&&&"

```
