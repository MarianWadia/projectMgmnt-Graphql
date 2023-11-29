const { clients, projects } = require('../sampleData')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql') 

const Client = require('../models/Client')
const Project = require('../models/Project')

//* Each table or model should have a type as a GraphQLObjectType that has properties: name and fields where fields is a function 
//* that returns the model actual fields and each field will be associated with its type 

const ClientType = new GraphQLObjectType({
    name: 'client',
    fields: ()=>({
        // Those fields should have the same name as the fields name in the model
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        email: {type: GraphQLString}
    })
})


const ProjectType = new GraphQLObjectType({
    name: 'project',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
})


// RootQueryObject to make requests like getting a client by its id

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allClients: {
            type: new GraphQLList(ClientType),
            resolve(){
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            // args are like the params
            args: {id: { type: GraphQLID}},
            // The resolve is the function where you put what you want to do for a request and what to be returned
            resolve(parent, args){
                Client.findById(args.id)
                    .then((client)=>{
                        return client
                    }).catch((error)=>{
                        console.error(error)
                    })
                }
        },
        allProjects:{
            type: new GraphQLList(ProjectType),
            resolve(){
                return Project.find()
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                Project.findById(args.id)
                    .then((project)=>{
                        return project
                    }).catch((error)=>{
                        console.error(error)
                    })
            }
        }
    }
})

// Mutations

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addClient:{},
        addProject: {}
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutations: mutations

})