 import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"

const Edit = () => {
  const {id} = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues:{
      name: "", 
      price: 0
    }
  })
  const {mutate} = useMutation({
      mutationFn: async(products: {id?:number, name: string, price: number}) => {
        try {
          const response = await axios.patch(`http://localhost:3000/products/${products.id}`, products)
          return response.data
        } catch (error) {
          console.log(error)
        }       
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: ["PRODUCTS"]
        })
        navigate("/products")
        alert("Bạn đã cập nhật sản phẩm thành công")
        reset(data)
    }
  })  

  const {data, isLoading, isError} = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async() => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  })
  const onSubmit: SubmitHandler<{name: string, price:number}> = (product) => {
    mutate({ id: data?.id, ...product })
    // console.log(data)
  }
  useEffect(() => {
    reset({
      name: data?.name,
      price: data?.price 
    })
  }, [id, data])  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <div>
     
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="form-label">Tên sản phẩm</div>
        <input className="form-control" type="text"
        defaultValue={data?.name}
        {...register('name') } placeholder="tên sp" />
      </div>
      <div className="form-group">
        <div className="form-label">Giá sản phẩm</div>
        <input className="form-control" type="text"
        defaultValue={data?.price}
        {...register('price') } placeholder="giá sp" />
      </div>
      <button className="btn btn-primary">Submit</button>

      </form>
      
     
    </div>
  )
}

export default Edit