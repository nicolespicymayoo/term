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
           "Hi! Welcome to my terminal. I'm Nicole, and I am a self-taught front end engineer. I quit the hospitality industry and learned how to code while starting a startup. I love to build beautiful, performant apps with clean design. Check out the tech I ♥ by typing ‘stack’."
         ),
         file(
           "stack",
           "TypeScript \xa0\xa0\xa0 React\xa0\xa0\xa0 JavaScript(ES6+)\xa0\xa0\xa0 Express\xa0\xa0\xa0 SCSS\xa0\xa0\xa0 Styled Components"
         ),
         folder("links", [
           link("github", "https://github.com/nicolespicymayoo"),
           link("linkedin", "https://www.linkedin.com/in/nicolemayo/"),
           link("portfolio", "https://nmyo.co"),
           link("twitter", "https://twitter.com/spicyasianmayo?lang=en")
         ]),
         file(
           "resume",
           `Summary ------------------------------- </br>
           Front end engineer with experience in the full lifecycle of building applications. Co-founded a web-based startup where I taught myself how to code. Proficient working across the stack and adopting new technologies quickly. Strong sense of design and UI. Knowledge of core data structures and algoritlms. Supportive and enthusiastic team player. Eager to learn new technologies. </br>
           
           </br>
           Technical Skills ------------------------  </br>
           React \xa0\xa0 TypeScript \xa0\xa0 JavaScript(ES6+) \xa0\xa0 Express \xa0\xa0 HTML \xa0\xa0 CSS/SCSS\xa0\xa0RESTful APIs</br>
           </br>
           Experience ------------------------  </br>
           * Co-founder, Quesly.com </br>
           * Freelance work, contributed software engineering expertise in the development of websites, from requirements definition through successful deployment. Delighted customers with beautiful UIs.</br>
           ** Much of my experience is through self-learning and personal projects. I taught myself computer science fundamentals - like data structures and algoritms - with the abundant resources online. Some of my personal projects include: Trello (kanban) service, Conway's Game of Life, personal websites, and an app to help people with allergies find food, as well as many 'tutorial' projects. Please check out my github for more information. (type 'cd links' then 'github'.</br>
           `
         ),
         file("email", "hellonicolemayo@gmail.com")
       ])