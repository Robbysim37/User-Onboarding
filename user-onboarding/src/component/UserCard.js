import styled from "styled-components"

const UserCardStyles = styled.div`
display: flex;
flex-direction: column;
width: 20vw;
margin:auto;
margin-top:2rem;
margin-bottom:2rem;
background-color: #e7c9a9;
`

const UserCard = (props) => {
    return(
        <UserCardStyles>
            <div>{props.user.fName + " " + props.user.lName}</div>
            <div>{props.user.email}</div>
            <div>{props.user.password}</div>
        </UserCardStyles>
    )
}

export default UserCard