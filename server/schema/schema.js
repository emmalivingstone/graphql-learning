const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,
          GraphQLInt, GraphQLList } = graphql;

// dummy data
var books = [
  { name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '3'},
  { name: 'Game of thrones', genre: 'Fantasy', id: '2', authorId: '2'},
  { name: 'A Clash of Kings', genre: 'Fantasy', id: 4, authorId: '2'},
  { name: 'The Winds of Winter', genre: 'Fantasy', id: 5, authorId: '2'},
  { name: 'Actual air', genre: 'Poetry', id: '3', authorId: '1'},
  { name: 'The Portable February', genre: 'Poetry', id: '6', authorId: '1'}
];

var authors = [
  { name: 'David Berman', age: 52, id: '1'},
  { name: 'George R R Martin', age: 70, id: '2'},
  { name: 'Patrick Rothfuss', age: 46, id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { type: AuthorType, resolve (parent, args) {
      console.log(parent);
      return _.find(authors, { id: parent.authorId });
    } }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});