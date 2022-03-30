import React, { useState } from 'react';
import { CrudForm } from './CrudForm';
import { CrudTable } from './CrudTable';

const initialDB = [
    {   id: 1,
        name: 'Goku',
        race: 'Sayayin'  
    },

    {   id: 2,
        name: 'krillin',
        race: 'human'  
    },

    {   id: 3,
        name: 'Picolo',
        race: 'Nameku'  
    },

    {   id: 4,
        name: '18',
        race: 'Androide'  
    },

    {   id: 5,
        name: 'Vegetta',
        race: 'Sayayin'  
    },

    {   id: 6,
        name: 'Kaiosama',
        race: 'Kaio'  
    },
]

export const CrudApp = () => {
    const [db, setDb] = useState(initialDB);
    const [dataToEdit, setDataToEdit] = useState(null)

    const createData = (data) =>{
        data.id = Date.now();
        console.log("CreateData",data);
        setDb([...db, data]);
    }
    const updateData = (data) =>{
        let newData = db.map((el)=> (el.id === data.id? data : el));
        setDb(newData); 
    }
    const deleteData = (id) =>{
        let isDelete = window.confirm(
            `Estas seguro de eliminar el registro con el id ${id} ?`
        );
    
        if (isDelete) {
            let newData = db.filter((el)=> el.id !== id);
            setDb(newData)
        }else{
            return;
        }
    }
    
  return (
    <div>
        <h3>{dataToEdit? "Editar" : "Agregar"} </h3>
        <article className="grid-1-2">
            <CrudForm 
                createData={createData} 
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
            />
            <CrudTable 
                data={db}  
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}  
            />
        </article>
    </div>
  )
}
