export const addUser = (username, id) => {
    console.log('gonna ad: ', username, id)

    return(dispatch) => {

        const user =  {username: username, id: id }

        dispatch({ 
            type: 'ADD_USER', 
            user: user
        })
    }

}