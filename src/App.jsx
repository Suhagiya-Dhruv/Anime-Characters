import { Button, InputAdornment, TextField } from '@mui/material';
import TableComponents from './components/tableComponent'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './app.css'

async function HitAPI(page = 1, limit = 15, search = '') {
  if (search === '') {
    const response = await axios.get(`https://api.jikan.moe/v4/characters?page=${page}&limit=${limit}&order_by=favorites&sort=desc`)
      .then(data => data)
      .catch(err => console.error(err))
    return response.data
  }
  else {
    const response = await axios.get(`https://api.jikan.moe/v4/characters?page=${page}&limit=${limit}&q=${search}&order_by=favorites&sort=desc`)
      .then(data => data)
      .catch(err => console.error(err))
    return response.data
  }
}

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    async function fetchData() {
      const responseData = await HitAPI();
      setData(responseData.data)
      setPagination(responseData.pagination)
    }
    fetchData()
  }, [])

  var timer;
  const searchValueHandler = (e) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const responseData = await HitAPI(Number(pagination?.current_page - 1), pagination?.items?.per_page, e.target.value);
      setData(responseData.data)
      setPagination(responseData.pagination)
      setSearchValue(e.target.value)
    }, 500)
  }

  const backButtonHandler = async () => {
    const responseData = await HitAPI(Number(pagination?.current_page - 1), pagination?.items?.per_page, searchValue);
    setData(responseData.data)
    setPagination(responseData.pagination)
  }

  const nextButtonHandler = async () => {
    const responseData = await HitAPI(Number(pagination?.current_page + 1), pagination?.items?.per_page, searchValue);
    setData(responseData.data)
    setPagination(responseData.pagination)
  }

  return (
    <div>
      <div
        style={{
          borderBottom: '2px solid gray',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: "0.5rem 2rem",
          height:"160px"
        }}
      >
        <h3>Search Anime Characters</h3>
        <TextField
          size="small"
          autoFocus
          sx={{width:"500px"}}
          onChange={searchValueHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <p>Total <b>{pagination?.items?.total}</b> matching anime characters found</p>
      </div>
      <div
        style={{ height: '480px', overflowY: 'auto' }}
        className="table">
        <TableComponents data={data} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight:"3rem",
          marginTop:"1rem"
        }}>
        <Button variant='contained' sx={{ marginRight: "1rem" }} size="small" onClick={backButtonHandler} disabled={pagination?.current_page === 1}>back</Button>
        <Button variant='contained' size="small" onClick={nextButtonHandler} disabled={!pagination?.has_next_page} >next</Button>
      </div>
    </div >
  );
}

export default App;
