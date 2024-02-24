import React, { useEffect, useState } from 'react'
import MenuAdmin from '../../components/MenuAdmin'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { createSize, getSize, updateSize } from '../../api/sizes'
import { useAuthContext } from '../../context/authContext'
import {useToken} from '../../hooks/useToken'

export default function FormSize({ edit }) {
    const initialForm = {
        size: '', id_producto: '', estado: ''
    }
    const [form, setForm] = useState(initialForm)
    const { id } = useParams();
    const { user } = useAuthContext();
    const {invalidToken} = useToken();
    const navigate = useNavigate();

    const getDataEdit = async () => {
        try {
            const res = await getSize(id)
            setForm({
                size: res.data.Size,
                id_producto: res.data.Id_Producto,
                estado: res.data.Estado
            });
        } catch (error) {
            toast.error(`${error.response.data.message}`);
        }
    }

    useEffect(() => {
        if (edit === true) getDataEdit();
    }, []
    )

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const validateData = () => {
        if (form.size === "" || form.estado === "" || form.id_producto === "")
            return false;
        else return true;
    }

    const addSize = async () => {
        try {
            if (!validateData()) return toast.error(`Por favor, complete todos los campos`);
            const dataValues = {
                size: form.size,
                id_producto: parseInt(form.id_producto),
                estado: form.estado
            }
            await createSize(dataValues, user.Token);
            toast.success(`¡El size fue creado correctamente!`);
            setForm(initialForm);
        }
        catch (err) {
            if(err.response.status === 401) {
                toast.error(`Acceso denegado, su sesión expiró`);
                invalidToken();
              }else
                toast.error(err.response.data.message);
        }
    }

    const editSize = async () => {
        try {
            const dataValues = {
                size: form.size,
                id_producto: parseInt(form.id_producto),
                estado: form.estado
            }
            await updateSize(id, dataValues,user.Token);
            toast.success(`¡El size fue actualizado correctamente! Redireccionando a sizes.`);
            setTimeout(() => {
                navigate("/sizes");
              }, 3000);
        } catch (error) {
            if(error.response.status === 401) {
                toast.error(`Acceso denegado, su sesión expiró`);
                invalidToken();
              }else
                toast.error(error.response.data.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit === false) addSize();
        else if(edit === true) editSize();
    }

    return (
        <section className="flex h-screen">
            <MenuAdmin />
            <section
                style={{ width: "86%" }}
                className="bg-gray-100 ml-auto gap-2 flex flex-col items-center justify-center">

                <form onSubmit={handleSubmit} className="scale-up-center bg-white w-2/3 shadow rounded-md flex flex-col gap-2 items-center p-2">
                    <h2 className="text-xl font-semibold p-2 text-red-500 uppercase">
                        {edit === false ? "Crear Sizes" : `Editar Sizes #${id}`}
                    </h2>
                    <div className="flex flex-col justify-center gap-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="size"
                                className="text-sm font-bold text-red-400"
                            >
                                Size:
                            </label>
                            <input
                                type="text"
                                name="size"
                                id="size"
                                placeholder="Size"
                                value={form.size}
                                onChange={handleChange}
                                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="id_producto"
                                className="text-sm font-bold text-red-400"
                            >
                                Id_producto:
                            </label>
                            <input
                                type="text"
                                name="id_producto"
                                id="id_producto"
                                placeholder="Id_Producto"
                                value={form.id_producto}
                                onChange={handleChange}
                                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="estado" className="text-sm font-bold text-red-400">Estado:</label>
                            <select
                                name="estado"
                                id="estado"
                                value={form.estado}
                                onChange={handleChange}
                                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
                            >
                                <option value="">--SELECCIONE--</option>
                                <option value="Disponible">Disponible</option>
                                <option value="Agotado">Agotado</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <button className="bg-blue-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-blue-500">
                            <i className="fas fa-save p-1"></i>Guardar
                        </button>
                        <Link
                            to="/sizes"
                            className="bg-red-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-red-500"
                        >
                            <i className="fas fa-hand-point-left p-1"></i>Regresar
                        </Link>
                    </div>
                </form>
                <Toaster position="top-center" />
            </section>
        </section>
    )
}
