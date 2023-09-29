import {createColumnHelper } from "@tanstack/react-table"
import { AsyncTable } from '../asyncTable/AsyncTable'
import { RiInformationFill } from "react-icons/ri";
import noImg from '../../assets/img/not-img.jpg'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { useEffect, useState } from "react";
import { getCompanyEmployes } from "../../services/companies.service";

export const EmployeCompanyTable = ({data, searchLabel, companyId}) => {

  const [employes, setEmployes] = useState([])
  const {callEndpoint} = useFetchAndLoad()
  const columnHelper = createColumnHelper()

  const getData = async () => {
    try {
      let response = await callEndpoint(getCompanyEmployes(companyId))
      setEmployes(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])

  const columns = [
    columnHelper.accessor('id', {
      header: () => <span>Id</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('get_full_name', {
      header: () => <span>Nombre</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('url_img', {
      header: () => <span>Imágen</span>,
      cell: info => {
        if (info.getValue() !== '') {
          return (
            <picture className="logo_company">
              <img src={`http://localhost:8000${info.getValue()}`} />
            </picture>
          )
        } else {
          return (
            <picture className="logo_company">
              <img src={noImg} />
            </picture>
          )
        }
      },
      footer: info => info.column.id
    }),
    columnHelper.accessor('gender', {
      header: () => <span>Genero</span>,
      cell: info => {
        if(info.getValue() === 'M') {
          return (<p className="text-blue-700">Masculino</p>)
        }
        return (<p className="text-pink-800">Femenino</p>)
      },
      footer: info => info.column.id
    }),
    columnHelper.accessor('job_position', {
      id: info => info.getValue().id,
      header: () => <span>Puesto</span>,
      cell: info => <p>{`${info.getValue().name}`}</p>,
      footer: info => info.column.id
    }),
    columnHelper.accessor('job_position', {
      header: () => <span>Salario Base</span>,
      cell: info => <p>{`Q. ${info.getValue().salary}`}</p>,
      footer: info => info.column.id
    }),
    // columnHelper.accessor('Acciones', {
    //   header: () => <span>Acciones</span>,
    //   cell: info => <div className="flex gap-3">{detailCompanyBtn(info)}{printNominaBtn(info)}</div>,
    //   footer: info => info.column.id
    // }),
  ]

  return (
    <AsyncTable columns={columns} data={employes}  label="Buscar Empleado..!" />
  )
}
