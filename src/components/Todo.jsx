import React from 'react';

const Todo =()=>{
    const [value,setValue] = React.useState('');
    const [todo,setTodo]  = React.useState([]);
    const [page,setPage] = React.useState(1);
    const [isLoading,setLoading] = React.useState(true);
    const [isError,setError] = React.useState(false);

    React.useEffect(()=>{
      getdata(page)
    },[page])

   
    const getdata=(page=1)=>{
      fetch(`http://localhost:3001/todo?_page=${page}&_limit=3`)
      .then((res)=>res.json())
      .then((res) => {
        setTodo(res);
        setError(false);
      })
      .catch((err)=>setError(true))
      .finally(()=>setLoading(false));
    }



    const addToList=()=>{
        // console.log(value);
        const payload ={
          title:value,
          status:false,
        };

        const payloadjson = JSON.stringify(payload);

        setLoading(true);
        fetch(`http://localhost:3001/todo`,{
          method:'POST',
          body:payloadjson,
          headers:{
            "Content-Type": "application/json",
          }
        }).then((res)=>{
          getdata();
          setError(false);
        })
        .catch((err)=>setError(true))
        .finally(()=>setLoading(false));
        
    }

  return isLoading? <h1>...loading</h1> : isError ? <h1>there is something went wrong </h1> : (
    <>
    <input type="text" placeholder="add something"
     value = {value} 
     onChange ={ (e) =>setValue(e.target.value)} 
     />
    <button onClick={addToList}>save</button>
    {
      todo.map((item)=>{
        return <div>{item.title}</div>
      })
    }
    
    <p>Page : {page}</p>
    <button  onClick={()=> setPage(page-1)} disabled={page === 1}>prev</button>
    <button onClick={()=> setPage(page+1)} disabled={todo.length === 0}>next</button>
    </>
  )
}

export {Todo}