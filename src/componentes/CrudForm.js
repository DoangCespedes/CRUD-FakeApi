import React, { useEffect, useState } from 'react';

const initailForm = {
    id: null,
    name: '',
    race: ''
}

export const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {
    const [form, setForm] = useState(initailForm);

    useEffect(() => {
        if (dataToEdit) {
          setForm(dataToEdit);
        } else {
          setForm(initailForm);
        }
      }, [dataToEdit]);
    
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.race) {
            alert('Datos incompletos')
            return
        }
        if (form.id === null) {
            createData(form);
        }else {
            updateData(form);
        }
        handleReset();
    }
    const handleReset= (e) => {
        setForm(initailForm);
        setDataToEdit(null);
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            />
            <input
            type="text"
            name="race"
            placeholder="Race"
            onChange={handleChange}
            value={form.race}
            />
            <input 
                type="submit" 
                value="Enviar"
                onClick={handleSubmit} 
                onChange={handleSubmit}/>
            <input 
                type="reset" 
                value="Limpiar" 
                onClick={handleReset} 
                onChange={handleReset}/>
        </form>

    </div>
  )
}
