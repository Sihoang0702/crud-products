import React from 'react'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

const List = () => {
    const QueryClient = useQueryClient()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["PRODUCTS"],
        queryFn: async () => {
           try {
            const respone = await axios.get("http://localhost:3000/products")
            return respone.data
           } catch (error) {
            console.log(error)
           }
        }
    })
    const {mutate} = useMutation({
        mutationFn: async(id: number) => {
            try {
                const responese = await axios.delete(`http://localhost:3000/products/${id}`)
                return responese.data
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({
                queryKey: ["PRODUCTS"]
            })
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    const removeProduct = (id:number) => {
        mutate(id)
    }
   
    return (
        <div>
            <Link to="/products/add" >Add Product</Link>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data?.map((product: {id?: number | undefined, name: string, price: number}, index: number ) => (
                    <tr key={product?.id}>
                        <td>{index + 1}</td>
                        <td>{product?.name}</td>
                        <td>{product?.price}</td>
                        <td>
                           <Link to={`/products/${product.id}/edit`}> <button className='btn btn-warning' >Edit</button></Link>
                            <button className='btn btn-danger'
                             onClick={() => window.confirm("Bạn có muốn xóa sp ko?") &&  removeProduct(product.id!)}>Delete</button>
                        </td>
                    </tr>
))}
                </tbody>
            </table>
            
        </div>
    )
}

export default List