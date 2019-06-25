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
           "Hi! Welcome to my terminal. I'm Nicole, and I am a self-taught front-end engineer. I wanted to follow my interest in technology, so I quit the hospitality industry, co-founded a startup, and learned to code along the way. I love to build beautiful, performant applications with clean UIs. Check out the tech I ♥ by typing ‘stack’."
         ),
         file(
           "stack",
           "TypeScript \xa0\xa0\xa0 React \xa0\xa0\xa0 JavaScript(ES6+)\xa0\xa0\xa0 Express \xa0\xa0\xa0 SCSS \xa0\xa0\xa0 Git \xa0\xa0\xa0 Styled Components \xa0\xa0\xa0PostgreSQL \xa0\xa0\xa0 RESTful APIs"
         ),
         folder("links", [
           link("github", "https://github.com/nicolespicymayoo"),
           link("linkedin", "https://www.linkedin.com/in/nicolemayo/"),
           link("resume pdf", "https://nmyo.co"),
           link("twitter", "https://twitter.com/spicyasianmayo?lang=en")
         ]),
         file(
           "resume",
           `Summary ------------------------------- </br>
           Front end engineer with experience in the full lifecycle of building applications. Co-founded a web-based startup where I taught myself how to code. Proficient working across the stack and adopting new technologies quickly. Strong sense of UI design. Knowledge of core data structures and algoritlms. Supportive and enthusiastic team player. Eager to learn new technologies. </br>
           
           </br>
           Technical Skills ------------------------  </br>
           React \xa0\xa0 TypeScript \xa0\xa0 JavaScript(ES6+) \xa0\xa0 Express \xa0\xa0 HTML \xa0\xa0 CSS/SCSS\xa0\xa0RESTful APIs</br>
           </br>
           Experience ------------------------  </br>
           * Co-founder, Quesly.com </br>
           * Freelance work, contributed software engineering expertise to build websited for clients. Communicated with clients to understand visions. Took responsibility for the full application, from design to deployment. </br>
           ** Much of my experience is through self-learning and personal projects. I taught myself computer science fundamentals - like data structures and algoritms - with the abundant resources online. Some of my personal projects include: Trello (kanban) service, Conway's Game of Life, personal websites, and an app that helps people food allergies find restaurants. Please check out my github for more information. (type 'cd links' then 'github'.</br>
           `
         ),
         file("email", "hellonicolemayo@gmail.com")
       ])