import React, {useState, useContext} from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value); 
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(text === '') {
            alertContext.setAlert('Please enter user name', 'light');
        } else {
                    //console.log(this.state.text)
                githubContext.searchUsers(text);
                setText('');
        }
    }
   
    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type="text" name="text" 
                        placeholder="Search Users." 
                        value={text}
                        onChange={onChange}/> 
                <input type="submit" value="Search" 
                        className="btn btn-dark btn-block"/>
            </form>
            {githubContext.users.length>0 && <button className="btn btn-light btn-block"
                    onClick={githubContext.clearUsers}>Clear</button>}
            
        </div>
    )
}


export default Search