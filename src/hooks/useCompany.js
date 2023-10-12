import { useEffect, useState } from "react"
import { useFetchAndLoad } from "./useFetchAndLoad"

export const useCompany = () => {

  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState({})

  const {isLoading, callEndpoint} = useFetchAndLoad()

  const getOneCompany = async(id) => {
    try {
      let response = await callEndpoint(getOneCompany(id))
      setCompany(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    companies,
    company,
    getOneCompany
  }
}