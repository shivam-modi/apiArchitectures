export const resolvers = {
    Query: {
      checkApiStatus: () => {
        return {
          status: "The API is working! 🚀 fine"
        };
      }
    },
    Mutation: {
        testMutations: async () => {
            return {
                status: "The mutation is working! 🚀"
            }   
        }
    }
}