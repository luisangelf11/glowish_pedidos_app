import React, { useEffect, useState } from 'react'
import MenuAdmin from '../../components/MenuAdmin'
import { Toaster, toast } from 'react-hot-toast'
import TableComments from './TableComments'
import { deleteComment, getComments, getCommentsForIdProduct } from '../../api/comments'
import { useAuthContext } from '../../context/authContext'

export default function CommentsPage() {
  const [form, setForm] = useState({ filter: "" })
  const [data, setData] = useState([])
  const {user} = useAuthContext()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const getData = async () => {
    try {
      const res = await getComments()
      console.log(res.data)
      setData(res.data)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const getFilter = async (id_producto) => {
    try {
      const res = await getCommentsForIdProduct(id_producto, 100,0)
      console.log(res.data)
      setData(res.data)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  
  useEffect(() => {
    if (form.filter === "") getData()
    
    else   getFilter(form.filter) 
  }, [form.filter])

  const deleteData = async (id) => {
    try {
      let answer = confirm("¿Deseas eliminar este comentario?")
      if (answer === true) {
        await deleteComment(id, user.Token)
        toast.success(`El comentario con Id ${id} fue eliminado correctamente`);
        getData();
        setForm({ filter: '' });
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

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
              Control De Comentario
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
        <TableComments tableHead={["Id", "Comentario", "Fecha", "Id_Producto", "Id_Usuario", "Acciones"]} data={data} deleteData={deleteData}  />
      </section>
      <Toaster position="top-center" />
    </section>
  )
}
