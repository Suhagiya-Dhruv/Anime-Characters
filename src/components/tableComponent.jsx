import React from 'react'
import { Card, Chip } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const TableComponents = ({ data }) => {

  const openInNewTab = url => {
    window.open(url, '_blank');
  };

  return (
    <>
      {data.length ? data.map((item, index) => {
        return (
          <Card
            elevation={2}
            key={index.toString()}
            sx={{
              margin: "0.5rem 2rem",
              height: "80px",
              display: "flex",
              alignItems: "center",
              backgroundImage: "linear-gradient(to right bottom, #b1d4f2, #9ec0e1, #8babcf, #7a98be, #6984ad, #5f80a7, #557ca0, #4b7899, #4c8199, #538997, #5f9094, #6e9693)"
            }}
          >
            <div style={{ boxShadow: "1px 1px 3px 2px gray", display: "flex", justifyContent: "center", alignItems: "center", margin: "8px" }}>
              <img src={item?.images?.jpg?.image_url} width="40px" alt={item.name} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "8px"

              }}>
              <b style={{ margin: "8px" }}>{item.name}</b>
              <div>
                {item.nicknames && item.nicknames.map((nickname, id) => <Chip key={id.toString()} label={nickname} sx={{ height: "24px", marginRight: "4px", fontWeight:"bold" }} />)}
              </div>
            </div>

            <div style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "8px", marginRight: "16px", display: "flex", alignItems: "center" }}>
              <FavoriteRoundedIcon sx={{ color: "red" }} />
              {item.favorites}
            </div>

            <div style={{ margin: "8px", display: "flex", alignItems: "center", backgroundColor: "lightblue", borderRadius: "5px", cursor: "pointer" }}>
              <ArrowForwardRoundedIcon sx={{ fontSize: 40 }} onClick={() => openInNewTab(item.url)} />
            </div>
          </Card>
        )
      })
        :
        <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h3>No records found!</h3>
        </div>
      }
    </>
  )
}

export default TableComponents