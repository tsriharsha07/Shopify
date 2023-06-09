import React,{useEffect} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layouts/Loader'
import { getAdminProducts,clearErrors,deleteProduct } from '../../actions/productActions'
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constsants/productConstants' 


const ProductsList = () => {
    const alert=useAlert()
    const dispatch=useDispatch();
    const {loading,error,products}=useSelector(state=>state.products)
    const {error:deleteError,isDeleted}=useSelector(state=>state.product)
    const navigate=useNavigate()
    useEffect(()=>{
        
        dispatch(getAdminProducts())
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        if(deleteError){
            alert.error(error)
            dispatch(clearErrors)
        }
        if(isDeleted){
            alert.success('Product Deleted Successfully')
            navigate('/admin/products')
            dispatch({type:DELETE_PRODUCT_RESET})
        }
    },[dispatch,alert,error,isDeleted,deleteError,navigate])
    const setProducts=()=>{
        const data={
            columns:[
                {
                    label:' ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Price',
                    field:'price',
                    sort:'asc'
                },
                {
                    label:'Stock',
                    field:'stock',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    
                }
            ],
            rows:[]
        }
        products.forEach(product=>{
            data.rows.push({
                id:product._id,
                name:product.name,
                price:`$${product.price}`,
                stock:product.stock,
                actions:
                <>
                    
                    <button className='btn btn-danger py-1 px-2 ml-1' onClick={()=>deleteProductHandler(product._id)}>
                    <i className='fa fa-trash'></i>
                    </button>
                    </>
            })
        })
        return data;
    }
    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id))
    }


  return (
    <div>
        <MetaData title={'All Products'}/>
      <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            <>
                <h1 className='my-5'> All Products</h1>
                {loading?<Loader/>:(
                    <MDBDataTable
                    data={setProducts()}
                    className='px-3'
                    striped
                    bordered
                    hover
                    />
                )}
            </>
        </div>
      </div>
    </div>
  )
}

export default ProductsList
