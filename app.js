const Http = require('http');
const express = require("express");
const { GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { graphqlHTTP } = require("express-graphql")
const app = express();
const port = 9797;


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => (
        {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
            class: { type: GraphQLString }
        }
    )
});
const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAll: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve: (root, args, context) => {
                console.log({ root, args, context })
                return [{ id: 1, name: "mandeep", age: 22, class: "8th" }]
            }
        }
    }
});
const schema = new GraphQLSchema({ query: rootQuery });


const server = Http.createServer(app);
app.use("/user",
    graphqlHTTP({
        schema: schema, graphiql: true
    }));

app.use("/chat", graphqlHTTP({ schema, graphiql: true }))
const boot = async () => {
    server.listen(port, () => console.log("server started successfully ....."));

    process.on("uncaughtException", (err) => {
        console.error("An error occurred while listening", err)
    });
    process.on("unhandledRejection", (err) => {
        console.error("An rejection Error", err)
    })
}
boot()