import React, { useEffect, useState } from 'react'
import MenuAdmin from '../../components/MenuAdmin'
import TableContent from './TableUsers';
import { Toaster, toast } from 'react-hot-toast'
import { getFilterUsers, getUsers } from '../../api/user';

export default function UserPage() {
    const [form, setForm] = useState({ filter: '' })
    const [data, setData] = useState([])
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const getData = async () => {
        try {
            const res = await getUsers(10, 0)
            console.log(res.data)
            setData(res.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getFilter = async (correo) => {
        try {
            const res = await getFilterUsers(correo)
            console.log(res.data)
            setData(res.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    useEffect(() => {
       if(form.filter==="") getData()
       else getFilter(form.filter)
    }, [form.filter])
    return (
        <section className="flex h-screen">
            <MenuAdmin />
            <section style={{ width: "86%" }}
                className="bg-gray-100 ml-auto gap-2 flex flex-col items-center">
                <div
                    className="flex justify-around p-2 scale-up-center"
                    style={{ width: "100%" }}
                >
                    <div className="flex flex-col w-2/3">
                        <h2 className="text-left p-2 uppercase text-red-500 font-bold text-xl text-center">
                            Lista De Usuarios
                        </h2>
                        <form
                            className="bg-white border rounded-xl"
                            style={{ width: "90%" }}
                        >
                            <i className="fas fa-search p-2 text-red-400"></i>
                            <input
                                type="text"
                                name="filter"
                                placeholder="Buscar..."
                                className="outline-none text-sm w-11/12"
                                value={form.filter}
                                onChange={handleChange}
                            />
                        </form>
                    </div>

                </div>
                <TableContent tableHead={["Id", "Avatar", "Correo", "Nombre Completo", "Dirección", "Tel éfono"]} data={data} />
            </section>
            <Toaster position="top-center" />
        </section>
    )
}
