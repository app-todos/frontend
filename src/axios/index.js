import { default as Axios } from 'axios'

const apiEndpoint = process.env.VUE_APP_API_ENDPOINT

const axios = Axios.create( {
  baseURL: apiEndpoint
} )

export default axios