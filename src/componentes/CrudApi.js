import React, { useEffect, useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import { CrudForm } from './CrudForm';
import { CrudTable } from './CrudTable';
import { Loader } from './Loader';
import { Message } from './Message';

export const CrudApi = () => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5000/Personajes";

    useEffect(() => {
      api.get(url).then((res) => {
        // console.log(res)
        if (!res.err) {
          setDb(res);
          setErr(null);
        }else {
          setDb(null);
          setErr(res);
        }

        setLoading(false);
      });
    }, [])
    

    const createData = (data) =>{
        data.id = Date.now();
        // console.log(data);

        let options = {
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };

        api.post(url, options).then((res) =>{
          console.log(res);
          if (!res.err) {
            setDb([...db,res]);
          }else{
            setErr(res);
          }
        })
    }
    const updateData = (data) =>{
        let endpoint = `${url}/${data.id}`;
        // console.log(endpoint);

        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };

        api.put(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = db.map((el) => el.id === data.id ? data : el);
            setDb(newData);
          }else { 
            setErr(res);
          }
        });
    };
    const deleteData = (id) => {
      let isDelete = window.confirm(
        `¿Estás seguro de eliminar el registro con el id '${id}'?`
      );
  
      if (isDelete) {
        let endpoint = `${url}/${id}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
  
        api.del(endpoint, options).then((res) => {
          //console.log(res);
          if (!res.err) {
            let newData = db.filter((el) => el.id !== id);
            setDb(newData);
          } else {
            setErr(res);
          }
        });
      } else {
        return;
      }
    };
    
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
            {loading && <Loader/>}
            {err && (
              <Message
                msg={`Error ${err.status}: ${err.statusText}`}
                bgColor="#dc3545"
              />
            )}
            {db && <CrudTable 
                data={db}  
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}  
            />}
        </article>
    </div>
  )
}
