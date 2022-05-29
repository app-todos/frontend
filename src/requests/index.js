import axios from '@/axios'

class Requests {

  static async register( body = {}, options = {} ) {
    return axios.post( '/register', body, options )
  }

  static async login( body = {}, options = {} ) {
    return axios.post( '/login', body, options )
  }
}

export default Requests