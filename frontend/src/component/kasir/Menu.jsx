import React, { useEffect, useState } from "react";
import axios from "axios";

function splitPath(path) {
    const respath = path.split('\\')
    return respath[0] + "/" + respath[1] + "/" + respath[2]
}

export default function Menu() {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        const fecthAllMenu = async () => {
            try {
                const res = await axios.get("http://localhost:8080/menu/")
                console.log(res)
                setMenu(res.data.menu)
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllMenu()
    }, [])

    return (
        <div>
            <div>
                <h6 className="mt-6 ml-5 text-4xl font-sans font-semibold">Makanan</h6>
                <div className="flex flex-wrap gap-5 mt-5 ml-5">
                    {menu.map((menu, index) => {
                        if (menu.jenis == 'makanan') {
                            return (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                    <img className="w-80 h-60 p-8 rounded-t-lg" src={`http://localhost:8080/${splitPath(menu.gambar)}`} alt="product image" />
                                    <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{menu.nama_menu}</h5>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900">{menu.harga}</span>
                                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <h6 className="mt-6 ml-5 text-4xl font-sans font-semibold">Minuman</h6>
                <div className="flex flex-wrap gap-5 mt-5 ml-5">
                    {menu.map((menu, index) => {
                        if (menu.jenis == 'minuman') {
                            return (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                    <img className="w-80 h-60 p-8 rounded-t-lg" src={`http://localhost:8080/${splitPath(menu.gambar)}`} alt="product image" />
                                    <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{menu.nama_menu}</h5>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900">{menu.harga}</span>
                                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}