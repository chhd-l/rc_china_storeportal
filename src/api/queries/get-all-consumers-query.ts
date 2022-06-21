export const getAllConsumersQuery = `
  query getAllConsumers($offset: Int = 50){
    consumers(offset: $offset) {
      name
    }
  }
`