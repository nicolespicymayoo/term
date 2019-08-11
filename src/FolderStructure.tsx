type Link = {
  type: "link"
  name: string
  link: string
}

type File = {
  type: "file"
  name: string
  value: string
}

export type Folder = {
  type: "folder"
  name: string
  children: Array<Folder | File | Link>
}

let folder = (name: string, children: Folder["children"]): Folder => ({
  type: "folder",
  name,
  children
})

let file = (name: string, value: string): File => ({
  type: "file",
  name,
  value
})

let link = (name: string, link: string): Link => ({ type: "link", name, link })

export const rootFolder = folder("root", [
  file(
    "about",
    "Hi! Welcome to my terminal ✨ I'm Nicole, and I am a self-taught frontend engineer. I love to build beautiful, performant web applications with clean UIs.   Check out the tech I ♥ by typing ‘stack’"
  ),
  file(
    "stack",
    "TypeScript \xa0\xa0\xa0\n React \xa0\xa0\xa0 JavaScript(ES6+)\xa0\xa0\xa0 Express \xa0\xa0\xa0 Node.js  SCSS \xa0\xa0\xa0 Styled Components \xa0\xa0 GraphQL PostgreSQL \xa0\xa0\xa0 RESTful APIs"
  ),
  folder("links", [
    link("github", "https://github.com/nicolespicymayoo"),
    link("linkedin", "https://www.linkedin.com/in/nicolemayo/"),
    link("resume", "https://docs.google.com/document/d/18XCQXKdznDblhhaCx28X90pJGHRPXu1UYd73egkSJLE/edit"),
    link("twitter", "https://twitter.com/spicyasianmayo?lang=en")
  ]),
  file("email", "hellonicolemayo@gmail.com")
])
