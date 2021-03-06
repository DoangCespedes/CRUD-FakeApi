import React from 'react'
import { CrudTableRow } from './CrudTableRow'

export const CrudTable = ({data, setDataToEdit, deleteData }) => {
  return (
    <div>
        <h3>Tabla de datos</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Race</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((el) => (
                    <CrudTableRow
                        key={el.id}
                        el={el}
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData}
                    />
                    ))
                ) : (
                    <tr>
                    <td colSpan="3">Sin datos</td>
                    </tr>
                )}
            </tbody>
        </table>

    </div>
  )
}
