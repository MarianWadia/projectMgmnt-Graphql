import { gql } from "@apollo/client";


const GET_PROJECTS = gql`
    query getProjects{ 
        allProjects{
            id
            status
            description
            name
        }
    }
`

const GET_PROJECT = gql`
    query getProject($id: ID!){
        project(id: $id){
            name
            description
            status
            client{
                id
                name
                phone
                email
            }
        }
    }
`


export { GET_PROJECTS, GET_PROJECT }