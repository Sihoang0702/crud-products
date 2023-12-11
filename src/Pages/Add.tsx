import {  useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom"

const Add = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {mutate} = useMutation({
      mutationFn: async(products: {name: string, price: number}) => {
        try {
          const response = await axios.post(`http://localhost:3000/products`, products)
          return response.data
        } catch (error) {
          console.log(error)
        }       
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["PRODUCTS"]
        })
        navigate("/products")
        alert("Bạn đã thêm sản phẩm thành công")
        reset()
    }
  })  
  const {register, handleSubmit, formState: {errors}, reset} =useForm({
    defaultValues:{
      name: "",
      price: 0
    }
  })
  const onSubmit: SubmitHandler<{name: string, price:number}> = (data) => {
    mutate(data)
  }
  return (
    <div>
     
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="form-label">Tên sản phẩm</div>
        <input className="form-control"
         type="text" {...register('name' , { required: "Tên sản phẩm là bắt buộc" })} placeholder="tên sp" />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <div className="form-label">Giá sản phẩm</div>
        <input className="form-control" type="text" {...register('price', { required: "Giá sản phẩm là bắt buộc" } )} 
        placeholder="giá sp" />
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
      </div>
      <button className="btn btn-primary">Submit</button>

      </form>
      
     
    </div>
  )
}

export default Add