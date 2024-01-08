'use client'

import { useCallback, useState } from "react";

export default function Paginate(props: {perPage: number, pageCount: number | undefined, currentPage: number, hundleCurrentPage: (selectedPage: number) => void}) {

  const pageClick = useCallback((selectedPage: number) => {
    props.hundleCurrentPage(selectedPage);
  }, [props])

  return (
    <ul className="pagination">

      {props.pageCount ?
        props.pageCount > props.perPage ?
        [...Array((props.pageCount / props.perPage))].map((_,index) => (
          <li className={`page-item ${props.currentPage === index ? "active" : ""}`} key={index}>
            <a className="page-link" onClick={() => pageClick(index)}>{index+1}</a>
          </li>
        ))
        :  <li className="page-item active"><a className="page-link">1</a>
      </li>
      : ""}
    </ul>
  )
}
