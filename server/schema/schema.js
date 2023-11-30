// const { clients, projects } = require('../sampleData')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql') 

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
                return Client.findById(args.id)
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
               return Project.findById(args.id)
            }
        }
    }
})

// Mutations

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addClient:{
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const newClient = Client.create({    
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return newClient
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Project.deleteMany({clientId: args.id}).then(() => {
                    return Client.findByIdAndDelete(args.id)
                })
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': {value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        },
                    }),
                    defaultValue: 'Not started',
                },
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const newProject = Project.create({    
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                })
                return newProject
            }
        },
        deleteProject:{
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Project.findByIdAndDelete(args.id)
            }
        },
        updateProject:{
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': {value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        },
                    })
                }
            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name: args.name,
                            description: args.description,
                            status: args.status
                        },
                    },
                    // the new here is to return thw modified document if new is false will return thw old document
                    {new: true}
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutations

})