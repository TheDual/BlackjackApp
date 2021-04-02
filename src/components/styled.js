import styled from 'styled-components'

export const SingleCard = styled.div(() => ({
    width: "10%",
    height: "100%",
    marginTop: "5px",
    marginLeft: "15px"
}))

export const CardImage = styled.img(() => ({
    width: "100%",
    height: "100%"
}))

export const CardContainer = styled.div((props) => ({
    width: "100%",
    height: "60%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: props.color
}))