const express = require("express")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const bodyarser = require("body-parser")
const cors = require("cors")
const axios = require("axios")
const typeDefs = require("./schema")
const db = require("./_db")
async function startServer() {
    const app = express()
    const resolvers = {
        Query: {
            games() {
                return db.games
            },
            authors() {
                return db.authors;
            },
            reviews() {
                return db.reviews
            },
            review(_, args) {
                return db.reviews.find((review) => review.id == args.id);
            },
            game(_, args) {
                return db.games.find((game) => game.id == args.id)
            },
            author(_, args) {
                return db.authors.find((auth) => auth.id == args.id)
            }
        },
        Game: {
            reviews(parent) {

                return db.reviews.filter((r) => r.game_id === parent.id)
            }
        },
        Author: {
            reviews(parent) {
                return db.reviews.filter((r) => r.author_id === parent.id)
            }
        },
        Review:{
            games(parent) {

                return db.games.find((r) => r.id=== parent.game_id)
            },
            authors(parent) {

                return db.authors.find((a) => a.id === parent.author_id)
            }
        },
        Mutation:{
            deleteGame(_,args)
            {
                db.games=db.games.filter((g)=>g.id != args.id)
                return db.games
            },
            addGame(_,args)
            {
                let game ={
                    ...args.games,
                    id:Math.floor(Math.random()*10000).toString()
                }
                db.games.push(game)
                return game;
            },
            updateGame(_,args)
            {
                db.games=db.games.map((g)=>{
                    if(g.id === args.id){
                        return {...g,...args.edit}
                    }
                    return g
                })
                return db.games.find((g)=>g.id === args.id)
            }
        }
    }
    const server = new ApolloServer({
        //     typeDefs: `
        //     type User {
        //         id: ID!,
        //         name: String!,
        //         email: String!
        //     }
        //     type Todo {
        //         id: ID!,
        //         title: String!,
        //         completed: Boolean,
        //         userId:ID!
        //         user:User 
        //     }
        //     type Query {
        //         getTodos: [Todo],
        //         getAllUser: [User]
        //         getUser(id:ID!):User
        //     }
        // `,
        //     resolvers: {
        //         Todo: {
        //             user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
        //         },
        //         Query: {
        //             getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
        //             getAllUser: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
        //             getUser: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
        //         }
        //     }
        typeDefs,
        resolvers
    });
    app.use(bodyarser.json())
    app.use(cors())

    await server.start();
    app.use("/graphql", expressMiddleware(server))
    app.listen(8000, () => console.log("Server Started at the port 8000"))

}
startServer()