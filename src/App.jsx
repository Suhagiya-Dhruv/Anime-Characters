import { InputAdornment, TextField } from '@mui/material';
import TableComponents from './components/tableComponent'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect, useState } from 'react';
import axios from 'axios'

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
  console.log(data, pagination)

  return (
    <div className="App">
      <div>
        <h2>Search Anime Characters</h2>
        <TextField
          size="small"
          autoFocus
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
      <TableComponents />
      <button onClick={backButtonHandler} disabled={pagination?.current_page === 1}>back</button>
      <button onClick={nextButtonHandler} disabled={!pagination?.has_next_page} >next</button>
    </div>
  );
}

export default App;
