import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'

function AddProductForm() {
    
    const [category, setcategory] = useState([])
    const [categoryId, setcategoryId] = useState([])
// use efffect 
    useEffect(() => {
        axios.get("https://northwind.vercel.app/api/categories")
            .then(res =>setcategory(res.data))
    }, [])
// formik
    const formik = useFormik({
        initialValues: {
          category: '',
          name: '',
          UnitPrice:"",
          UnitStock:"",
          discounted:"",
          quantitiy:"",
          categoryId:"",
        },
        onSubmit: values => {
            axios
            .post("https://northwind.vercel.app/api/products", values)
            .then(() => {
              alert("send")
            })},
      });
    return (
        <>
            <h1>Add Product Form</h1>
            <form className='container'  onSubmit={formik.handleSubmit} >
                <label>category</label>
                <select id="category" onChange={formik.handleChange} onInput={(e)=>{setcategoryId((category.find(item=>(item.name === e.target.value))).id)}} value={formik.values.category} >
                    {category && category.map(item => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                </select>
                <label htmlFor="categoryId">categoryId</label>
                <input id="categoryId" name="categoryId" type="text"  onChange={formik.handleChange} value={formik.values.categoryId = categoryId}></input>
                <hr/>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text"  onChange={formik.handleChange} value={formik.values.name}/>
                <hr/>
                <label htmlFor="UnitPrice">UnitPrice</label>
                <input id="UnitPrice" name="UnitPrice" type="text" onChange={formik.handleChange} value={formik.values.UnitPrice}/>
                <hr/>
                <label htmlFor="UnitStock">UnitStock</label>
                <input id="UnitStock" name="UnitStock" type="text" onChange={formik.handleChange} value={formik.values.UnitStock}/>
                <hr/>
                <label htmlFor="discounted">discounted</label>
                <input id="discounted" name="discounted" type="checkbox" onChange={formik.handleChange} value={formik.values.discounted}/>
                <hr/>
                <label htmlFor="quantitiy">quantitiy per unit</label>
                <input id="quantitiy" name="quantitiy" type="text" onChange={formik.handleChange} value={formik.values.quantitiy}/>
                <hr/>
                <button type="submit">Submit</button>
            </form>

        </>
    )
}

export default AddProductForm