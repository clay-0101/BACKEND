import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name : "products",
    initialState : {
        products : [],
        singleProduct : null,
        showForm : false,
        editProduct : null
    
    },
    reducers : {
        setProducts : (state , action) =>{
            state.products = action.payload
        },
        setSingleProduct : (state, action) => {
            state.singleProduct = action.payload
        },
        setShowForm : (state, action) => {
            state.showForm = action.payload
        } ,
        setEditProduct : (state , action) => {
            state.editProduct = action.payload
        }

    }
})

export const {setProducts, setSingleProduct, setShowForm, setEditProduct} = productSlice.actions
export default productSlice.reducer