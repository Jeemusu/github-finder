import { useContext, useState } from 'react'
import GithubContext from '../../context/GithubContext'
import AlertContext from '../../context/AlertContext'
import { getUsersSearchResults } from '../../context/GithubActions'

function UserSearch() {

    const [text, setText] = useState('')

    const {dispatch, users} = useContext(GithubContext)
    const { setAlert } = useContext(AlertContext)
    
    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    const handleClear = (e) => {
        
        dispatch({
            type: 'CLEAR_USERS',
        })

        dispatch({
            type: 'SET_SEARCHINFO',
            payload: {
                currentPage: 1,
                totalResults: 0,
                keywords: ''
            }
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        
        if(text === '') {
            setAlert(
                'Please enter a search string.',
                'error',
            )
        } else {

            dispatch({
                type: 'SET_LOADING'
            })

            const users = await getUsersSearchResults(text)

            dispatch({
                type: 'GET_USERS',
                payload: users.items
            })

            dispatch({
                type: 'SET_SEARCHINFO',
                payload: {
                    keywords: text,
                    totalResults: users.total_count,
                    currentPage: 1
                }
            })

            setText('')
        }
        
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className="w-full pr-40 bg-gray-200 input input-lg text-black" 
                                value={text}
                                onChange={handleTextChange}
                            />
                            <button 
                                type="submit" 
                                className="absolute top-0 right-0 rounded-l-none btn w-36 btn-lg">
                                    Go
                            </button> 
                        </div>  
                    </div>
                </form>
            </div>
            { users.length > 0 && (
                <div className="">
                    <button onClick={ handleClear} className="btn btn-ghost btn-lg">Clear</button> 
                </div>
            )}   
        </div>
    )
}

export default UserSearch