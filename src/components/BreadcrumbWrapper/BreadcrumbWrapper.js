import React from 'react';
import "./breadcrumb.css";
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from "bima-design/lib/components";

const BreadcrumbWrapper = (props) =>{
  return (
      <div className={"content-breadcrumb"}>
          <Breadcrumb>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem>
                  <a href="/">Main Event</a>
              </BreadcrumbItem>
              <BreadcrumbItem href="/" isCurrentPage>
                  Event Name
              </BreadcrumbItem>
          </Breadcrumb>
      </div>
  )
}

export default BreadcrumbWrapper;
