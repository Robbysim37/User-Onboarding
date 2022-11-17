import React, {useState,useEffect} from "react"
import styled from "styled-components"
import * as yup from "yup"
import axios from "axios"

const FormStyles = styled.form`
display: flex;
flex-direction: column;
width: 20vw;
margin:auto;
`
const ErrorStyles = styled.div`
color:red;
font-size:2rem;
margin:auto;
`

const schema = yup.object().shape({
fName: yup.string().required("First name is required."),
lName: yup.string().required("Last name is required."),
email: yup.string().email("Please input a valid email").required("Email is required."),
password: yup.string().required("Password is required."),
tos: yup.boolean().oneOf([true],"You must accept the terms of service")
})

const Form = (props) => {
    const [formBuilder,setFormBuilder] = useState({fName:"",lName:"",email:"",password:"",tos:false})
    const [errors,setErrors] = useState({fName:"",lName:"",email:"",password:"",tos:false})
    const [disabled,setDisabled] = useState(true)

    const errorHandler = (name,value) => {
        yup.reach(schema,name).validate(value)
        .then(()=> setErrors({...errors,[name]:""}))
        .catch((err) => setErrors({...errors,[name]:err.errors[0]}))
    }

    const formChange = (e) => {
        const {checked,value,name,type} = e.target
        const valueToUse = type === "checkbox" ? checked : value
        errorHandler(name,valueToUse)
        setFormBuilder({...formBuilder, [name]:valueToUse})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const formCleanup = {
            fName:formBuilder.fName.trim(),
            lName:formBuilder.lName,
            email:formBuilder.email,
            password:formBuilder.password,
            tos:formBuilder.tos
        }
        axios.post("https://reqres.in/api/users",formCleanup)
        .then(res => {
            console.log("Data has been pushed!")
            props.setUserList([...props.userList,res.data])
            setFormBuilder({fName:"",lName:"",email:"",password:"",tos:false})
        })
    }

    useEffect(() => {
        schema.isValid(formBuilder).then(res => {setDisabled(!res)})
    },[formBuilder])

    return(<div>
        <ErrorStyles>
        {errors.fName && <div>{errors.fName}</div>}
        {errors.lName && <div>{errors.lName}</div>}
        {errors.email && <div>{errors.email}</div>}
        {errors.password && <div>{errors.password}</div>}
        {errors.tos && <div>{errors.tos}</div>}
        </ErrorStyles>
        <FormStyles onSubmit={submitHandler}>
            <label>First Name: 
                <input onChange={formChange} name="fName" type="text" value={formBuilder.fName}></input>
            </label>
            <label>Last Name: 
                <input onChange={formChange} name="lName" type="text" value={formBuilder.lName}></input>
            </label>
            <label>Email: 
                <input onChange={formChange} name="email" type="text" value={formBuilder.email}></input>
            </label>
            <label>Password: 
                <input onChange={formChange} name="password" type="text" value={formBuilder.password}></input>
            </label>
            <label>Accept Terms of Service: 
                <input onChange={formChange} name="tos" type="checkbox" checked={formBuilder.tos}></input>
            </label>
            <button disabled={disabled} type="submit">Submit</button>
        </FormStyles>
        </div>
    )
}

export default Form