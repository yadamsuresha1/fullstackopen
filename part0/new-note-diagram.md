```
sequenceDiagram
    participant b as Browser
    participant s as Server
    b->>s: POST https://studies.cs.helsinki.fi/exampleapp/new_note (Payload: note: suresh)
    activate s
    s-->>b: URL redirect (HTTP status code: 302)
    deactivate s
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate s
    s-->>b: HTML Document
    deactivate s
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate s
    s-->>b: the css file
    deactivate s
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate s
    s-->>b: the javascript file
    deactivate s
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate s
    s-->>b: notes information [...{"content": "suresh","date": "2023-10-20T16:46:51.697Z"}]
    deactivate s

```
