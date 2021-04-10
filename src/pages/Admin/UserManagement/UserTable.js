import React, {useContext, useEffect, useState, useMemo} from "react";
import "./table-content.css";
import { Button } from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faInfo, faDownload, faSignature, faEdit} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {useTable, useGlobalFilter, useFilters} from 'react-table';
import ActionButtons from "./ActionButtons";

const UserTable = (props) => {

  const {data, setData, removeData} = props

  const COLUMNS = [
    {
      Header : 'Username',
      accessor : 'username',
    },
    {
      Header : 'Email',
      accessor : 'email',
    },
    {
      Header : 'Nama Lengkap',
      accessor : 'nama_lengkap',
    },
    {
      Header : 'Grup Jabatan',
      accessor : 'group_name',
    },
    {
      Header : 'Jabatan',
      accessor : 'role_name',
    },
    {
      Header : "Actions",
      accessor: "action_buttons",
      Cell : (cell) => {
        return (<ActionButtons
          data={cell.data[cell.row.index]}
          index={cell.row.index}
          setData={setData}
          removeData={removeData}
        />)
      }
    }
  ]

  const columns = useMemo(() => COLUMNS, [])

  const tableInstance = useTable({
    columns,
    data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = tableInstance

  if(!props.data) {
    return null
  }else{
    return (
      <table {...getTableProps()} className={"table-content"}>
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map( column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))
            }
          </tr>
        ))
        }
        </thead>

        <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell)=>(
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })
        }
        </tbody>

        <tfoot>
        {
          footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {
                footerGroup.headers.map(column => (
                  <td {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </td>
                ))
              }
            </tr>
          ))
        }
        </tfoot>
      </table>
    )
  }
}

export default UserTable;
